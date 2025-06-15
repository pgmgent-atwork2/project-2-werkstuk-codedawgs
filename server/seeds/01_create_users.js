const tableName = "users";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    {
      first_name: "Admin",
      last_name: "Account",
      token: "4df3dd375289",
      image_id: 1,
      pincode: "1111",
      role: "admin",
    },
    {
      first_name: "User",
      last_name: "Account",
      token: "34168089108c",
      image_id: 2,
      pincode: "1111",
      role: "user",
    },
    {
      first_name: "Aqua",
      last_name: "Account",
      token: "748cb8318c07",
      image_id: 8,
      pincode: "1111",
      role: "aqua",
    },
  ]);
};

export { seed };
