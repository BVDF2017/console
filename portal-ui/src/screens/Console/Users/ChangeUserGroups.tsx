// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
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

import React, { useCallback, useEffect, useState } from "react";
import ProgressBar from '@atlaskit/progress-bar';

import { AddMembersToGroupIcon, Button, Box, Grid } from "mds";

import { withStyles } from "../../../theme/makeStyles";
import {
  modalBasic,
  spacingUtils,
} from "../Common/FormComponents/common/styleLibrary";
import { ErrorResponseHandler } from "../../../common/types";
import api from "../../../common/api";
import GroupsSelectors from "./GroupsSelectors";
import ModalWrapper from "../Common/ModalWrapper/ModalWrapper";
import { encodeURLString } from "../../../common/utils";
import { setModalErrorSnackMessage } from "../../../systemSlice";
import { useAppDispatch } from "../../../store";

const styles = () =>
  ({
    ...spacingUtils,
    ...modalBasic,
  });

interface IChangeUserGroupsContentProps {
  classes?: any;
  closeModalAndRefresh: () => void;
  selectedUser: string;
  open: boolean;
}

const ChangeUserGroups = ({
  classes,
  closeModalAndRefresh,
  selectedUser,
  open,
}: IChangeUserGroupsContentProps) => {
  const dispatch = useAppDispatch();
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [accessKey, setAccessKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const getUserInformation = useCallback(() => {
    if (!selectedUser) {
      return null;
    }

    api
      .invoke("GET", `/api/v1/user/${encodeURLString(selectedUser)}`)
      .then((res) => {
        setAddLoading(false);
        setAccessKey(res.accessKey);
        setSelectedGroups(res.memberOf || []);
        setEnabled(res.status === "enabled");
      })
      .catch((err: ErrorResponseHandler) => {
        setAddLoading(false);
        dispatch(setModalErrorSnackMessage(err));
      });
  }, [selectedUser, dispatch]);

  useEffect(() => {
    if (selectedUser === null) {
      setAccessKey("");
      setSecretKey("");
      setSelectedGroups([]);
    } else {
      getUserInformation();
    }
  }, [selectedUser, getUserInformation]);

  const saveRecord = (event: React.FormEvent) => {
    event.preventDefault();

    if (addLoading) {
      return;
    }
    setAddLoading(true);
    if (selectedUser !== null) {
      api
        .invoke("PUT", `/api/v1/user/${encodeURLString(selectedUser)}`, {
          status: enabled ? "enabled" : "disabled",
          groups: selectedGroups,
        })
        .then((_) => {
          setAddLoading(false);
          closeModalAndRefresh();
        })
        .catch((err: ErrorResponseHandler) => {
          setAddLoading(false);
          dispatch(setModalErrorSnackMessage(err));
        });
    } else {
      api
        .invoke("POST", "/api/v1/users", {
          accessKey,
          secretKey,
          groups: selectedGroups,
        })
        .then((_) => {
          setAddLoading(false);
          closeModalAndRefresh();
        })
        .catch((err: ErrorResponseHandler) => {
          setAddLoading(false);
          dispatch(setModalErrorSnackMessage(err));
        });
    }
  };

  const resetForm = () => {
    if (selectedUser !== null) {
      setSelectedGroups([]);
      return;
    }
    setAccessKey("");
    setSecretKey("");
    setSelectedGroups([]);
  };

  const sendEnabled =
    accessKey.trim() !== "" &&
    ((secretKey.trim() !== "" && selectedUser === null) ||
      selectedUser !== null);
  return (
    <ModalWrapper
      onClose={() => {
        closeModalAndRefresh();
      }}
      modalOpen={open}
      title={"Set Groups"}
      titleIcon={<AddMembersToGroupIcon />}
    >
      <React.Fragment>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            saveRecord(e);
          }}
        >
          <Grid container>
            <Grid item xs={12} className={classes.formScrollable}>
              <GroupsSelectors
                selectedGroups={selectedGroups}
                setSelectedGroups={(elements: string[]) => {
                  setSelectedGroups(elements);
                }}
              />
            </Grid>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                id={"clear-change-user-groups"}
                type="button"
                variant="regular"
                onClick={resetForm}
                label={"Clear"}
              />

              <Button
                id={"save-user-groups"}
                type="submit"
                variant="callAction"
                disabled={addLoading || !sendEnabled}
                label={"Save"}
              />
            </Box>
            {addLoading && (
              <Grid item xs={12}>
                <ProgressBar />
              </Grid>
            )}
          </Grid>
        </form>
      </React.Fragment>
    </ModalWrapper>
  );
};

export default withStyles(ChangeUserGroups, styles);;
