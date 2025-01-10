import {
  pgTable,
  uuid,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";
import { crmWorkflowBase } from "./workflow";
import { crmBaseLinea, crmBaseSec } from "./bases";
import { crmEntidadCliente } from "./clientes";
import { crmFlujoOportunidad } from "./oportunidad";

export const crmFlujoCotizacion = pgTable(
  "crm_flujo_cotizacion",
  {
    crmFlujoCotizacionId: uuid("crm_flujo_cotizacion_id").primaryKey().defaultRandom(),
    // crmEntidadClienteId: uuid("crm_entidad_cliente_id").notNull().references("crm_entidad_cliente", "crm_entidad_cliente_id").onDelete("cascade"),
    crmEntidadClienteId: uuid("crm_entidad_cliente_id").notNull().references(() => crmEntidadCliente.crmEntidadClienteId, {onDelete: 'cascade'}),
    // crmOportunidadId: uuid("crm_oportunidad_id").notNull().references("crm_flujo_oportunidad", "crm_oportunidad_id"),
    crmOportunidadId: uuid("crm_oportunidad_id").notNull().references(() => crmFlujoOportunidad.crmOportunidadId, {onDelete: 'cascade'}),
    esalesPlanId: uuid("esales_plan_id"),
    esalesCampanaId: uuid("esales_campana_id"),
    esalesProductoId: uuid("esales_producto_id"),
    esalesPdvId: uuid("esales_pdv_id"),
    cotizacionPrecioTotal: decimal("cotizacion_precio_total", { precision: 10, scale: 2 }),
    cotizacionPrecioInicial: decimal("cotizacion_precio_inicial", { precision: 10, scale: 2 }),
    cotizacionPrecioCuota: decimal("cotizacion_precio_cuota", { precision: 10, scale: 2 }),
    cotizacionMetadatos: jsonb("cotizacion_metadatos"),
    ...crmWorkflowBase,
    ...crmBaseLinea,
    ...crmBaseSec
  },
);
