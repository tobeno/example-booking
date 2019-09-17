import React from "react";
import Router from "./Router";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(5),
  },
}));

interface Props {
  className?: string;
}

const Page: React.FC<Props> = ({ className = "" }) => {
  const classes = useStyles();

  return (
    <div className={[classes.root, className].join(" ")}>
      <Router />
    </div>
  );
};

export default Page;
