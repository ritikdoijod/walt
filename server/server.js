import { app } from "./app.js";
import logger from "./logger.js";
import { config } from "./configs/app.js";
import { sql } from "./configs/db.js";

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    logger.info("Database initialized successfully.");
  } catch (error) {
    logger.error(error.stack, "Failed to initialize database.");
    process.exit(1);
  }
}

initDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server running on https://localhost:${config.PORT}`);
  });
});
