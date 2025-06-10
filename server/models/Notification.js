import knex from "../lib/Knex.js";
import { Model } from "objection";
import MeasurementLog from "./MeasurementLog.js";
import MeasurementDefinition from "./MeasurementDefinition.js";

Model.knex(knex);

class Notification extends Model {
  static get tableName() {
    return "notifications";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["measurement_log_id", "measurement_def_id"],
      properties: {
        id: { type: "integer" },
        measurement_log_id: { type: "integer" },
        measurement_def_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      measurement_log: {
        relation: Model.BelongsToOneRelation,
        modelClass: MeasurementLog,
        join: {
          from: "notifications.measurement_log_id",
          to: "measurement_logs.id",
        },
      },
      
      measurement_definition: {
        relation: Model.BelongsToOneRelation,
        modelClass: MeasurementDefinition,
        join: {
          from: "notifications.measurement_def_id",
          to: "measurement_definitions.id",
        },
      },
    };
  }
}


export default Notification;
