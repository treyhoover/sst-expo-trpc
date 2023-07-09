import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { todo } from "./schema/todo";
import { config } from "@notes/config";

const schema = { todo };

const connection = connect({
  url: config.DB_URL,
});

export { todo };
export const db = drizzle(connection, { schema });
