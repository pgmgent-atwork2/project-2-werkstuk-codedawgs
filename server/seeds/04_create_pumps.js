const tableName = "pumps";

const seed = async function (knex) {
  await knex(tableName).truncate();
  await knex(tableName).insert([
    { title: "PDF1", sub_department_id: 1 },
    { title: "PDF2", sub_department_id: 1 },
    { title: "PDF3", sub_department_id: 1 },

    { title: "PDB1", sub_department_id: 2 },
    { title: "PDB2", sub_department_id: 2 },

    { title: "PSL1", sub_department_id: 3 },

    { title: "PSL2", sub_department_id: 4 },
    { title: "PSL3", sub_department_id: 4 },

    { title: "PSLQ", sub_department_id: 5 },

    { title: "PS1", sub_department_id: 6 },

    { title: "PS2", sub_department_id: 7 },

    { title: "PAQ1", sub_department_id: 8 },
    { title: "PAQ2", sub_department_id: 8 },
    { title: "PAQ3", sub_department_id: 8 },
    { title: "PAQ4", sub_department_id: 8 },
  ]);
};

export { seed };
