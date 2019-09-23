import { Schema, Document } from "mongoose";
import { User } from "./UserSchema";

export interface Booking extends Document {
  propertyId: string;
  propertyName: string;
  propertyLocation: string;
  date: Date;
  nights: number;
  user: User;
}

const BookingSchema = new Schema({
  propertyId: { type: String, required: true },
  propertyName: { type: String, required: true },
  propertyLocation: { type: String, required: true },
  date: { type: Date, required: true },
  nights: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default BookingSchema;
