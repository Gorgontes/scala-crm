import {
  pgTable,
  uuid,
  decimal,
  date,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import { crmBaseAudit } from "./bases";
import { esalesEntidadCampana, esalesEntidadPlan, esalesEntidadProducto } from "./esales";

/// ok why wtf is this on delete again?
export const esalesTransaccionPrecioProducto = pgTable(
  "esales_transaccion_precio_producto",
  {
    esalesTransaccionPrecioProductoId: uuid("esales_transaccion_precio_producto_id").primaryKey().defaultRandom(),
    esalesEntidadPlanId: uuid("esales_entidad_plan_id").notNull().references(() => esalesEntidadPlan.esalesEntidadPlanId, {onDelete: 'no action'}),
    esalesEntidadCampanaId: uuid("esales_entidad_campana_id").notNull().references(() => esalesEntidadCampana.esalesEntidadCampanaId, {onDelete: 'no action'}),
    esalesEntidadProductoId: uuid("esales_entidad_producto_id").notNull().references(() => esalesEntidadProducto.esalesEntidadProductoId, {onDelete: 'no action'}),
    precioTotal: decimal("precio_total", { precision: 10, scale: 2 }).default('0'),
    precioInicial: decimal("precio_inicial", { precision: 10, scale: 2 }).default('0'),
    precioCuota: decimal("precio_cuota", { precision: 10, scale: 2 }).default('0'),
    precioFecha: date("precio_fecha").defaultNow(),
    precioVariacion: decimal("precio_variacion", { precision: 5, scale: 2 }),
    ...crmBaseAudit,
  },
  (table) => [
    unique().on(table.esalesEntidadPlanId, table.esalesEntidadCampanaId, table.esalesEntidadProductoId),
  ]
);

export const esalesTransaccionProductoStockPdv = pgTable(
  "esales_transaccion_producto_stock_pdv",
  {
    esalesTransaccionProductoStockPdvId: uuid("esales_transaccion_producto_stock_pdv_id").primaryKey().defaultRandom(),
    esalesEntidadProductoVarianteId: uuid("esales_entidad_producto_variante_id").notNull().references(() => esalesEntidadProducto.esalesEntidadProductoId, {onDelete: 'no action'}),
    esalesEntidadPdvId: uuid("esales_entidad_pdv_id").notNull().references(() => esalesEntidadProducto.esalesEntidadProductoId, {onDelete: 'no action'}),
    esalesEntidadProductoId: uuid("esales_entidad_producto_id").notNull().references(() => esalesEntidadProducto.esalesEntidadProductoId, {onDelete: 'no action'}),
    stockCantidad: integer("stock_cantidad").notNull(),
    stockFecha: date("stock_fecha").notNull(),
    stockVariacion: integer("stock_variacion"),
    ...crmBaseAudit,
  },
  (table) => [
    unique().on(table.esalesEntidadProductoVarianteId, table.esalesEntidadPdvId),
  ]
);
