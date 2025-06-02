import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class MeasurementLog extends Model {
  static get tableName() {
    return "measurement_logs";
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
        sub_department_id: { type: "integer" },
        measured_date: { type: "date" },
        measurements: { type: "string" },
      },
    };
  }
}

export default MeasurementLog;
