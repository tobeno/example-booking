import React from "react";
import { Grid } from "@material-ui/core";
import PropertyListItem from "./PropertyListItem";
import { ApiProperty } from "../../types";

type Props = {
  className?: string;
  items: Array<ApiProperty>;
};

const PropertyList: React.FC<Props> = ({ className = "", items }) => {
  return (
    <Grid container spacing={3} className={className}>
      {items.map(item => (
        <Grid key={item.id} item xs={12} md={6}>
          <PropertyListItem bookable item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PropertyList;
