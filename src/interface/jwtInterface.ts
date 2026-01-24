import type { JwtPayload } from "jsonwebtoken";
import { UserRole } from "./Role";

export interface RefreshTokenPayload extends JwtPayload {
  id: string;
  role: UserRole;
}

export interface AccessTokenPayload extends JwtPayload {
  id: string;
  role: UserRole;
}
