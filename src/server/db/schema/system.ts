import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  unique,
  integer,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { crmBaseAudit } from "./bases";
import { relations } from "drizzle-orm";
import { crmEntidadEmpleado } from "./empleado";

export const systemTemplate = pgTable(
  "system_template",
  {
    systemTemplateId: uuid("system_template_id").primaryKey().defaultRandom(),
    templateNombre: varchar("template_nombre", { length: 255 }).notNull(),
    templateDescripcion: text("template_descripcion"),
    templateContenido: text("template_contenido").notNull(),
    templateContenidoHtml: text("template_contenido_html"),
    templateTipo: varchar("template_tipo", { length: 50 }).notNull(),
    templateFormato: varchar("template_formato", { length: 50 }).default("text").notNull(),
    templateVariables: jsonb("template_variables"),
    templateValoresDef: jsonb("template_valores_def"),
    templateCategoria: varchar("template_categoria", { length: 100 }),
    templateTags: text("template_tags").array(),
    ...crmBaseAudit,
  },
);

export const systemBaseConocimiento = pgTable(
  "system_base_conocimiento",
  {
    systemBaseConocimientoId: uuid("system_base_conocimiento_id").primaryKey(),

    conocimientoCategoria: varchar("conocimiento_categoria", { length: 100 }).notNull(),
    conocimientoSubcategoria: varchar("conocimiento_subcategoria", { length: 100 }),
    conocimientoCarpeta: varchar("conocimiento_carpeta", { length: 255 }),

    conocimientoTitulo: varchar("conocimiento_titulo", { length: 255 }).notNull(),
    conocimientoContenido: text("conocimiento_contenido").notNull(),
    conocimientoResumen: varchar("conocimiento_resumen", { length: 500 }),
    conocimientoPalabrasClave: varchar("conocimiento_palabras_clave", { length: 255 }).array(),

    conocimientoEstado: varchar("conocimiento_estado", { length: 50 }).default("activo"),
    conocimientoPrioridad: integer("conocimiento_prioridad").default(0),
    conocimientoFechaPublicacion: timestamp("conocimiento_fecha_publicacion").defaultNow(),
    conocimientoFechaUltimaRevision: timestamp("conocimiento_fecha_ultima_revision"),
    conocimientoFechaProximaRevision: timestamp("conocimiento_fecha_proxima_revision"),

    conocimientoVersion: varchar("conocimiento_version", { length: 50 }).default("1.0"),
    conocimientoVersionAnteriorId: uuid("conocimiento_version_anterior_id"),
    conocimientoNivelAcceso: varchar("conocimiento_nivel_acceso", { length: 50 }).default("publico"),
    conocimientoDepartamentosAcceso: varchar("conocimiento_departamentos_acceso", { length: 100 }).array(),

    conocimientoVistas: integer("conocimiento_vistas").default(0),
    conocimientoMeGusta: integer("conocimiento_me_gusta").default(0),
    conocimientoNoMeGusta: integer("conocimiento_no_me_gusta").default(0),
    conocimientoAutorId: uuid("conocimiento_autor_id").notNull(),
    conocimientoRevisorId: uuid("conocimiento_revisor_id"),
    ...crmBaseAudit,
  },
);

export const systemFiltros = pgTable(
  "system_filtros",
  {
    systemFiltroPreguardadoId: uuid("system_filtro_preguardado_id").primaryKey().defaultRandom(),
    filtroEntidad: varchar("filtro_entidad", { length: 50 }).notNull(),
    filtroNombre: varchar("filtro_nombre", { length: 100 }).notNull(),
    filtroDescripcion: varchar("filtro_descripcion", { length: 500 }),
    filtroConfiguracion: jsonb("filtro_configuracion").notNull(),
    filtroEsDefault: boolean("filtro_es_default").default(false),
    filtroFechaUltimaEjecucion: timestamp("filtro_fecha_ultima_ejecucion"),
    empleadoId: uuid("empleado_id").notNull(),
    entidadId: uuid("entidad_id").notNull(),
    ...crmBaseAudit,
  }
);

// TODO
// [ ] agregar relacion con entidad
export const systemFiltrosRelations = relations(
  systemFiltros,
  ({ one }) => ({
    empleado: one(crmEntidadEmpleado, {
      fields: [systemFiltros.empleadoId],
      references: [crmEntidadEmpleado.crmEntidadEmpleadoId],
    }),
  }),
)