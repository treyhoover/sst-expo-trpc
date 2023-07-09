import { z } from "zod";

const schema = z.object({
  DB_URL: z.string(),
});

export const config = schema.parse({
  DB_URL: process.env["SST_Secret_value_DB_URL"],
});
