import MeasurementDefinitions from "../../models/MeasurementDefinition.js"

export const measurementDefinitions = async (req, res, next) => {
    const measurementDefinitions = await MeasurementDefinitions.query();   
    res.json(measurementDefinitions);
};