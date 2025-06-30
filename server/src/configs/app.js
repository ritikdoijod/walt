import { env } from "../utils/env.js";

const appConfig = () => {
  return {
    PORT: env("PORT"),
    DATABASE_URL: env("DATABASE_URL"),
  };
};

export const config = appConfig();
