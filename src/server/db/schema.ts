import { pgEnum } from "drizzle-orm/pg-core";

export const tipoDocumento = pgEnum("tipoDocumento", [
  "DNI",
  "PASAPORTE",
  "CARNE DE EXTRANJERIA",
  "RUC",
]);
