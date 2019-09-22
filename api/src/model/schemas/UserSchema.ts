import { Schema, Document } from "mongoose";

export interface User extends Document {
  name: string;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
});

export default UserSchema;
