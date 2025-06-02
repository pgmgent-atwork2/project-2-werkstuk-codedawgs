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
}

export default MeasurementDefinition;
