export * from "drizzle-orm";
import {
  drizzle,
  PlanetScaleDatabase,
} from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { todo } from "./schema/todo";

export { todo };

const schema = { todo };

type Schema = typeof schema;

export const createDb = (url: string): PlanetScaleDatabase<Schema> => {
  const connection = connect({
    url,
  });

  return drizzle(connection, { schema });
};
