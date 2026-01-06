import app from "./app";
import config from "./config/config";
import connectDB from "./db/connectDB";

async function main() {
  app.listen(config.port, () => {
    connectDB();
    console.log(`Server is running on port ${config.port}`);
  });
}
main().catch((error) => {
  console.error("Failed to start server:", error);
});
