// This file is part of MinIO Design System
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
import { Meta, Story } from "@storybook/react";

import * as cicons from "./";
import * as micons from "./SidebarMenus";
import * as ficons from "./FileIcons";
import Grid from "../Grid/Grid";
import StoryThemeProvider from "../../utils/StoryThemeProvider";
import GlobalStyles from "../GlobalStyles/GlobalStyles";
import Button from "../Button/Button";

export default {
  title: "MDS/Graphics/Icons",
  component: Fragment,
  argTypes: {},
} as Meta;

const Template: Story = (args) => {
  const [color, setColor] = useState<boolean>(false);

  return (
    <StoryThemeProvider>
      <GlobalStyles />
      <Fragment>
        <Grid container>
          <Grid item xs={12}>
            <Button
              id={"colorToggle"}
              variant={color ? "secondary" : "regular"}
              onClick={() => {
                setColor(!color);
              }}
            >
              {color ? "Red (Colored Icon)" : "Default Color"}
            </Button>
          </Grid>
          <h1>Icons</h1>
          <Grid
            container
            sx={{
              padding: 4,
              margin: 5,
              textAlign: "center",
              "& .min-icon": {
                color: color ? "red" : "black",
              },
              "& div": {
                padding: 5,
                margin: 5,
              },
            }}
          >
            <Grid item xs={3} sm={2} md={1}>
              <cicons.AccessRuleIcon />
              <br />
              AccessRuleIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AccountIcon />
              <br />
              AccountIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AddAccessRuleIcon />
              <br />
              AddAccessRuleIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AddFolderIcon />
              <br />
              AddFolderIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AddIcon />
              <br />
              AddIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AddMembersToGroupIcon />
              <br />
              AddMembersToGroupIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AddNewTagIcon />
              <br />
              AddNewTagIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AlertIcon />
              <br />
              AlertIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AllBucketsIcon />
              <br />
              AllBucketsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ArrowDropDown />
              <br />
              ArrowDropDown
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ArrowDropUp />
              <br />
              ArrowDropUp
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ArrowIcon />
              <br />
              ArrowIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ArrowRightIcon />
              <br />
              ArrowRightIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AzureTierIcon />
              <br />
              AzureTierIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.AzureTierIconXs />
              <br />
              AzureTierIconXs
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.BackSettingsIcon />
              <br />
              BackSettingsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.BoxArrowDown />
              <br />
              BoxArrowDown
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.BoxArrowUp />
              <br />
              BoxArrowUp
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.BucketEncryptionIcon />
              <br />
              BucketEncryptionIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.BucketQuotaIcon />
              <br />
              BucketQuotaIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.BucketReplicationIcon />
              <br />
              BucketReplicationIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.BucketsIcon />
              <br />
              BucketsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CalendarIcon />
              <br />
              CalendarIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CallHomeFeatureIcon />
              <br />
              CallHomeFeatureIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CancelledIcon />
              <br />
              CancelledIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CertificateIcon />
              <br />
              CertificateIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ChangeAccessPolicyIcon />
              <br />
              ChangeAccessPolicyIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ChangePasswordIcon />
              <br />
              ChangePasswordIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CircleIcon />
              <br />
              CircleIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ClosePanelIcon />
              <br />
              ClosePanelIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CloudIcon />
              <br />
              CloudIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ClustersIcon />
              <br />
              ClustersIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CollapseCaret />
              <br />
              CollapseCaret
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CollapseIcon />
              <br />
              CollapseIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ComputerLineIcon />
              <br />
              ComputerLineIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ConfigurationsListIcon />
              <br />
              ConfigurationsListIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ConfirmDeleteIcon />
              <br />
              ConfirmDeleteIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ConfirmModalIcon />
              <br />
              ConfirmModalIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ConsoleIcon />
              <br />
              ConsoleIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CopyIcon />
              <br />
              CopyIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CreateGroupIcon />
              <br />
              CreateGroupIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CreateIcon />
              <br />
              CreateIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CreateNewPathIcon />
              <br />
              CreateNewPathIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.CreateUserIcon />
              <br />
              CreateUserIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DashboardIcon />
              <br />
              DashboardIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DeleteIcon />
              <br />
              DeleteIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DeleteNonCurrentIcon />
              <br />
              DeleteNonCurrentIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DiagnosticsFeatureIcon />
              <br />
              DiagnosticsFeatureIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DiagnosticsIcon />
              <br />
              DiagnosticsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DisableIcon />
              <br />
              DisableIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DisabledIcon />
              <br />
              DisabledIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DocumentationIcon />
              <br />
              DocumentationIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DownloadIcon />
              <br />
              DownloadIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DownloadStatIcon />
              <br />
              DownloadStatIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DriveFormatErrorsIcon />
              <br />
              DriveFormatErrorsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.DrivesIcon />
              <br />
              DrivesIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EditIcon />
              <br />
              EditIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EditTagIcon />
              <br />
              EditTagIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EditTenantIcon />
              <br />
              EditTenantIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EditYamlIcon />
              <br />
              EditYamlIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EditorThemeSwitchIcon />
              <br />
              EditorThemeSwitchIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EgressIcon />
              <br />
              EgressIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EnabledIcon />
              <br />
              EnabledIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.EventSubscriptionIcon />
              <br />
              EventSubscriptionIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ExpandCaret />
              <br />
              ExpandCaret
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ExtraFeaturesIcon />
              <br />
              ExtraFeaturesIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.FolderIcon />
              <br />
              FolderIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.FormatDriveIcon />
              <br />
              FormatDriveIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.FormatDrivesIcon />
              <br />
              FormatDrivesIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.GoogleTierIcon />
              <br />
              GoogleTierIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.GoogleTierIconXs />
              <br />
              GoogleTierIconXs
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.GroupsIcon />
              <br />
              GroupsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.HardBucketQuotaIcon />
              <br />
              HardBucketQuotaIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.HealIcon />
              <br />
              HealIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.HelpIcon />
              <br />
              HelpIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.HelpIconFilled />
              <br />
              HelpIconFilled
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.HistoryIcon />
              <br />
              HistoryIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.IAMPoliciesIcon />
              <br />
              IAMPoliciesIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.InfoIcon />
              <br />
              InfoIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.JSONIcon />
              <br />
              JSONIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LambdaBalloonIcon />
              <br />
              LambdaBalloonIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LambdaIcon />
              <br />
              LambdaIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LambdaNotificationsIcon />
              <br />
              LambdaNotificationsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LegalHoldIcon />
              <br />
              LegalHoldIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LicenseIcon />
              <br />
              LicenseIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LifecycleConfigIcon />
              <br />
              LifecycleConfigIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LinkIcon />
              <br />
              LinkIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LockFilledIcon />
              <br />
              LockFilledIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LockIcon />
              <br />
              LockIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LogoutIcon />
              <br />
              LogoutIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.LogsIcon />
              <br />
              LogsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.MetadataIcon />
              <br />
              MetadataIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.MinIOTierIcon />
              <br />
              MinIOTierIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.MinIOTierIconXs />
              <br />
              MinIOTierIconXs
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.MirroringIcon />
              <br />
              MirroringIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.MultipleBucketsIcon />
              <br />
              MultipleBucketsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.NewAccountIcon />
              <br />
              NewAccountIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.NewPathIcon />
              <br />
              NewPathIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.NewPoolIcon />
              <br />
              NewPoolIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.NextArrowIcon />
              <br />
              NextArrowIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ObjectBrowser1Icon />
              <br />
              ObjectBrowser1Icon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ObjectBrowserFolderIcon />
              <br />
              ObjectBrowserFolderIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ObjectBrowserIcon />
              <br />
              ObjectBrowserIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ObjectInfoIcon />
              <br />
              ObjectInfoIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ObjectManagerIcon />
              <br />
              ObjectManagerIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ObjectPreviewIcon />
              <br />
              ObjectPreviewIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.OfflineRegistrationBackIcon />
              <br />
              OfflineRegistrationBackIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.OfflineRegistrationIcon />
              <br />
              OfflineRegistrationIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.OnlineRegistrationBackIcon />
              <br />
              OnlineRegistrationBackIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.OnlineRegistrationIcon />
              <br />
              OnlineRegistrationIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.OpenListIcon />
              <br />
              OpenListIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.PasswordKeyIcon />
              <br />
              PasswordKeyIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.PerformanceFeatureIcon />
              <br />
              PerformanceFeatureIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.PermissionIcon />
              <br />
              PermissionIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.PreviewIcon />
              <br />
              PreviewIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.PrometheusErrorIcon />
              <br />
              PrometheusErrorIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.PrometheusIcon />
              <br />
              PrometheusIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.RecoverIcon />
              <br />
              RecoverIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.RedoIcon />
              <br />
              RedoIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.RefreshIcon />
              <br />
              RefreshIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.RemoveAllIcon />
              <br />
              RemoveAllIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.RemoveIcon />
              <br />
              RemoveIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ReportIcon />
              <br />
              ReportIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ReportedUsageFullIcon />
              <br />
              ReportedUsageFullIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ReportedUsageIcon />
              <br />
              ReportedUsageIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.RetentionIcon />
              <br />
              RetentionIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.S3TierIcon />
              <br />
              S3TierIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.S3TierIconXs />
              <br />
              S3TierIconXs
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.SearchIcon />
              <br />
              SearchIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.SelectAllIcon />
              <br />
              SelectAllIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.SelectMultipleIcon />
              <br />
              SelectMultipleIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ServersIcon />
              <br />
              ServersIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ServiceAccountCredentialsIcon />
              <br />
              ServiceAccountCredentialsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ServiceAccountIcon />
              <br />
              ServiceAccountIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ServiceAccountsIcon />
              <br />
              ServiceAccountsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.SettingsIcon />
              <br />
              SettingsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ShareIcon />
              <br />
              ShareIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.SpeedtestIcon />
              <br />
              SpeedtestIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.StarIcon />
              <br />
              StarIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.StorageIcon />
              <br />
              StorageIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.SyncIcon />
              <br />
              SyncIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TagsIcon />
              <br />
              TagsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TenantsIcon />
              <br />
              TenantsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TenantsOutlineIcon />
              <br />
              TenantsOutlineIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TiersIcon />
              <br />
              TiersIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TiersNotAvailableIcon />
              <br />
              TiersNotAvailableIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TierOfflineIcon />
              <br />
              TierOfflineIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TierOnlineIcon />
              <br />
              TierOnlineIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TimeIcon />
              <br />
              TimeIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.ToolsIcon />
              <br />
              ToolsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TotalObjectsIcon />
              <br />
              TotalObjectsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TraceIcon />
              <br />
              TraceIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.TrashIcon />
              <br />
              TrashIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.UploadFile />
              <br />
              UploadFile
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.UploadFolderIcon />
              <br />
              UploadFolderIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.UploadIcon />
              <br />
              UploadIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.UploadStatIcon />
              <br />
              UploadStatIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.UptimeIcon />
              <br />
              UptimeIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.UsersIcon />
              <br />
              UsersIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.VerifiedIcon />
              <br />
              VerifiedIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.VersionIcon />
              <br />
              VersionIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.VersionsIcon />
              <br />
              VersionsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.WarnIcon />
              <br />
              WarnIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.WarpIcon />
              <br />
              WarpIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <cicons.WatchIcon />
              <br />
              WatchIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.AlertCloseIcon />
              <br />
              AlertCloseIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.OpenSourceIcon />
              <br />
              OpenSourceIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.LicenseDocIcon />
              <br />
              LicenseDocIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.BackIcon />
              <br />
              BackIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.FilterIcon />
              <br />
              FilterIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.SuccessIcon />
              <br />
              SuccessIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.NetworkGetIcon />
              <br />
              NetworkGetIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.NetworkPutIcon />
              <br />
              NetworkPutIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.UserFilledIcon />
              <br />
              UserFilledIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.ViewColumnIcon />
              <br />
              ViewColumnIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.VisibilityOffIcon />
              <br />
              VisibilityOffIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.VisibilityOnIcon />
              <br />
              VisibilityOnIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <cicons.WarnFilledIcon />
              <br />
              WarnFilledIcon
            </Grid>
          </Grid>
          <h1>Menu Icons</h1>
          <Grid
            container
            sx={{
              padding: 4,
              textAlign: "center",
              "& .min-icon": {
                color: color ? "red" : "black",
              },
            }}
          >
            <Grid item xs={3} sm={2} md={1}>
              <micons.AccessMenuIcon />
              <br />
              AccessMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.AccountsMenuIcon />
              <br />
              AccountsMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.AuditLogsMenuIcon />
              <br />
              AuditLogsMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.BucketsMenuIcon />
              <br />
              BucketsMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.CallHomeMenuIcon />
              <br />
              CallHomeMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.DiagnosticsMenuIcon />
              <br />
              DiagnosticsMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.DrivesMenuIcon />
              <br />
              DrivesMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.GroupsMenuIcon />
              <br />
              GroupsMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.HealthMenuIcon />
              <br />
              HealthMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.IdentityMenuIcon />
              <br />
              IdentityMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.InspectMenuIcon />
              <br />
              InspectMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.LogsMenuIcon />
              <br />
              LogsMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.MenuCollapsedIcon />
              <br />
              MenuCollapsedIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.MenuExpandedIcon />
              <br />
              MenuExpandedIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.MetricsMenuIcon />
              <br />
              MetricsMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.MonitoringMenuIcon />
              <br />
              MonitoringMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.PerformanceMenuIcon />
              <br />
              PerformanceMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.ProfileMenuIcon />
              <br />
              ProfileMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.RegisterMenuIcon />
              <br />
              RegisterMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.SupportMenuIcon />
              <br />
              SupportMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.TraceMenuIcon />
              <br />
              TraceMenuIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <micons.UsersMenuIcon />
              <br />
              UsersMenuIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <micons.KeysMenuIcon />
              <br />
              KeysMenuIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <micons.StatusMenuIcon />
              <br />
              StatusMenuIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <micons.SecretsMenuIcon />
              <br />
              SecretsMenuIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <micons.PoliciesMenuIcon />
              <br />
              PoliciesMenuIcon
            </Grid>
            <Grid item xs={3} sm={2} md={1}>
              <micons.IdentitiesMenuIcon />
              <br />
              IdentitiesMenuIcon
            </Grid>
          </Grid>
          <h1>File Icons</h1>
          <Grid
            container
            sx={{
              padding: 4,
              textAlign: "center",
              "& .min-icon": {
                color: color ? "red" : "black",
              },
            }}
          >
            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileBookIcon />
              <br />
              FileBookIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileCloudIcon />
              <br />
              FileCloudIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileCodeIcon />
              <br />
              FileCodeIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileConfigIcon />
              <br />
              FileConfigIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileDbIcon />
              <br />
              FileDbIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileFontIcon />
              <br />
              FileFontIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileImageIcon />
              <br />
              FileImageIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileLinkIcon />
              <br />
              FileLinkIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileLockIcon />
              <br />
              FileLockIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileMissingIcon />
              <br />
              FileMissingIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileMusicIcon />
              <br />
              FileMusicIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileNonType />
              <br />
              FileNonType
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FilePdfIcon />
              <br />
              FilePdfIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FilePptIcon />
              <br />
              FilePptIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileTxtIcon />
              <br />
              FileTxtIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileVideoIcon />
              <br />
              FileVideoIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileWorldIcon />
              <br />
              FileWorldIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileXlsIcon />
              <br />
              FileXlsIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FileZipIcon />
              <br />
              FileZipIcon
            </Grid>

            <Grid item xs={3} sm={2} md={1}>
              <ficons.FolderBrowserIcon />
              <br />
              FolderBrowserIcon
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    </StoryThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
