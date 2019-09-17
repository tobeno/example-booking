import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

type Props = {
  className?: string;
};

const PropertyListItem: React.FC<Props> = ({ className = "" }) => {
  const classes = useStyles();

  return (
    <Card className={[classes.root, className].join(" ")}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Dummy property
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
