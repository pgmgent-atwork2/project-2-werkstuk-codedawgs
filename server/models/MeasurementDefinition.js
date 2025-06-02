import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class MeasurementDefinition extends Model {
  static get tableName() {
    return "measurement_logs";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "unit", "min_value", "max_value"],
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        unit: { type: "string" },
        min_value: { type: "decimal" },
        max_value: { type: "decimal" },
      },
    };
  }
}

export default MeasurementDefinition;
