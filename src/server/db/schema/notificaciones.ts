import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const crmNotificacion = pgTable(
  "crm_notificacion",
  {
    notificacionId: uuid("notificacion_id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    sourceId: uuid("source_id"),
    notificacionTipo: varchar("notificacion_tipo", { length: 50 }).notNull(),
    notificacionEstado: varchar("notificacion_estado", { length: 20 }).default("PENDIENTE").notNull(),
    notificacionPrioridad: varchar("notificacion_prioridad", { length: 20 }).default("NORMAL").notNull(),
    notificacionTitulo: varchar("notificacion_titulo", { length: 200 }).notNull(),
    notificacionMsg: text("notificacion_msg").notNull(),
    notificacionLeido: boolean("notificacion_leido").default(false).notNull(),
    notificacionFechaLeido: timestamp("notificacion_fecha_leido"),
    notificacionFechaCreado: timestamp("notificacion_fecha_creado").defaultNow().notNull(),
    notificacionFechaExpira: timestamp("notificacion_fecha_expira"),
    notificacionUrl: varchar("notificacion_url", { length: 500 }),

    flagNotifyMail: boolean("flag_notify_mail").default(false).notNull(),
    flagNotifySms: boolean("flag_notify_sms").default(false).notNull(),
    flagNotifyPush: boolean("flag_notify_push").default(false).notNull(),

    notifyContentMail: text("notify_content_mail"),
    notifyContentSms: text("notify_content_sms"),
    notifyContentPush: text("notify_content_push"),

    notificacionMeta: jsonb("notificacion_meta"),
    notificacionEtiquetas: text("notificacion_etiquetas").array(),
  },
);
