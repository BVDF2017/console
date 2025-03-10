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

import React, { Fragment, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";

import { withStyles } from "../../../../../theme/makeStyles";
import api from "../../../../../common/api";
import { widgetDetailsToPanel } from "../utils";
import { IDashboardPanel } from "../types";

import { ErrorResponseHandler } from "../../../../../common/types";
import { Loader } from "mds";
import { setErrorSnackMessage } from "../../../../../systemSlice";
import { AppState, useAppDispatch } from "../../../../../store";

interface ISimpleWidget {
  classes?: any;
  iconWidget: any;
  title: string;
  panelItem: IDashboardPanel;
  timeStart: any;
  timeEnd: any;
  propLoading: boolean;

  apiPrefix: string;
  renderFn?: undefined | null | ((arg: Record<string, any>) => any);
}

const styles = () => ({
  mainWidgetContainer: {
    display: "inline-flex",
    color: "#072A4D",
    alignItems: "center",
  },
  icon: {
    color: "#072A4D",
    fill: "#072A4D",
    marginRight: 5,
    marginLeft: 12,
  },
  widgetLabel: {
    fontWeight: "bold",
    textTransform: "uppercase",
    marginRight: 10,
  },
  widgetValue: {
    marginRight: 25,
  },
});

const SimpleWidget = ({
  classes,
  iconWidget,
  title,
  panelItem,
  timeStart,
  timeEnd,
  propLoading,
  apiPrefix,
  renderFn,
}: ISimpleWidget) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const widgetVersion = useSelector(
    (state: AppState) => state.dashboard.widgetLoadVersion
  );

  useEffect(() => {
    setLoading(true);
  }, [widgetVersion]);

  useEffect(() => {
    if (loading) {
      let stepCalc = 0;
      if (timeStart !== null && timeEnd !== null) {
        const secondsInPeriod =
          timeEnd.toUnixInteger() - timeStart.toUnixInteger();
        const periods = Math.floor(secondsInPeriod / 60);

        stepCalc = periods < 1 ? 15 : periods;
      }

      api
        .invoke(
          "GET",
          `/api/v1/${apiPrefix}/info/widgets/${
            panelItem.id
          }/?step=${stepCalc}&${
            timeStart !== null ? `&start=${timeStart.toUnixInteger()}` : ""
          }${timeStart !== null && timeEnd !== null ? "&" : ""}${
            timeEnd !== null ? `end=${timeEnd.toUnixInteger()}` : ""
          }`
        )
        .then((res: any) => {
          const widgetsWithValue = widgetDetailsToPanel(res, panelItem);
          setData(widgetsWithValue.data);
          setLoading(false);
        })
        .catch((err: ErrorResponseHandler) => {
          dispatch(setErrorSnackMessage(err));
          setLoading(false);
        });
    }
  }, [loading, panelItem, timeEnd, timeStart, dispatch, apiPrefix]);

  if (renderFn) {
    return renderFn({
      valueToRender: data,
      loading,
      title,
      id: panelItem.id,
      iconWidget: iconWidget,
    });
  }
  return (
    <Fragment>
      {loading && (
        <div className={classes.loadingAlign}>
          <Loader />
        </div>
      )}
      {!loading && (
        <span className={classes.mainWidgetContainer}>
          <span className={classes.icon}>{iconWidget ? iconWidget : null}</span>
          <span className={classes.widgetLabel}>{title}: </span>
          <span className={classes.widgetValue}>{data}</span>
        </span>
      )}
    </Fragment>
  );
};

const connector = connect(null, {
  setErrorSnackMessage: setErrorSnackMessage,
});

export default withStyles(connector(SimpleWidget), styles);
