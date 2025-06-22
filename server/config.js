import { env } from "./utils/env.js";

const appConfig = () => {
  return {
    PORT: env("PORT"),
  };
};

export default appConfig();
