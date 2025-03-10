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

import React, { Fragment, useState } from "react";

import { CSSObject } from "styled-components";
import { Menu, MenuItem } from "@mui/material";

import { withStyles } from "../../../../theme/makeStyles";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Button, UploadFolderIcon, UploadIcon } from "mds";
import {
  IAM_SCOPES,
  permissionTooltipHelper,
} from "../../../../common/SecureComponent/permissions";
import { hasPermission } from "../../../../common/SecureComponent";
import TooltipWrapper from "../../Common/TooltipWrapper/TooltipWrapper";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store";

interface IUploadFilesButton {
  uploadPath: string;
  bucketName: string;
  forceDisable?: boolean;
  uploadFileFunction: (closeFunction: () => void) => void;
  uploadFolderFunction: (closeFunction: () => void) => void;
  classes?: any;
  overrideStyles?: CSSObject;
}

const styles = () =>
  ({
    listUploadIcons: {
      height: 20,
      "& .min-icon": {
        width: 18,
        fill: "rgba(0,0,0,0.87)",
      },
    },
  });

const UploadFilesButton = ({
  uploadPath,
  bucketName,
  forceDisable = false,
  uploadFileFunction,
  uploadFolderFunction,
  classes,
  overrideStyles = {},
}: IUploadFilesButton) => {
  const anonymousMode = useSelector(
    (state: AppState) => state.system.anonymousMode
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openUploadMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUpload = () => {
    setAnchorEl(null);
  };

  const uploadObjectAllowed =
    hasPermission(uploadPath, [
      IAM_SCOPES.S3_PUT_OBJECT,
      IAM_SCOPES.S3_PUT_ACTIONS,
    ]) || anonymousMode;
  const uploadFolderAllowed = hasPermission(
    bucketName,
    [IAM_SCOPES.S3_PUT_OBJECT, IAM_SCOPES.S3_PUT_ACTIONS],
    false,
    true
  );

  const uploadEnabled: boolean = uploadObjectAllowed || uploadFolderAllowed;

  return (
    <Fragment>
      <TooltipWrapper
        tooltip={
          uploadEnabled
            ? "Upload Files"
            : permissionTooltipHelper(
                [IAM_SCOPES.S3_PUT_OBJECT, IAM_SCOPES.S3_PUT_ACTIONS],
                "upload files to this bucket"
              )
        }
      >
        <Button
          id={"upload-main"}
          aria-controls={`upload-main-menu`}
          aria-haspopup="true"
          aria-expanded={openUploadMenu ? "true" : undefined}
          onClick={handleClick}
          label={"Upload"}
          icon={<UploadIcon />}
          variant={"callAction"}
          disabled={forceDisable || !uploadEnabled}
          sx={overrideStyles}
        />
      </TooltipWrapper>
      <Menu
        id={`upload-main-menu`}
        aria-labelledby={`upload-main`}
        anchorEl={anchorEl}
        open={openUploadMenu}
        onClose={() => {
          handleCloseUpload();
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            uploadFileFunction(handleCloseUpload);
          }}
          disabled={!uploadObjectAllowed || forceDisable}
        >
          <ListItemIcon className={classes.listUploadIcons}>
            <UploadIcon />
          </ListItemIcon>
          <ListItemText>Upload File</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            uploadFolderFunction(handleCloseUpload);
          }}
          disabled={!uploadFolderAllowed || forceDisable}
        >
          <ListItemIcon className={classes.listUploadIcons}>
            <UploadFolderIcon />
          </ListItemIcon>
          <ListItemText>Upload Folder</ListItemText>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default withStyles(UploadFilesButton, styles);;
