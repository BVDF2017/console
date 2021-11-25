// This file is part of MinIO Kubernetes Cloud
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

import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import api from "../../../common/api";
import { PolicyList } from "./types";
import { setErrorSnackMessage } from "../../../actions";
import { ErrorResponseHandler } from "../../../common/types";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import { deleteDialogStyles } from "../Common/FormComponents/common/styleLibrary";
import withStyles from "@mui/styles/withStyles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface IDeletePolicyProps {
  closeDeleteModalAndRefresh: (refresh: boolean) => void;
  deleteOpen: boolean;
  selectedPolicy: string;
  setErrorSnackMessage: typeof setErrorSnackMessage;
  classes: any;
}

const styles = (theme: Theme) =>
  createStyles({
    ...deleteDialogStyles,
  });

const DeletePolicy = ({
  classes,
  closeDeleteModalAndRefresh,
  deleteOpen,
  selectedPolicy,
  setErrorSnackMessage,
}: IDeletePolicyProps) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const removeRecord = () => {
    if (deleteLoading) {
      return;
    }
    setDeleteLoading(true);
    api
      .invoke("DELETE", `/api/v1/policy?name=${selectedPolicy}`)
      .then((res: PolicyList) => {
        setDeleteLoading(false);

        closeDeleteModalAndRefresh(true);
      })
      .catch((err: ErrorResponseHandler) => {
        setDeleteLoading(false);
        setErrorSnackMessage(err);
      });
  };
  return (
    <Dialog
      classes={classes}
      className={classes.root}
      open={deleteOpen}
      onClose={() => {
        closeDeleteModalAndRefresh(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        <div className={classes.titleText}>Delete Policy</div>
        <div className={classes.closeContainer}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => {
              closeDeleteModalAndRefresh(false);
            }}
            disableRipple
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {deleteLoading && <LinearProgress />}
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete policy <br />
          <b>{selectedPolicy}</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            closeDeleteModalAndRefresh(false);
          }}
          color="primary"
          disabled={deleteLoading}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            removeRecord();
          }}
          color="secondary"
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  setErrorSnackMessage,
};

const connector = connect(null, mapDispatchToProps);
export default withStyles(styles)(connector(DeletePolicy));
