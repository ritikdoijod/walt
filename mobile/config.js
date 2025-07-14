import { env } from "./env";

const appConfig = () => {
  return {
    API_URL: env("API_URL"),
  };
};

const config = appConfig();

export { config };
