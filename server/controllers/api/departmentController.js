import Department from "../../models/Department.js"
import SubDepartment from "../../models/SubDepartment.js";

export const departments = async (req, res, next) => {
    const departments = await Department.query();
    res.json(departments);
};

export const subDepartments = async (req, res, next) => {
    const subDepartments = await SubDepartment.query();
    res.json(subDepartments);
};