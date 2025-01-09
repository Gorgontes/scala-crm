import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { crmBaseAudit, crmBaseEntidad } from "./bases";

export const crmAbstractArchivo = pgTable(
  "crm_abstract_archivo",
  {
    crm_archivo_id: uuid("crm_archivo_id").primaryKey().defaultRandom(),
    storage_type: varchar("storage_type", { length: 50 }),
    mime_type: varchar("mime_type", { length: 50 }),
    file_path: varchar("file_path", { length: 50 }),
    file_name: varchar("file_name", { length: 50 }),
    file_size: varchar("file_size", { length: 50 }),
    hash: varchar("hash", { length: 50 }),
    metadata: jsonb("metadata"),
    ...crmBaseAudit,
    ...crmBaseEntidad,
  },
);

export const crmAbstractComentario = pgTable(
  "crm_abstract_comentario",
  {
    crm_comentario_id: uuid("crm_comentario_id").primaryKey().defaultRandom(),
    author_id: uuid("author_id").notNull(),
    parent_comment_id: uuid("parent_comment_id"),
    edited_at: timestamp("edited_at").defaultNow(),
    content: text("content").notNull(),
    metadata: jsonb("metadata"),
    ...crmBaseAudit,
    ...crmBaseEntidad,
  },
);


export const crmAbstractHistoryLog = pgTable(
  "crm_abstract_history_log",
  {
    history_log_id: uuid("history_log_id").primaryKey().defaultRandom(),
    field_name: text("field_name"),
    old_value: jsonb("old_value"),
    new_value: jsonb("new_value"),
    change_reason: text("change_reason"),
    change_type: varchar("change_type", { length: 20 }).notNull(),
    metadata: jsonb("metadata"),
    ...crmBaseAudit,
    ...crmBaseEntidad,
  },
);


