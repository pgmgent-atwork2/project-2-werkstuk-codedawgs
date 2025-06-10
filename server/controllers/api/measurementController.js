import MeasurementDefinitions from "../../models/MeasurementDefinition.js"

export const measurementDefinitions = async (req, res, next) => {
    const measurementDefinitions = await MeasurementDefinitions.query();
    console.log(measurementDefinitions);
    
    res.json(measurementDefinitions);
};