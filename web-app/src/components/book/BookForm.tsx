import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ApiBookingWithUser, ApiProperty } from "../../types";
import ApiClientContext from "../context/ApiClientContext";
import ButtonLink from "../ButtonLink";

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(3),
  },
  formElement: {
    width: "100%",
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
    date: Date | null;
    nights: number;
  }>({
    firstName: "",
    lastName: "",
    date: null,
    nights: 1,
  });

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [booking, setBooking] = useState<ApiBookingWithUser | null>(null);

  const apiClient = useContext(ApiClientContext);
  if (!apiClient) {
    throw new Error("ApiClient not defined in context.");
  }

  const handleErrorDialogClose = (): void => {
    setError(null);
  };

  return (
    <>
      <form
        className={className}
        onSubmit={async (
          e: React.FormEvent<HTMLFormElement>,
        ): Promise<void> => {
          e.preventDefault();

          let date = data.date;
          if (submitting || !date) {
            return;
          }

          setSubmitting(true);

          let booking;
          try {
            booking = await apiClient.addBooking(
              property,
              {
                name: `${data.firstName} ${data.lastName}`,
              },
              date,
              data.nights,
            );
          } catch (err) {
            setError(
              "Sadly we could not process your request. Please try again in a couple of minutes.",
            );
            setSubmitting(false);

            return;
          }

          setBooking(booking);
        }}
        autoComplete="off"
      >
        <Card className={classes.section}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Date
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd.MM.yyyy"
                  minDate={new Date()}
                  id="date"
                  label="Date of arrival"
                  className={classes.formElement}
                  value={data.date}
                  onChange={(selectedDate: Date | null): void => {
                    setData({
                      ...data,
                      date: selectedDate,
                    });
                  }}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl className={classes.formElement}>
                  <InputLabel htmlFor="nights">Nights</InputLabel>
                  <Select
                    value={data.nights}
                    onChange={(
                      e: React.ChangeEvent<{ value: unknown }>,
                    ): void => {
                      const value = e.target.value;

                      setData({
                        ...data,
                        nights: value as number,
                      });
                    }}
                    inputProps={{
                      name: "nights",
                      id: "nights",
                    }}
                    required
                  >
                    {Array.from(
                      Array(20),
                      (_, index: number): number => index + 1,
                    ).map((currentNights: number) => {
                      return (
                        <MenuItem key={currentNights} value={currentNights}>
                          {currentNights}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.section}>
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
                  className={classes.formElement}
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
                  className={classes.formElement}
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

        <Box display="flex" justifyContent="flex-end">
          <ButtonLink
            color="secondary"
            disabled={submitting}
            to={{
              pathname: "/",
            }}
          >
            Back
          </ButtonLink>
          <Button color="primary" disabled={submitting} type="submit">
            Finish
          </Button>
        </Box>
      </form>

      <Dialog open={!!error} onClose={handleErrorDialogClose}>
        <DialogTitle>{"Request not successful"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!booking}>
        <DialogTitle>{"Booking successful"}</DialogTitle>
        <DialogContent>
          {booking && (
            <DialogContentText>
              Thank you for booking a stay at {booking.property_name}.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <ButtonLink
            color="primary"
            to={{
              pathname: "/",
            }}
          >
            Continue
          </ButtonLink>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookForm;
