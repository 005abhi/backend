import "dotenv/config";

const env = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URL,
  AT_SECRET: process.env.AT_SECRET,
  AT_EXPIRY: process.env.AT_EXPIRY,
  RT_SECRET: process.env.RT_SECRET,
  RT_EXPIRY: process.env.RT_EXPIRY,
};

export default env;
