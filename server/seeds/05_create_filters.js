const tableName = "filters";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { title: "FD1", sub_department_id: 1 },
    { title: "FD2", sub_department_id: 1 },
    { title: "FD3", sub_department_id: 1 },
    { title: "FD4", sub_department_id: 1 },
    { title: "FD5", sub_department_id: 1 },
    { title: "FD6", sub_department_id: 1 },

    { title: "FD7", sub_department_id: 2 },
    { title: "FD8", sub_department_id: 2 },

    { title: "FSL1", sub_department_id: 3 },
    { title: "FSL2", sub_department_id: 4 },
    { title: "FSL3", sub_department_id: 4 },
    { title: "FSLQ", sub_department_id: 5 },

    { title: "FS1", sub_department_id: 6 },

    { title: "FS2", sub_department_id: 7 },

    { title: "FAQ1", sub_department_id: 8 },
  ]);
};

export { seed };
