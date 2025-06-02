import knex from "../lib/Knex.js";
import { Model } from "objection";
import SubDepartment from "./SubDepartment.js";

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

  static get relationMappings() {
    return {
      sub_department: {
        relation: Model.HasManyRelation,
        modelClass: SubDepartment,
        join: {
          from: "departments.id",
          to: "sub_departments.department_id",
        },
      },
    };
  }
}

export default Department;
