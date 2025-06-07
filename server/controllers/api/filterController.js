import Filter from "../../models/Filter.js"

export const filters = async (req, res, next) => {
    const filters = await Filter.query();
    res.json(filters);
};