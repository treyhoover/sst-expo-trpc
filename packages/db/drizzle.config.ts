import type { Config as DrizzleKitConfig } from "drizzle-kit";

export default {
  schema: "./schema/*",
  driver: "mysql2",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env["SST_Secret_value_DB_URL"]!,
  },
} satisfies DrizzleKitConfig;
