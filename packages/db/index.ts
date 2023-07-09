export * from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { todo } from "./schema/todo";

export { todo };

export const createDb = (url: string) => {
  const connection = connect({
    url,
  });

  const schema = { todo };

  return drizzle(connection, { schema });
};
