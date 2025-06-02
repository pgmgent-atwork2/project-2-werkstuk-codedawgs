import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class SubDepartment extends Model {
  static get tableName() {
    return "sub_departments";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "department_id"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        department_id: { type: "integer" },
      },
    };
  }
}

export default SubDepartment;
