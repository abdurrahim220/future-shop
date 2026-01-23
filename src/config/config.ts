export const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  mongoDB: process.env.MONGO_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
};
