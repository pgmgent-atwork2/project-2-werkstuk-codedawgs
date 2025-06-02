import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class Department extends Model {
  static get tableName() {
    return "departments";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default Department;
