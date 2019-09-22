import React, { useContext, useEffect, useState } from "react";
import { usePosition } from "use-position";
import PropertyList from "./PropertyList";
import ApiClientContext from "../context/ApiClientContext";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { ApiProperty } from "../../types";

type Props = {
  className?: string;
};

const PropertyListContainer: React.FC<Props> = ({ className = "" }) => {
  const [items, setItems] = useState<Array<ApiProperty> | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);

  const position = usePosition();

  const apiClient = useContext(ApiClientContext);
  if (!apiClient) {
    throw new Error("ApiClient not defined in context.");
  }

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      let longitude = position.longitude;
      let latitude = position.latitude;

      if (!latitude || !longitude || fetching) {
        return;
      }

      setFetching(true);

      const items = await apiClient.getProperties(
        `${latitude.toFixed(6)},${longitude.toFixed(6)}`,
      );

      setItems(items);
    };

    fetchData().catch((err: Error): void => {
      throw err;
    });
  }, [apiClient, position, fetching]);

  return (
    <>
      {items ? (
        <PropertyList className={className} items={items} />
      ) : (
        <Box display="flex" justifyContent="center" className={className}>
          <CircularProgress />
        </Box>
      )}

      <Dialog open={!!position.error}>
        <DialogTitle>{"Location needed"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To display accommodations for you, we need to access your position.
            <br />
            Please enable access to your current position in your browser
            settings.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyListContainer;
