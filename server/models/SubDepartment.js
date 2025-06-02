import knex from "../lib/Knex.js";
import { Model } from "objection";
import Pump from "./Pump.js";
import Filter from "./Filter.js";
import Department from "./Department.js";
import MeasurementLog from "./MeasurementLog.js";

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

  static get relationMappings() {
    return {
      filters: {
        relation: Model.HasManyRelation,
        modelClass: Pump,
        join: {
          from: "sub_departments.id",
          to: "pumps.sub_department_id",
        },
      },
      filters: {
        relation: Model.HasManyRelation,
        modelClass: Filter,
        join: {
          from: "sub_departments.id",
          to: "filters.sub_department_id",
        },
      },

      department: {
        relation: Model.BelongsToOneRelation,
        modelClass: Department,
        join: {
          from: "sub_departments.department_id",
          to: "departments.id",
        },
      },
      measurement_log: {
        relation: Model.BelongsToOneRelation,
        modelClass: MeasurementLog,
        join: {
          from: "sub_departments.id",
          to: "measurement_logs.sub_department_id",
        },
      },
    };
  }
}

export default SubDepartment;
