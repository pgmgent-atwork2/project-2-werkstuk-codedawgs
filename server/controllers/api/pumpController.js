import Pump from "../../models/Pump.js"

export const pumps = async (req, res, next) => {
    const pumps = await Pump.query();
    res.json(pumps);
};