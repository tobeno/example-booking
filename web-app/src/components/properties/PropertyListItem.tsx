import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Nl2Br from "../Nl2Br";
import { ApiProperty } from "../../types";
import ButtonLink from "../ButtonLink";

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
  bookable?: boolean;
  className?: string;
  item: ApiProperty;
};

const PropertyListItem: React.FC<Props> = ({
  bookable = false,
  className = "",
  item,
}) => {
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
        {bookable ? (
          <ButtonLink
            size="small"
            color="primary"
            to={{
              pathname: "/book",
              state: { property: item },
            }}
          >
            Book now
          </ButtonLink>
        ) : (
          <span />
        )}
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
