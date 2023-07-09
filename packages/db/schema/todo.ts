import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const todo = mysqlTable("todo", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
});
