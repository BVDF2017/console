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


import { withStyles } from "../../../../theme/makeStyles";
import get from "lodash/get";
import { AddIcon, Button, Grid, HelpBox, LambdaIcon } from "mds";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../../../common/api";
import { ErrorResponseHandler } from "../../../../common/types";
import {
  actionsTray,
  searchField,
} from "../../Common/FormComponents/common/styleLibrary";
import TableWrapper from "../../Common/TableWrapper/TableWrapper";
import { BucketEvent, BucketEventList } from "../types";

import {
  hasPermission,
  SecureComponent,
} from "../../../../common/SecureComponent";
import { IAM_SCOPES } from "../../../../common/SecureComponent/permissions";
import PanelTitle from "../../Common/PanelTitle/PanelTitle";

import { useAppDispatch } from "../../../../store";
import { setErrorSnackMessage } from "../../../../systemSlice";
import withSuspense from "../../Common/Components/withSuspense";
import TooltipWrapper from "../../Common/TooltipWrapper/TooltipWrapper";
import { selBucketDetailsLoading } from "./bucketDetailsSlice";

const DeleteEvent = withSuspense(React.lazy(() => import("./DeleteEvent")));
const AddEvent = withSuspense(React.lazy(() => import("./AddEvent")));

const styles = () =>
  ({
    ...searchField,
    ...actionsTray,
    twHeight: {
      minHeight: 400,
    },
  });

interface IBucketEventsProps {
  classes?: any;
}

const BucketEventsPanel = ({ classes }: IBucketEventsProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const loadingBucket = useSelector(selBucketDetailsLoading);

  const [addEventScreenOpen, setAddEventScreenOpen] = useState<boolean>(false);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [records, setRecords] = useState<BucketEvent[]>([]);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<BucketEvent | null>(null);

  const bucketName = params.bucketName || "";

  const displayEvents = hasPermission(bucketName, [
    IAM_SCOPES.S3_GET_BUCKET_NOTIFICATIONS,
    IAM_SCOPES.S3_GET_ACTIONS,
  ]);

  useEffect(() => {
    if (loadingBucket) {
      setLoadingEvents(true);
    }
  }, [loadingBucket, setLoadingEvents]);

  useEffect(() => {
    if (loadingEvents) {
      if (displayEvents) {
        api
          .invoke("GET", `/api/v1/buckets/${bucketName}/events`)
          .then((res: BucketEventList) => {
            const events = get(res, "events", []);
            setLoadingEvents(false);
            setRecords(events || []);
          })
          .catch((err: ErrorResponseHandler) => {
            setLoadingEvents(false);
            dispatch(setErrorSnackMessage(err));
          });
      } else {
        setLoadingEvents(false);
      }
    }
  }, [loadingEvents, dispatch, bucketName, displayEvents]);

  const eventsDisplay = (events: string[]) => {
    return <Fragment>{events.join(", ")}</Fragment>;
  };

  const confirmDeleteEvent = (evnt: BucketEvent) => {
    setDeleteOpen(true);
    setSelectedEvent(evnt);
  };

  const closeAddEventAndRefresh = () => {
    setAddEventScreenOpen(false);
    setLoadingEvents(true);
  };

  const closeDeleteModalAndRefresh = (refresh: boolean) => {
    setDeleteOpen(false);
    if (refresh) {
      setLoadingEvents(true);
    }
  };

  const tableActions = [{ type: "delete", onClick: confirmDeleteEvent }];

  return (
    <Fragment>
      {deleteOpen && (
        <DeleteEvent
          deleteOpen={deleteOpen}
          selectedBucket={bucketName}
          bucketEvent={selectedEvent}
          closeDeleteModalAndRefresh={closeDeleteModalAndRefresh}
        />
      )}
      {addEventScreenOpen && (
        <AddEvent
          open={addEventScreenOpen}
          selectedBucket={bucketName}
          closeModalAndRefresh={closeAddEventAndRefresh}
        />
      )}

      <Grid container>
        <Grid item xs={12} className={classes.actionsTray}>
          <PanelTitle>Events</PanelTitle>
          <SecureComponent
            scopes={[
              IAM_SCOPES.S3_PUT_BUCKET_NOTIFICATIONS,
              IAM_SCOPES.S3_PUT_ACTIONS,
              IAM_SCOPES.ADMIN_SERVER_INFO,
            ]}
            resource={bucketName}
            matchAll
            errorProps={{ disabled: true }}
          >
            <TooltipWrapper tooltip={"Subscribe to Event"}>
              <Button
                id={"Subscribe-bucket-event"}
                onClick={() => {
                  setAddEventScreenOpen(true);
                }}
                label={"Subscribe to Event"}
                icon={<AddIcon />}
                variant={"callAction"}
              />
            </TooltipWrapper>
          </SecureComponent>
        </Grid>
        <Grid item xs={12}>
          <SecureComponent
            scopes={[
              IAM_SCOPES.S3_GET_BUCKET_NOTIFICATIONS,
              IAM_SCOPES.S3_GET_ACTIONS,
            ]}
            resource={bucketName}
            errorProps={{ disabled: true }}
          >
            <TableWrapper
              itemActions={tableActions}
              columns={[
                { label: "SQS", elementKey: "arn" },
                {
                  label: "Events",
                  elementKey: "events",
                  renderFunction: eventsDisplay,
                },
                { label: "Prefix", elementKey: "prefix" },
                { label: "Suffix", elementKey: "suffix" },
              ]}
              isLoading={loadingEvents}
              records={records}
              entityName="Events"
              idField="id"
              customPaperHeight={classes.twHeight}
            />
          </SecureComponent>
        </Grid>
        {!loadingEvents && (
          <Grid item xs={12}>
            <br />
            <HelpBox
              title={"Event Notifications"}
              iconComponent={<LambdaIcon />}
              help={
                <Fragment>
                  MinIO bucket notifications allow administrators to send
                  notifications to supported external services on certain object
                  or bucket events. MinIO supports bucket and object-level S3
                  events similar to the Amazon S3 Event Notifications.
                  <br />
                  <br />
                  You can learn more at our{" "}
                  <a
                    href="https://min.io/docs/minio/linux/administration/monitoring/bucket-notifications.html?ref=con"
                    target="_blank"
                    rel="noopener"
                  >
                    documentation
                  </a>
                  .
                </Fragment>
              }
            />
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

export default withStyles(BucketEventsPanel, styles);;