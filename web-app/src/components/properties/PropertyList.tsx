import React from "react";
import { Grid } from "@material-ui/core";
import PropertyListItem from "./PropertyListItem";

type Props = {
  className?: string;
};

const PropertyList: React.FC<Props> = ({ className = "" }) => {
  return (
    <Grid container spacing={3} className={className}>
      <Grid item xs={12} md={6}>
        <PropertyListItem />
      </Grid>
    </Grid>
  );
};

export default PropertyList;
