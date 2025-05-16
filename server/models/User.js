import knex from "../lib/Knex.js";
import { Model } from "objection";

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name", "token"],
      properties: {
        id: { type: "integer" },
        firstname: { type: "string", minLength: 1, maxLength: 255 },
        lastname: { type: "string", minLength: 1, maxLength: 255 },
        token: { type: "string", minLength: 1, maxLength: 255 },
        pincode: { type: "string", minLength: 0, maxLength: 6 },
        admin: { type: "boolean" }
      },
    };
  }
}

export default User;