import { Schema, Document } from "mongoose";
import { User } from "./UserSchema";

export interface Booking extends Document {
  propertyId: string;
  propertyName: string;
  propertyLocation: string;
  user: User;
}

const BookingSchema = new Schema({
  propertyId: { type: String, required: true },
  propertyName: { type: String, required: true },
  propertyLocation: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default BookingSchema;
