import type { JwtPayload } from "jsonwebtoken";

export interface RefreshTokenPayload extends JwtPayload {
  id: string;
}
