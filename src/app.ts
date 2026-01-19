import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";
import router from "./route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});
app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(notFound);
export default app;
