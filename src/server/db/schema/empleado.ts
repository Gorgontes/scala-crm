import {
  pgTable,
  uuid,
  varchar,
  date,
  boolean,
  jsonb,
  unique,
  index,
  text,
} from "drizzle-orm/pg-core";
import {
  crmBaseAudit,
  crmBaseContacto,
  crmBaseDireccion,
  crmBasePersona,
} from "./bases";
import { relations } from "drizzle-orm";

export const crmEntidadEmpleado = pgTable("crm_entidad_empleado", {
  crmEntidadEmpleadoId: uuid().primaryKey().defaultRandom(),
  empleadoCodigo: varchar("empleado_codigo", { length: 50 }),
  empleadoAlias: varchar("empleado_alias", { length: 100 }),
  empleadoAuthId: uuid("empleado_auth_id").notNull(),
  empleadoFechaInicio: date("empleado_fecha_inicio"),
  empleadoFechaFin: date("empleado_fecha_fin"),
  empleadoCargo: varchar("empleado_cargo", { length: 100 }),
  empleadoArea: varchar("empleado_area", { length: 100 }),
  empleadoLiderId: uuid("empleado_lider_id"),
  empleadoIsAdmin: boolean("empleado_is_admin").default(false),
  empleadoConfigPreferencias: jsonb("empleado_config_preferencias"),
  ...crmBasePersona,
  ...crmBaseContacto,
  ...crmBaseDireccion,
  ...crmBaseAudit,
});

export const crmEntidadEmpleadoRelaciones = relations(
  crmEntidadEmpleado,
  ({ one, many }) => ({
    lider: one(crmEntidadEmpleado, {
      fields: [crmEntidadEmpleado.crmEntidadEmpleadoId],
      references: [crmEntidadEmpleado.empleadoLiderId],
    }),
    equipos: many(crmEquipoMiembro)
  }),
);

// TODO
// [ ] 'crmEquipo' deberia de estar relacionado de alguna forma con 'crmEntidadEmpleado'
export const crmEquipo = pgTable("crm_equipo", {
  crmEquipoId: uuid("crm_equipo_id").primaryKey().defaultRandom(),
  equipoNombre: varchar("equipo_nombre", { length: 100 }).notNull().unique(),
  equipoDescripcion: text("equipo_descripcion"),
  equipoLiderId: uuid("equipo_lider_id").notNull(),
  ...crmBaseAudit,
});

export const crmEquipoRelaciones = relations(
  crmEquipo,
  ({ one, many }) => ({
    lider: one(crmEntidadEmpleado, {
      fields: [crmEquipo.equipoLiderId],
      references: [crmEntidadEmpleado.crmEntidadEmpleadoId],
    }),
    miembros: many(crmEquipoMiembro)
  }),
);

export const crmEquipoMiembro = pgTable("crm_equipo_miembro", {
  crmEquipoMiembroId: uuid("crm_equipo_miembro_id")
    .primaryKey()
    .defaultRandom(),
  crmEquipoId: uuid("crm_equipo_id")
    .notNull()
    .references(() => crmEquipo.crmEquipoId, { onDelete: "cascade" }),
  crmEntidadEmpleadoId: uuid("crm_entidad_empleado_id")
    .notNull()
    .references(() => crmEntidadEmpleado.crmEntidadEmpleadoId, {
      onDelete: "cascade",
    }),
  equipoRolInterno: varchar("equipo_rol_interno", { length: 100 }),
  equipoFechaIngreso: date("equipo_fecha_ingreso").defaultNow(),
  ...crmBaseAudit,
});

export const crmEquipoMiembroRelaciones = relations(
  crmEquipoMiembro,
  ({ one }) => ({
    equipo: one(crmEquipo, {
      fields: [crmEquipoMiembro.crmEquipoId],
      references: [crmEquipo.crmEquipoId],
    }),
    empleado: one(crmEntidadEmpleado, {
      fields: [crmEquipoMiembro.crmEntidadEmpleadoId],
      references: [crmEntidadEmpleado.crmEntidadEmpleadoId],
    }),
  }),
);
