import knex from "../lib/Knex.js";
import { Model } from "objection";
import SubDepartment from "./SubDepartment.js";

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

  static get relationMappings() {
    return {
      sub_department: {
        relation: Model.BelongsToOneRelation,
        modelClass: SubDepartment,
        join: {
          from: "pumps.sub_department_id",
          to: "sub_departments.id",
        },
      },
    };
  }
}

export default Pump;
