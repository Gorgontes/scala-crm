import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  timestamp,
  boolean,
  decimal,
  integer,
  varchar,
  text,
  date,
} from "drizzle-orm/pg-core";

export const crmBaseAudit = {
  auditCreatedAt: timestamp("audit_created_at", {
    withTimezone: true,
  }),
  auditCreatedBy: uuid("audit_created_by"),
  auditUpdatedAt: timestamp("audit_updated_at", {
    withTimezone: true,
  }).default(sql`now()`),
  auditUpdatedBy: uuid("audit_updated_by"),
  auditIsActive: boolean("audit_is_active").default(true),
  auditIsDeleted: boolean("audit_is_deleted").default(false),
  auditRank: decimal("audit_rank", { precision: 10, scale: 2 }),
  auditVersion: integer("audit_version").default(1),
};

export const crmBaseDireccion = {
  direccionTipo: varchar("direccion_tipo", { length: 50 }).default("Casa"),
  direccionPais: varchar("direccion_pais", { length: 50 })
    .default("Peru")
    .notNull(),
  direccionDepartamento: varchar("direccion_departamento", { length: 50 }),
  direccionProvincia: varchar("direccion_provincia", { length: 50 }),
  direccionDistrito: varchar("direccion_distrito", { length: 50 }),
  direccionDireccion: varchar("direccion_direccion", { length: 100 }),
  direccionReferencia: text("direccion_referencia"),
  direccionCoordLat: decimal("direccion_coord_lat", {
    precision: 10,
    scale: 8,
  }),
  direccionCoordLon: decimal("direccion_coord_lon", {
    precision: 11,
    scale: 8,
  }),
  direccionCodigoPostal: varchar("direccion_codigo_postal", { length: 20 }),
  direccionValidada: boolean("direccion_validada").default(false),
};

export const crmBaseContacto = {
  contactoTipo: varchar("contacto_tipo", { length: 50 }).default("Personal"),
  contactoEtiqueta: varchar("contacto_etiqueta", { length: 50 }),
  contactoEmailPrincipal: varchar("contacto_email_principal", { length: 255 }),
  contactoEmailSecundario: varchar("contacto_email_secundario", {
    length: 255,
  }),
  contactoTelefonoPrincipal: varchar("contacto_telefono_principal", {
    length: 20,
  }),
  contactoTelefonoSecundario: varchar("contacto_telefono_secundario", {
    length: 20,
  }),
  contactoExtension: varchar("contacto_extension", { length: 10 }),
  contactoWhatsapp: boolean("contacto_whatsapp").default(false),
  contactoLinkedin: varchar("contacto_linkedin", { length: 255 }),
  contactoNotas: text("contacto_notas"),
};

export const crmBasePersona = {
  reniecTipoDocumento: varchar("reniec_tipo_documento", { length: 50 }).default("DNI"),
  reniecNroDocumento: varchar("reniec_nro_documento", { length: 50 }).notNull(),
  reniecNombres: varchar("reniec_nombres", { length: 100 }).notNull(),
  reniecApellidos: varchar("reniec_apellidos", { length: 100 }).notNull(),
  reniecFechaNac: date("reniec_fecha_nac"),
  reniecEdad: integer("reniec_edad"),
  reniecLugarNacimiento: varchar("reniec_lugar_nacimiento", { length: 200 }),
  reniecNacionalidad: varchar("reniec_nacionalidad", { length: 100 }).default("Peru"),
  reniecGenero: varchar("reniec_genero", { length: 20 }),
  reniecEstadoCivil: varchar("reniec_estado_civil", { length: 50 }).default("Soltero"),
};

export const crmBaseLinea = {
  crmBaseLineaId: uuid("crm_base_linea_id").defaultRandom().primaryKey(),
  lineaNumero: varchar("linea_numero", { length: 100 }),
  lineaOperador: varchar("linea_operador", { length: 50 }),
  lineaModalidad: varchar("linea_modalidad", { length: 50 }),
  lineaTitulo: varchar("linea_titulo", { length: 255 }),
  lineaComment: varchar("linea_comment", { length: 255 }),
};

export const crmBaseSec = {
  crmBaseSecId: uuid("crm_base_sec_id").defaultRandom().primaryKey(),
  secNumero: integer("sec_numero").default(0),
  secFechaIngreso: date("sec_fecha_ingreso").defaultNow(),
  secStatus: varchar("sec_status", { length: 50 }).default("Aprobado"),
};

export const crmBaseEntidad = {
  entidad: varchar("entidad", { length: 50 }),
  entidad_alias: uuid("entidad_alias"),
  entidad_key: varchar("entidad_key", { length: 50 }),
};
