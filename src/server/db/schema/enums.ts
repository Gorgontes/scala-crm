import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  unique,
  index,
} from "drizzle-orm/pg-core";

export const crmTypesEnums = pgTable(
  "crm_types_enums",
  {
    enum_id: serial("enum_id").primaryKey(),
    categoria: varchar("categoria", { length: 50 }).notNull(),
    valor: varchar("valor", { length: 100 }).notNull(),
    descripcion: text("descripcion"),
    is_active: boolean("is_active").default(true),
    orden: integer("orden"),
  },
  (table) => [
    unique().on(table.categoria, table.valor),
    index().on(table.categoria),
  ],
);
