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
    crmArchivoId: uuid("crm_archivo_id").primaryKey().defaultRandom(),
    storageType: varchar("storage_type", { length: 50 }),
    mimeType: varchar("mime_type", { length: 50 }),
    filePath: varchar("file_path", { length: 50 }),
    fileName: varchar("file_name", { length: 50 }),
    fileSize: varchar("file_size", { length: 50 }),
    hash: varchar("hash", { length: 50 }),
    metadata: jsonb("metadata"),
    ...crmBaseAudit,
    ...crmBaseEntidad,
  },
);

export const crmAbstractComentario = pgTable(
  "crm_abstract_comentario",
  {
    crmComentarioId: uuid("crm_comentario_id").primaryKey().defaultRandom(),
    authorId: uuid("author_id").notNull(),
    parentCommentId: uuid("parent_comment_id"),
    editedAt: timestamp("edited_at").defaultNow(),
    content: text("content").notNull(),
    metadata: jsonb("metadata"),
    ...crmBaseAudit,
    ...crmBaseEntidad,
  },
);

export const crmAbstractHistoryLog = pgTable(
  "crm_abstract_history_log",
  {
    historyLogId: uuid("history_log_id").primaryKey().defaultRandom(),
    fieldName: text("field_name"),
    oldValue: jsonb("old_value"),
    newValue: jsonb("new_value"),
    changeReason: text("change_reason"),
    changeType: varchar("change_type", { length: 20 }).notNull(),
    metadata: jsonb("metadata"),
    ...crmBaseAudit,
    ...crmBaseEntidad,
  },
);
