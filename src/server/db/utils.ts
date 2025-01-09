import type { BuildExtraConfigColumns } from "drizzle-orm/column-builder";
import type { PgTableExtraConfig, PgTableExtraConfigValue, PgTableFn } from "drizzle-orm/pg-core";
import type { PgColumnBuilderBase } from "drizzle-orm/pg-core";
import type { PgColumnsBuilders } from "drizzle-orm/pg-core/columns/all";

export function createBaseTable<Columns extends Record<string, PgColumnBuilderBase>>(
  tableCreator: PgTableFn,
  baseColumns: Columns,
  baseConstrains?: (
    self: BuildExtraConfigColumns<string, Columns, "pg">,
  ) => PgTableExtraConfig[],
) {
  return (tableName: string, columns: Columns, constrains?: (
    self: BuildExtraConfigColumns<string, Columns, "pg">,
  ) => PgTableExtraConfig[]) => {
    if (!baseConstrains && !constrains) 
      return tableCreator(tableName, {...columns, ...baseColumns});
    if (baseConstrains && constrains) 
      return tableCreator(tableName, {...columns, ...baseColumns}, (table) => {
        return [...baseConstrains(table), ...constrains(table)];});
    if (constrains) 
      return tableCreator(tableName, {...columns, ...baseColumns}, constrains);
    if (baseConstrains) 
      return tableCreator(tableName, {...columns, ...baseColumns}, baseConstrains);
  };
}