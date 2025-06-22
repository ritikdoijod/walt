import { neon } from "@neondatabase/serverless";
import { config } from "./app.js";

export const sql = neon(config.DATABASE_URL);
