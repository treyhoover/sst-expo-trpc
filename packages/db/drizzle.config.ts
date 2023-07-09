import type { Config as DrizzleKitConfig } from "drizzle-kit";
import { config } from "@notes/config";

export default {
  schema: "./schema/*",
  driver: "mysql2",
  out: "./drizzle",
  dbCredentials: {
    connectionString: config.DB_URL,
  },
} satisfies DrizzleKitConfig;
