import { Types } from "mongoose";

export interface AuthLoginInput {
  identifier: string;
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
