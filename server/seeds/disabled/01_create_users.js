const tableName = "users";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    {
      first_name: "Maurice",
      last_name: "Halsberghe",
      token: "111",
      image_id: 5,
      pincode: "1111",
      role: "admin",
    },
    {
      first_name: "Mauro",
      last_name: "Ongena",
      token: "222",
      image_id: 2,
      pincode: "1111",
      role: "user",
    },
    {
      first_name: "Lukas",
      last_name: "Vervaet",
      token: "333",
      image_id: 8,
      pincode: "1111",
      role: "aqua",
    },
  ]);
};

export { seed };
