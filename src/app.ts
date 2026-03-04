import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./route";
import cookieParser from "cookie-parser";
import { auditContext } from "./middleware/auditContext.middleware";
import { populateUser } from "./middleware/populateUser";

const app = express();

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5000",
  "http://localhost:5006",
  "http://localhost:5007",
  "http://localhost:5008",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === "null" || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(populateUser);
app.use(auditContext);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});
app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
