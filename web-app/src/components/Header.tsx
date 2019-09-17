import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className = "" }) => {
  const classes = useStyles();

  return (
    <header className={[classes.root, className].join(" ")}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Booking Example
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
