// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "mds";
import { withStyles } from "../../../../../../theme/makeStyles";
import { CSSObject } from "styled-components";
import {
  Button,
  DeleteIcon,
  DownloadIcon,
  InspectMenuIcon,
  LegalHoldIcon,
  Loader,
  MetadataIcon,
  ObjectInfoIcon,
  PreviewIcon,
  RetentionIcon,
  ShareIcon,
  TagsIcon,
  VersionsIcon,
  Grid,
} from "mds";

import get from "lodash/get";
import {
  actionsTray,
  detailsPanel,
  spacingUtils,
  textStyleUtils,
} from "../../../../Common/FormComponents/common/styleLibrary";
import { IFileInfo, MetadataResponse } from "../ObjectDetails/types";
import { extensionPreview } from "../utils";
import { ErrorResponseHandler } from "../../../../../../common/types";

import {
  decodeURLString,
  niceBytes,
  niceBytesInt,
  niceDaysInt,
} from "../../../../../../common/utils";
import {
  IAM_SCOPES,
  permissionTooltipHelper,
} from "../../../../../../common/SecureComponent/permissions";
import { AppState, useAppDispatch } from "../../../../../../store";
import api from "../../../../../../common/api";
import ShareFile from "../ObjectDetails/ShareFile";
import SetRetention from "../ObjectDetails/SetRetention";
import DeleteObject from "../ListObjects/DeleteObject";
import SetLegalHoldModal from "../ObjectDetails/SetLegalHoldModal";
import {
  hasPermission,
  SecureComponent,
} from "../../../../../../common/SecureComponent";
import PreviewFileModal from "../Preview/PreviewFileModal";
import ObjectMetaData from "../ObjectDetails/ObjectMetaData";
import ActionsListSection from "./ActionsListSection";
import { displayFileIconName } from "./utils";
import TagsModal from "../ObjectDetails/TagsModal";
import InspectObject from "./InspectObject";
import { selDistSet } from "../../../../../../systemSlice";
import {
  setLoadingObjectInfo,
  setLoadingVersions,
  setSelectedVersion,
  setVersionsModeEnabled,
} from "../../../../ObjectBrowser/objectBrowserSlice";
import RenameLongFileName from "../../../../ObjectBrowser/RenameLongFilename";
import TooltipWrapper from "../../../../Common/TooltipWrapper/TooltipWrapper";
import { downloadObject } from "../../../../ObjectBrowser/utils";
import { BucketVersioningInfo } from "../../../types";

const styles = () =>
  ({
    ObjectDetailsTitle: {
      display: "flex",
      alignItems: "center",
      "& .min-icon": {
        width: 26,
        height: 26,
        minWidth: 26,
        minHeight: 26,
      },
    },
    objectNameContainer: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
      alignItems: "center",
      marginLeft: 10,
    },
    headerForSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 15,
      borderBottom: "#E2E2E2 2px solid",
      fontWeight: "bold",
      fontSize: 18,
      color: "#000",
      margin: "20px 22px",
    },
    capitalizeFirst: {
      textTransform: "capitalize",
    },

    ...actionsTray,
    ...spacingUtils,
    ...textStyleUtils,
    ...detailsPanel,
  });

const emptyFile: IFileInfo = {
  is_latest: true,
  last_modified: "",
  legal_hold_status: "",
  name: "",
  retention_mode: "",
  retention_until_date: "",
  size: "0",
  tags: {},
  version_id: null,
};

interface IObjectDetailPanelProps {
  classes?: any;
  internalPaths: string;
  bucketName: string;
  versioningInfo: BucketVersioningInfo;
  locking: boolean;
  onClosePanel: (hardRefresh: boolean) => void;
}

