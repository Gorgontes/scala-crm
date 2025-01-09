import { pgTable, pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `testing_${name}`);

export const users = createTable("user", {
  id: uuid().primaryKey(),
  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }),
});

export const comments = pgTable(
  "comment",
  {
    id: uuid().primaryKey(),
    text: varchar({ length: 255 }),
    userId: uuid(),
  },
  (table) => [],
);

type Table = Parameters<typeof pgTable>;