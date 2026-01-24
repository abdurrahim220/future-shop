import { AccessTokenPayload } from "../../interface/jwtInterface";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {};
