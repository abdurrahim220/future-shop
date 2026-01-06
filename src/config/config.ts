const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  node_env: process.env.NODE_ENV || "development",
};

export default config;
