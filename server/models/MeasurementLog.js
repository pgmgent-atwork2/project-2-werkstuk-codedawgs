import knex from "../lib/Knex.js";
import { Model } from "objection";
import User from "./User.js";
import SubDepartment from "./SubDepartment.js";
import Notification from "./Notification.js";

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
        comment: {type: "string" },
        measurements: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "measurement_logs.user_id",
          to: "users.id",
        },
      },
      sub_department: {
        relation: Model.BelongsToOneRelation,
        modelClass: SubDepartment,
        join: {
          from: "measurement_logs.sub_department_id",
          to: "sub_departments.id",
        },
      },
      notifications: {
        relation: Model.HasManyRelation,
        modelClass: Notification,
        join: {
          from: "measurement_logs.id",
          to: "notifications.measurement_log_id",
        },
      },
    };
  }
}

export default MeasurementLog;
