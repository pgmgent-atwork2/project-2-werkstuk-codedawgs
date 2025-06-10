import knex from "../lib/Knex.js";
import { Model } from "objection";
import Notification from "./Notification.js";

Model.knex(knex);

class MeasurementDefinition extends Model {
  static get tableName() {
    return "measurement_definitions";
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

  static get relationMappings() {
    return {
      notification: {
        relation: Model.BelongsToOneRelation,
        modelClass: Notification,
        join: {
          from: "measurement_definitions.id",
          to: "notifications.measurement_def_id",
        },
      },
    };
  }
}

export default MeasurementDefinition;
