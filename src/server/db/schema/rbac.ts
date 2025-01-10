import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  date,
  unique,
  boolean,
} from "drizzle-orm/pg-core";
import { crmEntidadEmpleado } from "./empleado";
import { crmBaseAudit } from "./bases";

export const systemRol = pgTable("system_rol", {
  systemRolId: uuid("system_rol_id").primaryKey().defaultRandom(),
  rolNombre: varchar("rol_nombre", { length: 100 }).notNull().unique(),
  rolDescripcion: text("rol_descripcion"),
  rolNivel: integer("rol_nivel").default(1),
    ...crmBaseAudit
});

export const systemPermiso = pgTable("system_permiso", {
  systemPermisoId: uuid("system_permiso_id").primaryKey().defaultRandom(),
  permisoCodigo: varchar("permiso_codigo", { length: 100 }).notNull().unique(),
  permisoDescripcion: text("permiso_descripcion"),
    ...crmBaseAudit
});

export const systemRolPermiso = pgTable(
  "system_rol_permiso",
  {
    systemRolPermisoId: uuid("system_rol_permiso_id")
      .primaryKey()
      .defaultRandom(),
    systemRolId: uuid("system_rol_id")
      .notNull()
      .references(() => systemRol.systemRolId, { onDelete: "cascade" }),
    systemPermisoId: uuid("system_permiso_id")
      .notNull()
      .references(() => systemPermiso.systemPermisoId, { onDelete: "cascade" }),
    ...crmBaseAudit
  },

  (table) => [unique().on(table.systemRolId, table.systemPermisoId)],
);

export const systemEmpleadoRol = pgTable(
  "system_empleado_rol",
  {
    systemEmpleadoRolId: uuid("system_empleado_rol_id")
      .primaryKey()
      .defaultRandom(),
    crmEntidadEmpleadoId: uuid("crm_entidad_empleado_id")
      .notNull()
      .references(() => crmEntidadEmpleado.crmEntidadEmpleadoId, {
        onDelete: "cascade",
      }),
    systemRolId: uuid("system_rol_id")
      .notNull()
      .references(() => systemRol.systemRolId, { onDelete: "cascade" }),
    rolFechaAsignacion: date("rol_fecha_asignacion").defaultNow(),
    ...crmBaseAudit
  },
  (table) => [unique().on(table.crmEntidadEmpleadoId, table.systemRolId)],
);

export const crmDepartment = pgTable(
  "crm_department",
  {
    departmentId: uuid("department_id").primaryKey().defaultRandom(),
    departmentName: varchar("department_name", { length: 100 }).notNull().unique(),
    departmentDesc: text("department_desc"),
    departmentIsActive: boolean("department_is_active").default(true),
    ...crmBaseAudit
  },
  
);
