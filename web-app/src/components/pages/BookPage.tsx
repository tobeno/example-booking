import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import BookForm from "../book/BookForm";
import { RouteChildrenProps } from "react-router";
import { Redirect } from "react-router-dom";
import PropertyListItem from "../properties/PropertyListItem";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  property: {
    marginBottom: theme.spacing(3),
  },
}));

type Props = {
  className?: string;
} & RouteChildrenProps;

const BookPage: React.FC<Props> = ({
  location: { state = {} },
  className = "",
}) => {
  const classes = useStyles();
  if (!state.property) {
    return <Redirect to="/" />;
  }

  return (
    <Container className={[classes.root, className].join(" ")} maxWidth="sm">
      <Typography variant="h4" component="h1">
        Your Stay
      </Typography>
      <PropertyListItem item={state.property} className={classes.property} />
      <BookForm property={state.property} />
    </Container>
  );
};

export default BookPage;
