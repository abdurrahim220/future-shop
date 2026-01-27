import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./route";
import cookieParser from "cookie-parser";
import { auditContext } from "./middleware/auditContext.middleware";
import { populateUser } from "./middleware/populateUser";

const app = express();

app.use(cors());
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
