import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  type?: string;
  wrongOtpAttempts?: number;
  blockedUntil?: Date;
  createdAt?: number;
  updatedAt?: number;
}

//Validation match
const emailMatch: [RegExp, string] = [/([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z0-9])+/i, 'No email found ({VALUE})'];
/**
 * User schema for mongoose
 * @type {Schema}
 */

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: [true, 'Username already exists'],
    },
    email: {
      type: String,
      match: emailMatch,
      unique: [true, 'Email already exists'],
    },
    type: {
      type: String,
      enum: ['GOOGLE', 'CUSTOM'],
      default: 'CUSTOM',
    },
    wrongOtpAttempts: {
      type: Number,
      default: 0,
    },
    blockedUntil: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const User: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
