import {
  pgTable,
  uuid,
  varchar,
  date,
  boolean,
  jsonb,
  unique,
  index,
} from "drizzle-orm/pg-core";
import {
  crmBaseAudit,
  crmBaseContacto,
  crmBaseDireccion,
  crmBasePersona,
} from "./bases";
import { relations } from "drizzle-orm";

export const crmEntidadEmpleado = pgTable("crm_entidad_empleado", {
  crm_entidad_empleado_id: uuid().primaryKey().defaultRandom(),
  empleado_codigo: varchar("empleado_codigo", { length: 50 }),
  empleado_alias: varchar("empleado_alias", { length: 100 }),
  empleado_auth_id: uuid("empleado_auth_id").notNull(),
  empleado_fecha_inicio: date("empleado_fecha_inicio"),
  empleado_fecha_fin: date("empleado_fecha_fin"),
  empleado_cargo: varchar("empleado_cargo", { length: 100 }),
  empleado_area: varchar("empleado_area", { length: 100 }),
  empleado_lider_id: uuid("empleado_lider_id"),
  empleado_is_admin: boolean("empleado_is_admin").default(false),
  empleado_config_preferencias: jsonb("empleado_config_preferencias"),
  ...crmBasePersona,
  ...crmBaseContacto,
  ...crmBaseDireccion,
  ...crmBaseAudit,
});

export const crmEntidadEmpleadoRelaciones = relations(
  crmEntidadEmpleado,
  ({ one }) => ({
    lider: one(crmEntidadEmpleado, {
      fields: [crmEntidadEmpleado.crm_entidad_empleado_id],
      references: [crmEntidadEmpleado.empleado_lider_id],
    }),
  }),
);
