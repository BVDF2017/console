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

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from '@atlaskit/progress-bar';
import { Button, Grid } from "mds";
import ModalWrapper from "../../../../Common/ModalWrapper/ModalWrapper";
import DateTimePickerWrapper from "../../../../Common/FormComponents/DateTimePickerWrapper/DateTimePickerWrapper";
import FormSwitchWrapper from "../../../../Common/FormComponents/FormSwitchWrapper/FormSwitchWrapper";
import { AppState, useAppDispatch } from "../../../../../../store";
import {
  resetRewind,
  setLoadingObjects,
  setRewindEnable,
} from "../../../../ObjectBrowser/objectBrowserSlice";
import { DateTime } from "luxon";

interface IRewindEnable {
  closeModalAndRefresh: () => void;
  open: boolean;
  bucketName: string;
}

const RewindEnable = ({
  closeModalAndRefresh,
  open,
  bucketName,
}: IRewindEnable) => {
  const dispatch = useAppDispatch();

  const rewindEnabled = useSelector(
    (state: AppState) => state.objectBrowser.rewind.rewindEnabled
  );
  const dateRewind = useSelector(
    (state: AppState) => state.objectBrowser.rewind.dateToRewind
  );

  const [rewindEnabling, setRewindEnabling] = useState<boolean>(false);
  const [rewindEnableButton, setRewindEnableButton] = useState<boolean>(true);
  const [dateSelected, setDateSelected] = useState<DateTime>(
    DateTime.fromJSDate(new Date())
  );

  useEffect(() => {
    if (rewindEnabled) {
      setRewindEnableButton(true);
      setDateSelected(DateTime.fromISO(dateRewind || DateTime.now().toISO()));
    }
  }, [rewindEnabled, dateRewind]);

  const rewindApply = () => {
    if (!rewindEnableButton && rewindEnabled) {
      dispatch(resetRewind());
    } else {
      setRewindEnabling(true);
      dispatch(
        setRewindEnable({
          state: true,
          bucket: bucketName,
          dateRewind: dateSelected.toISO(),
        })
      );
    }
    dispatch(setLoadingObjects(true));

    closeModalAndRefresh();
  };

  return (
    <ModalWrapper
      modalOpen={open}
      onClose={() => {
        closeModalAndRefresh();
      }}
      title={`Rewind - ${bucketName}`}
    >
      <Grid item xs={12}>
        <DateTimePickerWrapper
          value={dateSelected}
          onChange={(dateTime) => (dateTime ? setDateSelected(dateTime) : null)}
          id="rewind-selector"
          label="Rewind to"
          disabled={!rewindEnableButton}
        />
      </Grid>
      <Grid container>
        {rewindEnabled && (
          <Grid item xs={12} sx={{ marginBottom: "10px" }}>
            <FormSwitchWrapper
              value="status"
              id="status"
              name="status"
              checked={rewindEnableButton}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRewindEnableButton(e.target.checked);
              }}
              label={"Current Status"}
              indicatorLabels={["Enabled", "Disabled"]}
            />
          </Grid>
        )}
        <Grid
          item
          xs={12}
          style={{ justifyContent: "flex-end", display: "flex" }}
        >
          <Button
            type="button"
            variant="callAction"
            disabled={rewindEnabling || (!dateSelected && rewindEnableButton)}
            onClick={rewindApply}
            id={"rewind-apply-button"}
            label={
              !rewindEnableButton && rewindEnabled
                ? "Show Current Data"
                : "Show Rewind Data"
            }
          />
        </Grid>
        {rewindEnabling && (
          <Grid item xs={12}>
            <ProgressBar />
          </Grid>
        )}
      </Grid>
    </ModalWrapper>
  );
};

export default RewindEnable;
