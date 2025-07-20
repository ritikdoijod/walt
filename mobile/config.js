import { env } from "./utils";

const appConfig = () => {
  return {
    API_URL: env("API_URL"),
  };
};

const config = appConfig();

export { config };
