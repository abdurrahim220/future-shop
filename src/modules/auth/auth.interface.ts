import { Types } from "mongoose";

export interface AuthLoginInput {
  email: string;
  phone: string;
  password: string;
}

export interface AuthPayload {
  id: Types.ObjectId;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
