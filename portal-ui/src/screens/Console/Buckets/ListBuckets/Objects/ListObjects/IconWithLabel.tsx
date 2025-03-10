import React from "react";

import { withStyles } from "../../../../../../theme/makeStyles";

interface IIconWithLabel {
  classes?: any;
  icon: JSX.Element;
  strings: string[];
}

const styles = () => ({
  fileName: {
    display: "flex",
    alignItems: "center",
    "& .min-icon": {
      width: 16,
      height: 16,
      marginRight: 4,
      minWidth: 16,
      minHeight: 16,
    },
  },
  fileNameText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const IconWithLabel = ({ classes, icon, strings }: IIconWithLabel) => {
  return (
    <div className={classes.fileName}>
      {icon}
      <span className={classes.fileNameText}>
        {strings[strings.length - 1]}
      </span>
    </div>
  );
};

export default withStyles(IconWithLabel, styles);
