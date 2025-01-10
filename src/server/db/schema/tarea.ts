import {
  pgTable,
  uuid,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";
import { crmBaseAudit, crmBaseEntidad } from "./bases";
import { crmWorkflowBase } from "./workflow";

export const crmFlujoTarea = pgTable(
  "crm_flujo_tarea",
  {
    crmFlujoTareaId: uuid("crm_flujo_tarea_id").primaryKey().defaultRandom(),
    tareaTitulo: varchar("tarea_titulo", { length: 255 }).notNull(),
    tareaDescripcion: varchar("tarea_descripcion", { length: 255 }).notNull(),
    tareaChecklist: jsonb("tarea_checklist"),
    ...crmBaseEntidad,
    ...crmWorkflowBase,
  },
);
