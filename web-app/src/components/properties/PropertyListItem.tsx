import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ApiClientProperty } from "../../clients/ApiClient";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  className?: string;
  item: ApiClientProperty;
};

const PropertyListItem: React.FC<Props> = ({ className = "", item }) => {
  const classes = useStyles();

  return (
    <Card className={[classes.root, className].join(" ")}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Somestreet 42
          <br />
          12345 Anywhere
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Book now
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyListItem;
