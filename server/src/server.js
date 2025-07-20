import { serve } from "@hono/node-server";
import { app } from "./app.js";
import { config } from "./configs/app.js";
import logger from "./configs/logger.js";

serve(
  {
    fetch: app.fetch,
    port: config.PORT,
  },
  (info) => {
    logger.info(`Server is running on http://localhost:${info.port}`);
  },
);
