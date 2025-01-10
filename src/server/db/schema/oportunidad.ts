import {
  pgTable,
  uuid,
  varchar,
  decimal,
} from "drizzle-orm/pg-core";
import { crmWorkflowBase } from "./workflow";
import { crmEntidadCliente } from "./clientes";

export const crmFlujoOportunidad = pgTable(
  "crm_flujo_oportunidad",
  {
    crmOportunidadId: uuid("crm_oportunidad_id").primaryKey().defaultRandom(),
    // crmEntidadClienteId: uuid("crm_entidad_cliente_id").notNull().references("crm_entidad_cliente", "crm_entidad_cliente_id").onDelete("cascade"),
    crmEntidadClienteId: uuid("crm_entidad_cliente_id").notNull().references(() => crmEntidadCliente.crmEntidadClienteId, {onDelete: 'cascade'}),
    oportunidadGananciaComision: decimal("oportunidad_ganancia_comision", { precision: 10, scale: 2 }),
    oportunidadGananciaCargoFijo: decimal("oportunidad_ganancia_cargo_fijo", { precision: 10, scale: 2 }),
    oportunidadGananciaVolumen: decimal("oportunidad_ganancia_volumen", { precision: 10, scale: 2 }),
    oportunidadMotivoGanado: varchar("oportunidad_motivo_ganado", { length: 100 }),
    oportunidadMotivoPerdida: varchar("oportunidad_motivo_perdida", { length: 100 }),
    oportunidadScore: varchar("oportunidad_score", { length: 100 }),
    oportunidadProbabilidad: varchar("oportunidad_probabilidad", { length: 100 }),
    ...crmWorkflowBase
  },
);