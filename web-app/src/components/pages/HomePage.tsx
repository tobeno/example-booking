import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import PropertyListContainer from "../properties/PropertyListContainer";

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
      <PropertyListContainer />
    </Container>
  );
};

export default HomePage;
