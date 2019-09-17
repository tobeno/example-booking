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
import Nl2Br from "../Nl2Br";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  cardActions: {
    justifyContent: "space-between",
  },
  cardDistance: {
    paddingRight: theme.spacing(1),
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
          <Nl2Br text={item.location} />
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Book now
        </Button>
        {item.distance && (
          <Typography
            className={classes.cardDistance}
            variant="body2"
            color="textSecondary"
          >
            {item.distance} m
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default PropertyListItem;
