import {
  pgTable,
  uuid,
  varchar,
  decimal,
  text,
  jsonb,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { crmBaseAudit, crmBaseDireccion } from "./bases";

export const esalesEntidadPlan = pgTable(
  "esales_entidad_plan",
  {
    esalesEntidadPlanId: uuid("esales_entidad_plan_id").primaryKey().defaultRandom(),
    planTitulo: varchar("plan_titulo", { length: 255 }).notNull(),
    planMetadatos: varchar("plan_metadatos", { length: 255 }).notNull(),
    planDescripcion: text("plan_descripcion"),
    planCargoFijo: decimal("plan_cargo_fijo", { precision: 10, scale: 2 }).notNull(),
    planBeneficios: jsonb("plan_beneficios"),
    ...crmBaseAudit
  },
);

export const esalesEntidadProducto = pgTable(
  "esales_entidad_producto",
  {
    esalesEntidadProductoId: uuid("esales_entidad_producto_id").primaryKey().defaultRandom(),
    productoTitulo: varchar("producto_titulo", { length: 255 }).notNull(),
    productoNombre: varchar("producto_nombre", { length: 255 }).notNull(),
    productoMarca: varchar("producto_marca", { length: 100 }),
    productoEspecificaciones: jsonb("producto_especificaciones"),
    ...crmBaseAudit
  },
);

export const esalesEntidadCampana = pgTable(
  "esales_entidad_campana",
  {
    esalesEntidadCampanaId: uuid("esales_entidad_campana_id").primaryKey().defaultRandom(),
    campanaNombre: varchar("campana_nombre", { length: 255 }).notNull(),
    campanaDescripcion: text("campana_descripcion"),
    campanaTipo: varchar("campana_tipo", { length: 100 }),
    campanaSegmento: varchar("campana_segmento", { length: 100 }),
    campanaCodigo: varchar("campana_codigo", { length: 10 }).default("0000"),
    campanaFechaInicio: date("campana_fecha_inicio"),
    campanaFechaFin: date("campana_fecha_fin"),
    campanaMetadatos: jsonb("campana_metadatos"),
    ...crmBaseAudit
  },
  
);

export const esalesEntidadProductoVariante = pgTable(
  "esales_entidad_producto_variante",
  {
    esalesEntidadProductoVarianteId: uuid("esales_entidad_producto_variante_id").primaryKey().defaultRandom(),
    esalesEntidadProductoId: uuid("esales_entidad_producto_id").notNull().references(() => esalesEntidadProducto.esalesEntidadProductoId, {onDelete: 'cascade'}),
    varianteCodigoMaterial: varchar("variante_codigo_material", { length: 100 }),
    varianteCodigoTexto: varchar("variante_codigo_texto", { length: 255 }),
    varianteColor: varchar("variante_color", { length: 50 }),
    varianteIncluyeRegalo: boolean("variante_incluye_regalo").default(false),
    varianteMarca: varchar("variante_marca", { length: 100 }),
    varianteSubTipo1: varchar("variante_sub_tipo_1", { length: 100 }),
    varianteSubTipo2: varchar("variante_sub_tipo_2", { length: 100 }),
    ...crmBaseAudit
  },
  
);

export const esalesEntidadPdv = pgTable(
  "esales_entidad_pdv",
  {
    esalesEntidadPdvId: uuid("esales_entidad_pdv_id").primaryKey().defaultRandom(),
    pdvCodigoSisact: varchar("pdv_codigo_sisact", { length: 50 }).notNull(),
    pdvCodigoRazonSocial: varchar("pdv_codigo_razon_social", { length: 50 }),
    pdvCodigoPdv: varchar("pdv_codigo_pdv", { length: 50 }),
    pdvResponsables: jsonb("pdv_responsables"),
    pdvCanal: varchar("pdv_canal", { length: 50 }),
    ...crmBaseAudit,
    ...crmBaseDireccion,
  },
);
