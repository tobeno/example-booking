import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import PropertyList from "../properties/PropertyList";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  className?: string;
};

const HomePage: React.FC<Props> = ({ className = "" }) => {
  const classes = useStyles();

  return (
    <Container className={[classes.root, className].join(" ")} maxWidth="lg">
      <PropertyList />
    </Container>
  );
};

export default HomePage;
