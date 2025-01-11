import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  jsonb,
  timestamp,
  date,
  unique,
} from "drizzle-orm/pg-core";
import { crmBaseAudit } from "./bases";
import { crmEntidadEmpleado } from "./empleado";

export const crmWorkflowStatus = pgTable(
  "crm_workflow_status",
  {
    workflowStatusId: uuid("workflow_status_id").primaryKey().defaultRandom(),
    workflowType: varchar("workflow_type", { length: 50 }).notNull(),
    statusNombre: varchar("status_nombre", { length: 100 }).notNull(),
    statusOrderSequence: integer("status_order_sequence").notNull(),
    statusSubstatusList: varchar("status_substatus_list", { length: 100 }).array(),
    statusDescripcion: text("status_descripcion"),
    statusEsTerminal: boolean("status_es_terminal").default(false),
    statusIsSuccess: boolean("status_is_success").default(false),
    statusIsLossy: boolean("status_is_lossy").default(false),
    statusPermiteRetroceso: boolean("status_permite_retroceso").default(true),
    statusRequiresReview: boolean("status_requires_review").default(false),
    statusNeedsNotification: boolean("status_needs_notification").default(false),
    metadata: jsonb("metadata"),
    ...crmBaseAudit
  },
  (table) => [
    unique().on(table.workflowType, table.statusOrderSequence),
  ]
);

// wtf is this why tf you have cascade on a self reference
export const crmWorkflowStatusTransition = pgTable(
  "crm_workflow_status_transition",
  {
    transitionId: uuid("transition_id").primaryKey().defaultRandom(),
    transitionWorkflowType: varchar("transition_workflow_type", { length: 50 }).notNull(),
    transitionFromStatusId: uuid("transition_from_status_id").notNull().references(() => crmWorkflowStatus.workflowStatusId, {onDelete: 'no action'}),
    transitionToStatusId: uuid("transition_to_status_id").notNull().references(() => crmWorkflowStatus.workflowStatusId, {onDelete: 'no action'}),
    transitionName: text("transition_name"),
    transitionDescripcion: text("transition_descripcion"),
    transitionReqComentario: boolean("transition_req_comentario").default(false),
    transitionReqActividad: boolean("transition_req_actividad").default(false),
    transitionReqTarea: boolean("transition_req_tarea").default(false),
    transitionValidationRule: text("transition_validation_rule"),
    transitionCondiciones: jsonb("transition_condiciones"),
    metadata: jsonb("metadata"),
    ...crmBaseAudit
  },
  (table) => [
    unique().on(table.transitionWorkflowType, table.transitionFromStatusId, table.transitionToStatusId),
  ]
);

export const crmWorkflowBase = 
  {
    // workflowId: uuid("workflow_id").primaryKey().defaultRandom(),
    // v it had unique in the row below
    currentStatusId: uuid("current_status_id").notNull().references(() => crmWorkflowStatus.workflowStatusId, {onDelete: 'no action'}),
    workflowStatusText: text("workflow_status_text"),
    workflowSubstatusText: text("workflow_substatus_text"),
    startDate: timestamp("start_date").defaultNow(),
    endDate: timestamp("end_date"),
    dueDate: timestamp("due_date"),
    timeDiff: integer("time_diff"),
    priority: varchar("priority", { length: 50 }).notNull().default("Media"),
    completionPercentage: integer("completion_percentage").default(0),
    reminderDate: timestamp("reminder_date"),
    nextActionDate: timestamp("next_action_date"),
    metadata: jsonb("metadata"),
    ownerId: uuid("owner_id").references(() => crmEntidadEmpleado.crmEntidadEmpleadoId, {onDelete: 'no action'}),
    assignedTo: uuid("assigned_to").references(() => crmEntidadEmpleado.crmEntidadEmpleadoId, {onDelete: 'no action'}),
    supervisor: uuid("supervisor"),
    assignedTeam: uuid("assigned_team"),
    assignedDepartment: uuid("assigned_department"),
    ...crmBaseAudit
  }
  // why is this here wtf
  // (table) => [
  //   unique().on(table.currentStatusId),
  // ]
