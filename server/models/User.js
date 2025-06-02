import knex from "../lib/Knex.js";
import { Model } from "objection";
import TasksLog from "./TasksLog.js";

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name", "token"],
      properties: {
        id: { type: "integer" },
        first_name: { type: "string", minLength: 1, maxLength: 255 },
        last_name: { type: "string", minLength: 1, maxLength: 255 },
        token: { type: "string", minLength: 1, maxLength: 255 },
        pincode: { type: "string", minLength: 0, maxLength: 4 },
        role: { type: "string", enum: ["admin", "user", "aqua"] },
      },
    };
  }

  static get relationMappings() {
    return {
      task_log: {
        relation: Model.BelongsToOneRelation,
        modelClass: TasksLog,
        join: {
          from: "users.id",
          to: "task_logs.user_id",
        },
      },
    };
  }
}

export default User;
