import {
  pgTable,
  uuid,
  varchar,
  decimal,
} from "drizzle-orm/pg-core";
import { crmWorkflowBase } from "./workflow";
import { crmEntidadCliente } from "./clientes";

export const crmFlujoLead = pgTable(
  "crm_flujo_lead",
  {
    crmFlujoLeadId: uuid("crm_flujo_lead_id").primaryKey().defaultRandom(),
    // crmEntidadClienteId: uuid("crm_entidad_cliente_id").notNull().references("crm_entidad_cliente", "crm_entidad_cliente_id").onDelete("cascade"),
    crmEntidadClienteId: uuid("crm_entidad_cliente_id").notNull().references(() => crmEntidadCliente.crmEntidadClienteId, {onDelete: "cascade"}),
    leadOrigenCampana: varchar("lead_origen_campana", { length: 100 }),
    leadScore: decimal("lead_score", { precision: 5, scale: 2 }),
    leadProbabilidad: decimal("lead_probabilidad", { precision: 5, scale: 2 }),
    ...crmWorkflowBase
  },
);
