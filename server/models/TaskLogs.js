import knex from "../lib/Knex.js";
import { Model } from "objection";
import User from "./User.js";
import Task from "./Task.js";

Model.knex(knex);

class TaskLogs extends Model {
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

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "task_logs.user_id",
          to: "users.id",
        },
      },
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: Task,
        join: {
          from: "task_logs.task_id",
          to: "tasks.id",
        },
      },
    };
  }
}

export default TaskLogs;