const ObjectDetailPanel = ({
  classes,
  internalPaths,
  bucketName,
  versioningInfo,
  locking,
  onClosePanel,
}: IObjectDetailPanelProps) => {
  const dispatch = useAppDispatch();

  const distributedSetup = useSelector(selDistSet);
  const versionsMode = useSelector(
    (state: AppState) => state.objectBrowser.versionsMode
  );
  const selectedVersion = useSelector(
    (state: AppState) => state.objectBrowser.selectedVersion
  );
  const loadingObjectInfo = useSelector(
    (state: AppState) => state.objectBrowser.loadingObjectInfo
  );
  const colorVariants = useSelector(
    (state: AppState) => state.system.overrideStyles
  );

  const [shareFileModalOpen, setShareFileModalOpen] = useState<boolean>(false);
  const [retentionModalOpen, setRetentionModalOpen] = useState<boolean>(false);
  const [tagModalOpen, setTagModalOpen] = useState<boolean>(false);
  const [legalholdOpen, setLegalholdOpen] = useState<boolean>(false);
  const [inspectModalOpen, setInspectModalOpen] = useState<boolean>(false);
  const [actualInfo, setActualInfo] = useState<IFileInfo | null>(null);
  const [allInfoElements, setAllInfoElements] = useState<IFileInfo[]>([]);
  const [objectToShare, setObjectToShare] = useState<IFileInfo | null>(null);
  const [versions, setVersions] = useState<IFileInfo[]>([]);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [totalVersionsSize, setTotalVersionsSize] = useState<number>(0);
  const [longFileOpen, setLongFileOpen] = useState<boolean>(false);
  const [metaData, setMetaData] = useState<any | null>(null);
  const [loadMetadata, setLoadingMetadata] = useState<boolean>(false);

  const internalPathsDecoded = decodeURLString(internalPaths) || "";
  const allPathData = internalPathsDecoded.split("/");
  const currentItem = allPathData.pop() || "";

  // calculate object name to display
  let objectNameArray: string[] = [];
  if (actualInfo) {
    objectNameArray = actualInfo.name.split("/");
  }

  useEffect(() => {
    if (distributedSetup && allInfoElements && allInfoElements.length >= 1) {
      let infoElement =
        allInfoElements.find((el: IFileInfo) => el.is_latest) || emptyFile;

      if (selectedVersion !== "") {
        infoElement =
          allInfoElements.find(
            (el: IFileInfo) => el.version_id === selectedVersion
          ) || emptyFile;
      }

      if (!infoElement.is_delete_marker) {
        setLoadingMetadata(true);
      }

      setActualInfo(infoElement);
    }
  }, [selectedVersion, distributedSetup, allInfoElements]);

  useEffect(() => {
    if (loadingObjectInfo && internalPaths !== "") {
      api
        .invoke(
          "GET",
          `/api/v1/buckets/${bucketName}/objects?prefix=${internalPaths}${
            distributedSetup ? "&with_versions=true" : ""
          }`
        )
        .then((res: { objects: IFileInfo[] }) => {
          const result: IFileInfo[] = res.objects || [];
          if (distributedSetup) {
            setAllInfoElements(result);
            setVersions(result);

            const tVersionSize = result.reduce(
              (acc: number, currValue: IFileInfo): number => {
                if (currValue?.size) {
                  return acc + parseInt(currValue.size);
                }
                return acc;
              },
              0
            );

            setTotalVersionsSize(tVersionSize);
          } else {
            const resInfo = result[0];

            setActualInfo(resInfo);
            setVersions([]);

            if (!resInfo.is_delete_marker) {
              setLoadingMetadata(true);
            }
          }

          dispatch(setLoadingObjectInfo(false));
        })
        .catch((error: ErrorResponseHandler) => {
          console.error("Error loading object details", error);
          dispatch(setLoadingObjectInfo(false));
        });
    }
  }, [
    loadingObjectInfo,
    bucketName,
    internalPaths,
    dispatch,
    distributedSetup,
    selectedVersion,
  ]);

  useEffect(() => {
    if (loadMetadata && internalPaths !== "") {
      api
        .invoke(
          "GET",
          `/api/v1/buckets/${bucketName}/objects/metadata?prefix=${internalPaths}`
        )
        .then((res: MetadataResponse) => {
          let metadata = get(res, "objectMetadata", {});

          setMetaData(metadata);
          setLoadingMetadata(false);
        })
        .catch((err) => {
          console.error("Error Getting Metadata Status: ", err.detailedError);
          setLoadingMetadata(false);
        });
    }
  }, [bucketName, internalPaths, loadMetadata]);

  let tagKeys: string[] = [];

  if (actualInfo && actualInfo.tags) {
    tagKeys = Object.keys(actualInfo.tags);
  }

  const openRetentionModal = () => {
    setRetentionModalOpen(true);
  };

  const closeRetentionModal = (updateInfo: boolean) => {
    setRetentionModalOpen(false);
    if (updateInfo) {
      dispatch(setLoadingObjectInfo(true));
    }
  };

  const shareObject = () => {
    setShareFileModalOpen(true);
  };

  const closeShareModal = () => {
    setObjectToShare(null);
    setShareFileModalOpen(false);
  };

  const closeFileOpen = () => {
    setLongFileOpen(false);
  };

  const closeDeleteModal = (closeAndReload: boolean) => {
    setDeleteOpen(false);

    if (closeAndReload && selectedVersion === "") {
      onClosePanel(true);
    } else {
      dispatch(setLoadingVersions(true));
      dispatch(setSelectedVersion(""));
      dispatch(setLoadingObjectInfo(true));
    }
  };

  const closeAddTagModal = (reloadObjectData: boolean) => {
    setTagModalOpen(false);
    if (reloadObjectData) {
      dispatch(setLoadingObjectInfo(true));
    }
  };

  const closeInspectModal = (reloadObjectData: boolean) => {
    setInspectModalOpen(false);
    if (reloadObjectData) {
      dispatch(setLoadingObjectInfo(true));
    }
  };

  const closeLegalholdModal = (reload: boolean) => {
    setLegalholdOpen(false);
    if (reload) {
      dispatch(setLoadingObjectInfo(true));
    }
  };

  const loaderForContainer = (
    <div style={{ textAlign: "center", marginTop: 35 }}>
      <Loader />
    </div>
  );

  if (!actualInfo) {
    if (loadingObjectInfo) {
      return loaderForContainer;
    }

    return null;
  }

  const objectName =
    objectNameArray.length > 0
      ? objectNameArray[objectNameArray.length - 1]
      : actualInfo.name;

  const objectResources = [
    bucketName,
    currentItem,
    [bucketName, actualInfo.name].join("/"),
  ];
  const canSetLegalHold = hasPermission(bucketName, [
    IAM_SCOPES.S3_PUT_OBJECT_LEGAL_HOLD,
    IAM_SCOPES.S3_PUT_ACTIONS,
  ]);
  const canSetTags = hasPermission(objectResources, [
    IAM_SCOPES.S3_PUT_OBJECT_TAGGING,
    IAM_SCOPES.S3_PUT_ACTIONS,
  ]);

  const canChangeRetention = hasPermission(
    objectResources,
    [
      IAM_SCOPES.S3_GET_OBJECT_RETENTION,
      IAM_SCOPES.S3_PUT_OBJECT_RETENTION,
      IAM_SCOPES.S3_GET_ACTIONS,
      IAM_SCOPES.S3_PUT_ACTIONS,
    ],
    true
  );
  const canInspect = hasPermission(objectResources, [
    IAM_SCOPES.ADMIN_INSPECT_DATA,
  ]);
  const canChangeVersioning = hasPermission(objectResources, [
    IAM_SCOPES.S3_GET_BUCKET_VERSIONING,
    IAM_SCOPES.S3_PUT_BUCKET_VERSIONING,
    IAM_SCOPES.S3_GET_OBJECT_VERSION,
    IAM_SCOPES.S3_GET_ACTIONS,
    IAM_SCOPES.S3_PUT_ACTIONS,
  ]);
  const canGetObject = hasPermission(objectResources, [
    IAM_SCOPES.S3_GET_OBJECT,
    IAM_SCOPES.S3_GET_ACTIONS,
  ]);
  const canDelete = hasPermission(
    [bucketName, currentItem, [bucketName, actualInfo.name].join("/")],
    [IAM_SCOPES.S3_DELETE_OBJECT]
  );

  const multiActionButtons = [
    {
      action: () => {
        downloadObject(dispatch, bucketName, internalPaths, actualInfo);
      },
      label: "Download",
      disabled: !!actualInfo.is_delete_marker || !canGetObject,
      icon: <DownloadIcon />,
      tooltip: canGetObject
        ? "Download this Object"
        : permissionTooltipHelper(
            [IAM_SCOPES.S3_GET_OBJECT, IAM_SCOPES.S3_GET_ACTIONS],
            "download this object"
          ),
    },
    {
      action: () => {
        shareObject();
      },
      label: "Share",
      disabled: !!actualInfo.is_delete_marker || !canGetObject,
      icon: <ShareIcon />,
      tooltip: canGetObject
        ? "Share this File"
        : permissionTooltipHelper(
            [IAM_SCOPES.S3_GET_OBJECT, IAM_SCOPES.S3_GET_ACTIONS],
            "share this object"
          ),
    },
    {
      action: () => {
        setPreviewOpen(true);
      },
      label: "Preview",
      disabled:
        !!actualInfo.is_delete_marker ||
        extensionPreview(currentItem) === "none" ||
        !canGetObject,
      icon: <PreviewIcon />,
      tooltip: canGetObject
        ? "Preview this File"
        : permissionTooltipHelper(
            [IAM_SCOPES.S3_GET_OBJECT, IAM_SCOPES.S3_GET_ACTIONS],
            "preview this object"
          ),
    },
    {
      action: () => {
        setLegalholdOpen(true);
      },
      label: "Legal Hold",
      disabled:
        !locking ||
        !distributedSetup ||
        !!actualInfo.is_delete_marker ||
        !canSetLegalHold ||
        selectedVersion !== "",
      icon: <LegalHoldIcon />,
      tooltip: canSetLegalHold
        ? locking
          ? "Change Legal Hold rules for this File"
          : "Object Locking must be enabled on this bucket in order to set Legal Hold"
        : permissionTooltipHelper(
            [IAM_SCOPES.S3_PUT_OBJECT_LEGAL_HOLD, IAM_SCOPES.S3_PUT_ACTIONS],
            "change legal hold settings for this object"
          ),
    },
    {
      action: openRetentionModal,
      label: "Retention",
      disabled:
        !distributedSetup ||
        !!actualInfo.is_delete_marker ||
        !canChangeRetention ||
        selectedVersion !== "" ||
        !locking,
      icon: <RetentionIcon />,
      tooltip: canChangeRetention
        ? locking
          ? "Change Retention rules for this File"
          : "Object Locking must be enabled on this bucket in order to set Retention Rules"
        : permissionTooltipHelper(
            [
              IAM_SCOPES.S3_GET_OBJECT_RETENTION,
              IAM_SCOPES.S3_PUT_OBJECT_RETENTION,
              IAM_SCOPES.S3_GET_ACTIONS,
              IAM_SCOPES.S3_PUT_ACTIONS,
            ],
            "change Retention Rules for this object"
          ),
    },
    {
      action: () => {
        setTagModalOpen(true);
      },
      label: "Tags",
      disabled:
        !!actualInfo.is_delete_marker || selectedVersion !== "" || !canSetTags,
      icon: <TagsIcon />,
      tooltip: canSetTags
        ? "Change Tags for this File"
        : permissionTooltipHelper(
            [
              IAM_SCOPES.S3_PUT_OBJECT_TAGGING,
              IAM_SCOPES.S3_GET_OBJECT_TAGGING,
              IAM_SCOPES.S3_GET_ACTIONS,
              IAM_SCOPES.S3_PUT_ACTIONS,
            ],
            "set Tags on this object"
          ),
    },
    {
      action: () => {
        setInspectModalOpen(true);
      },
      label: "Inspect",
      disabled:
        !distributedSetup ||
        !!actualInfo.is_delete_marker ||
        selectedVersion !== "" ||
        !canInspect,
      icon: <InspectMenuIcon />,
      tooltip: canInspect
        ? "Inspect this file"
        : permissionTooltipHelper(
            [IAM_SCOPES.ADMIN_INSPECT_DATA],
            "inspect this file"
          ),
    },
    {
      action: () => {
        dispatch(
          setVersionsModeEnabled({
            status: !versionsMode,
            objectName: objectName,
          })
        );
      },
      label: versionsMode ? "Hide Object Versions" : "Display Object Versions",
      icon: <VersionsIcon />,
      disabled:
        !distributedSetup ||
        !(actualInfo.version_id && actualInfo.version_id !== "null") ||
        !canChangeVersioning,
      tooltip: canChangeVersioning
        ? actualInfo.version_id && actualInfo.version_id !== "null"
          ? "Display Versions for this file"
          : ""
        : permissionTooltipHelper(
            [
              IAM_SCOPES.S3_GET_BUCKET_VERSIONING,
              IAM_SCOPES.S3_PUT_BUCKET_VERSIONING,
              IAM_SCOPES.S3_GET_OBJECT_VERSION,
              IAM_SCOPES.S3_GET_ACTIONS,
              IAM_SCOPES.S3_PUT_ACTIONS,
            ],
            "display all versions of this object"
          ),
    },
  ];

  const calculateLastModifyTime = (lastModified: string) => {
    const currentTime = new Date();
    const modifiedTime = new Date(lastModified);

    const difTime = currentTime.getTime() - modifiedTime.getTime();

    const formatTime = niceDaysInt(difTime, "ms");

    return formatTime.trim() !== "" ? `${formatTime} ago` : "Just now";
  };

  let regularButtonOverride: CSSObject = {};

  if (colorVariants) {
    regularButtonOverride = {
      backgroundColor: "transparent",
    };
  }

  return (
    <Fragment>
      {shareFileModalOpen && actualInfo && (
        <ShareFile
          open={shareFileModalOpen}
          closeModalAndRefresh={closeShareModal}
          bucketName={bucketName}
          dataObject={objectToShare || actualInfo}
        />
      )}
      {retentionModalOpen && actualInfo && (
        <SetRetention
          open={retentionModalOpen}
          closeModalAndRefresh={closeRetentionModal}
          objectName={currentItem}
          objectInfo={actualInfo}
          bucketName={bucketName}
        />
      )}
      {deleteOpen && (
        <DeleteObject
          deleteOpen={deleteOpen}
          selectedBucket={bucketName}
          selectedObject={internalPaths}
          closeDeleteModalAndRefresh={closeDeleteModal}
          versioningInfo={distributedSetup ? versioningInfo : undefined}
          selectedVersion={selectedVersion}
        />
      )}
      {legalholdOpen && actualInfo && (
        <SetLegalHoldModal
          open={legalholdOpen}
          closeModalAndRefresh={closeLegalholdModal}
          objectName={actualInfo.name}
          bucketName={bucketName}
          actualInfo={actualInfo}
        />
      )}
      {previewOpen && actualInfo && (
        <PreviewFileModal
          open={previewOpen}
          bucketName={bucketName}
          object={{
            name: actualInfo.name,
            version_id: actualInfo.version_id || "null",
            size: parseInt(actualInfo.size || "0"),
            content_type: "",
            last_modified: actualInfo.last_modified,
          }}
          onClosePreview={() => {
            setPreviewOpen(false);
          }}
        />
      )}
      {tagModalOpen && actualInfo && (
        <TagsModal
          modalOpen={tagModalOpen}
          bucketName={bucketName}
          actualInfo={actualInfo}
          onCloseAndUpdate={closeAddTagModal}
        />
      )}
      {inspectModalOpen && actualInfo && (
        <InspectObject
          inspectOpen={inspectModalOpen}
          volumeName={bucketName}
          inspectPath={actualInfo.name}
          closeInspectModalAndRefresh={closeInspectModal}
        />
      )}
      {longFileOpen && actualInfo && (
        <RenameLongFileName
          open={longFileOpen}
          closeModal={closeFileOpen}
          currentItem={currentItem}
          bucketName={bucketName}
          internalPaths={internalPaths}
          actualInfo={actualInfo}
        />
      )}

      {loadingObjectInfo ? (
        <Fragment>{loaderForContainer}</Fragment>
      ) : (
        <Fragment>
          <ActionsListSection
            title={
              <div className={classes.ObjectDetailsTitle}>
                {displayFileIconName(objectName, true)}
                <span className={classes.objectNameContainer}>
                  {objectName}
                </span>
              </div>
            }
            items={multiActionButtons}
          />
          <TooltipWrapper
            tooltip={
              canDelete
                ? ""
                : permissionTooltipHelper(
                    [IAM_SCOPES.S3_DELETE_OBJECT],
                    "delete this object"
                  )
            }
          >
            <Grid
              item
              xs={12}
              sx={{ justifyContent: "center", display: "flex" }}
            >
              <SecureComponent
                resource={[
                  bucketName,
                  currentItem,
                  [bucketName, actualInfo.name].join("/"),
                ]}
                scopes={[IAM_SCOPES.S3_DELETE_OBJECT]}
                errorProps={{ disabled: true }}
              >
                <Button
                  id={"delete-element-click"}
                  icon={<DeleteIcon />}
                  iconLocation={"start"}
                  fullWidth
                  variant={"secondary"}
                  onClick={() => {
                    setDeleteOpen(true);
                  }}
                  disabled={
                    selectedVersion === "" && actualInfo.is_delete_marker
                  }
                  sx={{
                    width: "calc(100% - 44px)",
                    margin: "8px 0",
                    ...regularButtonOverride,
                  }}
                  label={`Delete${selectedVersion !== "" ? " version" : ""}`}
                />
              </SecureComponent>
            </Grid>
          </TooltipWrapper>
          <Grid item xs={12} className={classes.headerForSection}>
            <span>Object Info</span>
            <ObjectInfoIcon />
          </Grid>
          <Box className={classes.detailContainer}>
            <strong>Name:</strong>
            <br />
            <div style={{ overflowWrap: "break-word" }}>{objectName}</div>
          </Box>
          {selectedVersion !== "" && (
            <Box className={classes.detailContainer}>
              <strong>Version ID:</strong>
              <br />
              {selectedVersion}
            </Box>
          )}
          <Box className={classes.detailContainer}>
            <strong>Size:</strong>
            <br />
            {niceBytes(actualInfo.size || "0")}
          </Box>
          {actualInfo.version_id &&
            actualInfo.version_id !== "null" &&
            selectedVersion === "" && (
              <Box className={classes.detailContainer}>
                <strong>Versions:</strong>
                <br />
                {versions.length} version{versions.length !== 1 ? "s" : ""},{" "}
                {niceBytesInt(totalVersionsSize)}
              </Box>
            )}
          {selectedVersion === "" && (
            <Box className={classes.detailContainer}>
              <strong>Last Modified:</strong>
              <br />
              {calculateLastModifyTime(actualInfo.last_modified)}
            </Box>
          )}
          <Box className={classes.detailContainer}>
            <strong>ETAG:</strong>
            <br />
            {actualInfo.etag || "N/A"}
          </Box>
          <Box className={classes.detailContainer}>
            <strong>Tags:</strong>
            <br />
            {tagKeys.length === 0
              ? "N/A"
              : tagKeys.map((tagKey, index) => {
                  return (
                    <span key={`key-vs-${index.toString()}`}>
                      {tagKey}:{get(actualInfo, `tags.${tagKey}`, "")}
                      {index < tagKeys.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
          </Box>
          <Box className={classes.detailContainer}>
            <SecureComponent
              scopes={[
                IAM_SCOPES.S3_GET_OBJECT_LEGAL_HOLD,
                IAM_SCOPES.S3_GET_ACTIONS,
              ]}
              resource={bucketName}
            >
              <Fragment>
                <strong>Legal Hold:</strong>
                <br />
                {actualInfo.legal_hold_status ? "On" : "Off"}
              </Fragment>
            </SecureComponent>
          </Box>
          <Box className={classes.detailContainer}>
            <SecureComponent
              scopes={[
                IAM_SCOPES.S3_GET_OBJECT_RETENTION,
                IAM_SCOPES.S3_GET_ACTIONS,
              ]}
              resource={bucketName}
            >
              <Fragment>
                <strong>Retention Policy:</strong>
                <br />
                <span className={classes.capitalizeFirst}>
                  {actualInfo.version_id && actualInfo.version_id !== "null" ? (
                    <Fragment>
                      {actualInfo.retention_mode
                        ? actualInfo.retention_mode.toLowerCase()
                        : "None"}
                    </Fragment>
                  ) : (
                    <Fragment>
                      {actualInfo.retention_mode
                        ? actualInfo.retention_mode.toLowerCase()
                        : "None"}
                    </Fragment>
                  )}
                </span>
              </Fragment>
            </SecureComponent>
          </Box>
          {!actualInfo.is_delete_marker && (
            <Fragment>
              <Grid item xs={12} className={classes.headerForSection}>
                <span>Metadata</span>
                <MetadataIcon />
              </Grid>
              <Box className={classes.detailContainer}>
                {actualInfo && metaData ? (
                  <ObjectMetaData metaData={metaData} linear />
                ) : null}
              </Box>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default withStyles(ObjectDetailPanel, styles);;
