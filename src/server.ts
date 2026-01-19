import app from "./app";
import { config } from "./config/config";
import { connectDB } from "./db/connectDB";

async function main() {
  await connectDB();
  app.listen(config.port, () =>
    console.log(`Server running on port ${config.port}`),
  );
}

main();
