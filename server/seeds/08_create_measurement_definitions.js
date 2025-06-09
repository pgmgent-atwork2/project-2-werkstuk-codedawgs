const tableName = "measurement_definitions";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    {
      name: "Temperature water",
      short: "Temp",
      unit: "°C",
      min_value: 14.0,
      max_value: 30.0,
    },
    {
      name: "Free chlorine",
      short: "F Cl",
      unit: "mg/l",
      min_value: null,
      max_value: null,
    },
    {
      name: "pH",
      short: "pH",
      unit: "pH",
      min_value: 7.2,
      max_value: 8.4,
    },
    {
      name: "Free chlorine",
      short: "F Cl",
      unit: "mg/l",
      min_value: null,
      max_value: null,
    },
    {
      name: "Total chlorine",
      short: "Tot Cl",
      unit: "mg/l",
      min_value: null,
      max_value: 0.8,
    },
    {
      name: "Combined chlorine",
      short: "Comb Cl",
      unit: "mg/l",
      min_value: null,
      max_value: null,
    },
    {
      name: "pH",
      short: "pH",
      unit: "pH",
      min_value: 7.2,
      max_value: 8.4,
    },
    {
      name: "Salinity",
      short: "Salt",
      unit: "ppt",
      min_value: 28.0,
      max_value: null,
    },
    {
      name: "Total coliforms",
      short: "Tot col",
      unit: "C/100ml",
      min_value: null,
      max_value: 1000,
    },
    {
      name: "E coli",
      short: "E col",
      unit: "C/100ml",
      min_value: null,
      max_value: 500,
    },
  ]);
};

export { seed };
