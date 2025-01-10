import {
  pgTable,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { crmBaseAudit, crmBaseContacto, crmBaseDireccion, crmBasePersona } from "./bases";

export const crmEntidadCliente = pgTable(
  "crm_entidad_cliente",
  {
    crmEntidadClienteId: uuid("crm_entidad_cliente_id").primaryKey().defaultRandom(),
    clienteRazonSocial: varchar("cliente_razon_social", { length: 100 }),
    clienteAcercaDe: varchar("cliente_acerca_de", { length: 255 }),
    ...crmBasePersona,
    ...crmBaseContacto,
    ...crmBaseDireccion,
    ...crmBaseAudit
  },
);
