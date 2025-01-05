import { pgTableCreator, uuid, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `testing_${name}`);

export const users = createTable("users", {
  id: uuid().primaryKey(),
  name: varchar({length: 255}),
  email: varchar({length: 255}),
})