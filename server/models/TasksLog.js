import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class TasksLog extends Model {
  static get tableName() {
    return "task_logs";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "task_id", "object_type", "object_id", "task_date"],
      properties: {
        id: { type: "integer" },
        user_id: { type: "integer" },
        task_id: { type: "integer" },
        object_type: {
          type: "string",
          enum: ["department", "sub_department", "filter", "pump"],
        },
        object_id: { type: "integer" },
        comment: { type: "string" },
        action: { type: "string" },
        task_date: { type: "date" },
      },
    };
  }
}

export default TasksLog;
