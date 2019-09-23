import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { ApiBookingWithUser, ApiProperty } from "../../types";
import ApiClientContext from "../context/ApiClientContext";

const useStyles = makeStyles(theme => ({
  fields: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "100%",
  },
  button: {
    display: "block",
    marginLeft: "auto",
    marginTop: theme.spacing(3),
  },
}));

type Props = {
  className?: string;
  property: ApiProperty;
};

const BookForm: React.FC<Props> = ({ property, className = "" }) => {
  const classes = useStyles();
  const [data, setData] = useState<{
    firstName: string;
    lastName: string;
  }>({
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [booking, setBooking] = useState<ApiBookingWithUser | null>(null);

  const apiClient = useContext(ApiClientContext);
  if (!apiClient) {
    throw new Error("ApiClient not defined in context.");
  }

  const handleDialogClose = (): void => {
    setError(null);
  };

  if (booking) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form
        className={className}
        onSubmit={async (
          e: React.FormEvent<HTMLFormElement>,
        ): Promise<void> => {
          e.preventDefault();

          if (submitting) {
            return;
          }

          setSubmitting(true);

          let booking;
          try {
            booking = await apiClient.addBooking(property, {
              name: `${data.firstName} ${data.lastName}`,
            });
          } catch (err) {
            setError(
              "Sadly we could not process your request. Please try again in a couple of minutes.",
            );

            return;
          }

          setBooking(booking);
        }}
        autoComplete="off"
      >
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="first-name"
                  label="First name"
                  value={data.firstName}
                  className={classes.textField}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setData({
                      ...data,
                      firstName: e.target.value,
                    });
                  }}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="last-name"
                  label="Last name"
                  value={data.lastName}
                  className={classes.textField}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setData({
                      ...data,
                      lastName: e.target.value,
                    });
                  }}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button
          className={classes.button}
          color="primary"
          disabled={submitting}
          type="submit"
        >
          Finish
        </Button>
      </form>
      <Dialog open={!!error} onClose={handleDialogClose}>
        <DialogTitle>{"Request not successful"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookForm;
