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

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Loader } from "mds";
import { useLocation, useNavigate } from "react-router-dom";
import get from "lodash/get";

import { withStyles } from "../../../../theme/makeStyles";
import { Box, Grid } from "mds";
import api from "../../../../common/api";
import ConfTargetGeneric from "../ConfTargetGeneric";

import {
  fieldBasic,
  settingsCommon,
} from "../../Common/FormComponents/common/styleLibrary";
import {
  fieldsConfigurations,
  overrideFields,
  removeEmptyFields,
} from "../../Configurations/utils";
import {
  IConfigurationElement,
  IConfigurationSys,
  IElementValue,
  IOverrideEnv,
  KVField,
} from "../../Configurations/types";
import { ErrorResponseHandler } from "../../../../common/types";
import ResetConfigurationModal from "./ResetConfigurationModal";
import {
  configurationIsLoading,
  setErrorSnackMessage,
  setServerNeedsRestart,
  setSnackBarMessage,
} from "../../../../systemSlice";
import { AppState, useAppDispatch } from "../../../../store";
import WebhookSettings from "../WebhookSettings/WebhookSettings";
import { useSelector } from "react-redux";

const styles = () => ({
  ...fieldBasic,
  ...settingsCommon,
  settingsFormContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "10px",
  },
});

interface IAddNotificationEndpointProps {
  selectedConfiguration: IConfigurationElement;
  classes?: any;
  className?: string;
}

const EditConfiguration = ({
  selectedConfiguration,
  classes,
  className = "",
}: IAddNotificationEndpointProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname = "" } = useLocation();

  let selConfigTab = pathname.substring(pathname.lastIndexOf("/") + 1);
  selConfigTab = selConfigTab === "settings" ? "region" : selConfigTab;

  //Local States
  const [valuesObj, setValueObj] = useState<IElementValue[]>([]);
  const [saving, setSaving] = useState<boolean>(false);
  const [configValues, setConfigValues] = useState<IElementValue[]>([]);
  const [configSubsysList, setConfigSubsysList] = useState<IConfigurationSys[]>(
    []
  );
  const [resetConfigurationOpen, setResetConfigurationOpen] =
    useState<boolean>(false);
  const [overrideEnvs, setOverrideEnvs] = useState<IOverrideEnv>({});

  const loadingConfig = useSelector(
    (state: AppState) => state.system.loadingConfigurations
  );

  useEffect(() => {
    dispatch(configurationIsLoading(true));
  }, [selConfigTab, dispatch]);

  useEffect(() => {
    if (loadingConfig) {
      const configId = get(selectedConfiguration, "configuration_id", false);

      if (configId) {
        api
          .invoke("GET", `/api/v1/configs/${configId}`)
          .then((res) => {
            setConfigSubsysList(res);
            let values: IElementValue[] = get(res[0], "key_values", []);

            const fieldsConfig: KVField[] = fieldsConfigurations[configId];

            const keyVals = fieldsConfig.map((field) => {
              const includedValue = values.find(
                (element: IElementValue) => element.key === field.name
              );
              const customValue = includedValue?.value || "";

              return {
                key: field.name,
                value: field.customValueProcess
                  ? field.customValueProcess(customValue)
                  : customValue,
              };
            });

            setConfigValues(keyVals);
            setOverrideEnvs(overrideFields(keyVals));
            dispatch(configurationIsLoading(false));
          })
          .catch((err: ErrorResponseHandler) => {
            dispatch(configurationIsLoading(false));
            dispatch(setErrorSnackMessage(err));
          });

        return;
      }
      dispatch(configurationIsLoading(false));
    }
  }, [loadingConfig, selectedConfiguration, dispatch]);

  useEffect(() => {
    if (saving) {
      const payload = {
        key_values: removeEmptyFields(valuesObj),
      };
      api
        .invoke(
          "PUT",
          `/api/v1/configs/${selectedConfiguration.configuration_id}`,
          payload
        )
        .then((res) => {
          setSaving(false);
          dispatch(setServerNeedsRestart(res.restart));
          dispatch(configurationIsLoading(true));
          if (!res.restart) {
            dispatch(setSnackBarMessage("Configuration saved successfully"));
          }
        })
        .catch((err: ErrorResponseHandler) => {
          setSaving(false);
          dispatch(setErrorSnackMessage(err));
        });
    }
  }, [saving, dispatch, selectedConfiguration, valuesObj, navigate]);

  //Fetch Actions
  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
  };

  const onValueChange = useCallback(
    (newValue: IElementValue[]) => {
      setValueObj(newValue);
    },
    [setValueObj]
  );

  const continueReset = (restart: boolean) => {
    setResetConfigurationOpen(false);
    dispatch(setServerNeedsRestart(restart));
    if (restart) {
      dispatch(configurationIsLoading(true));
    }
  };

  const resetConfigurationMOpen = () => {
    setResetConfigurationOpen(true);
  };

  return (
    <Fragment>
      {resetConfigurationOpen && (
        <ResetConfigurationModal
          configurationName={selectedConfiguration.configuration_id}
          closeResetModalAndRefresh={continueReset}
          resetOpen={resetConfigurationOpen}
        />
      )}
      {loadingConfig ? (
        <Grid item xs={12} sx={{ textAlign: "center", paddingTop: "15px" }}>
          <Loader />
        </Grid>
      ) : (
        <Box
          sx={{
            padding: "15px",
            height: "100%",
          }}
        >
          {selectedConfiguration.configuration_id === "logger_webhook" ||
          selectedConfiguration.configuration_id === "audit_webhook" ? (
            <WebhookSettings
              WebhookSettingslist={configSubsysList}
              setResetConfigurationOpen={resetConfigurationMOpen}
              type={selectedConfiguration.configuration_id}
            />
          ) : (
            <Fragment>
              <form
                noValidate
                onSubmit={submitForm}
                className={className}
                style={{
                  height: "100%",
                  display: "flex",
                  flexFlow: "column",
                }}
              >
                <Grid item xs={12} className={classes.settingsFormContainer}>
                  <ConfTargetGeneric
                    fields={
                      fieldsConfigurations[
                        selectedConfiguration.configuration_id
                      ]
                    }
                    onChange={onValueChange}
                    defaultVals={configValues}
                    overrideEnv={overrideEnvs}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    paddingTop: "15px ",
                    textAlign: "right" as const,
                    maxHeight: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    id={"restore-defaults"}
                    variant="secondary"
                    onClick={resetConfigurationMOpen}
                    label={"Restore Defaults"}
                  />
                  &nbsp; &nbsp;
                  <Button
                    id={"save"}
                    type="submit"
                    variant="callAction"
                    disabled={saving}
                    label={"Save"}
                  />
                </Grid>
              </form>
            </Fragment>
          )}
        </Box>
      )}
    </Fragment>
  );
};

export default withStyles(EditConfiguration, styles);
