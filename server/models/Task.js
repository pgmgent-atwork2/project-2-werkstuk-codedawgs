import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "completed", "visible"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        visible: { type: "boolean" },
        completed: { type: "boolean" },
        interval: { type: "string", enum: ["daily", "weekly", "monthly"] },
        object_type: {
          type: "string",
          enum: ["department", "sub_department", "filter", "pump"],
        },
        object_id: { type: "integer" },
      },
    };
  }
}

export default Task;
