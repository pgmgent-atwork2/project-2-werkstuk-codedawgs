import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class Pump extends Model {
  static get tableName() {
    return "pumps";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "sub_department_id"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        sub_department_id: { type: "integer" },
      },
    };
  }
}

export default Pump;
