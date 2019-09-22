import mongoose, { Connection } from "mongoose";
import BookingSchema, { Booking } from "./schemas/BookingSchema";
import UserSchema, { User } from "./schemas/UserSchema";

export interface Model {
  Booking: mongoose.Model<Booking>;
  User: mongoose.Model<User>;
}

export function createModel(connection: Connection): Model {
  const Booking = connection.model<Booking>("Booking", BookingSchema);
  const User = connection.model<User>("User", UserSchema);

  return {
    Booking,
    User,
  };
}
