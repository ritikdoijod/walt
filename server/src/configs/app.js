import { env } from "../utils/env.js";

const appConfig = () => {
  return {
    PORT: env("PORT"),
    DATABASE_URL: env("DATABASE_URL"),
    CLERK_PUBLISHABLE_KEY: env("CLERK_PUBLISHABLE_KEY"),
    CLERK_SECRET_KEY: env("CLERK_SECRET_KEY"),
  };
};

export const config = appConfig();
