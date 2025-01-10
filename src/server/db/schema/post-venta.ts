import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  text,
  jsonb,
} from "drizzle-orm/pg-core";
import { crmWorkflowBase } from "./workflow";
import { crmEntidadCliente } from "./clientes";
import { crmFlujoOportunidad } from "./oportunidad";

export const crmFlujoPostventa = pgTable(
  "crm_flujo_postventa",
  {
    crmFlujoPostventaId: uuid("crm_flujo_postventa_id").primaryKey().defaultRandom(),
    crmFlujoVentaId: uuid("crm_flujo_venta_id"),
    crmEntidadClienteId: uuid("crm_entidad_cliente_id").notNull().references(() => crmEntidadCliente.crmEntidadClienteId, {onDelete: 'cascade'}),
    crmOportunidadId: uuid("crm_oportunidad_id").notNull().references(() => crmFlujoOportunidad.crmOportunidadId, {onDelete: 'cascade'}),
    postventaTipoServicio: varchar("postventa_tipo_servicio", { length: 100 }),
    postventaNivelSatisfaccion: integer("postventa_nivel_satisfaccion"),
    postventaNpsScore: integer("postventa_nps_score"),
    postventaTieneIncidencias: boolean("postventa_tiene_incidencias").default(false),
    postventaNumeroIncidencias: integer("postventa_numero_incidencias").default(0),
    postventaResolucionIncidencias: text("postventa_resolucion_incidencias"),
    postventaMedioContactoPreferido: varchar("postventa_medio_contacto_preferido", { length: 50 }),
    postventaHorarioContactoPreferido: varchar("postventa_horario_contacto_preferido", { length: 100 }),
    postventaPotencialCrossSelling: boolean("postventa_potencial_cross_selling").default(false),
    postventaProductosSugeridos: text("postventa_productos_sugeridos").array(),
    postventaNotasSeguimiento: text("postventa_notas_seguimiento"),
    postventaRecomendaciones: text("postventa_recomendaciones"),
    ...crmWorkflowBase,
  },
);
