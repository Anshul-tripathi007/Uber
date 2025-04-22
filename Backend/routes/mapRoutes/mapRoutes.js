const express= require('express');
const mapRouter = express.Router();
const mapServices = require('../../services/mapServices');
const { authenticateUser } = require('../../middleware/authorization');

mapRouter.get("/getCoordinates",authenticateUser, async (req, res) => {
    try {

        const address = req.query.address;
        if(!address) return res.status(400).send("Please provide an address");
        const coordinates = await mapServices.getAddressCoordinate(address);
        res.status(200).send({coordinates});
    } catch (error) {
        res.status(400).send(error.message);
    }
})

mapRouter.get('/get-distance-time',authenticateUser, async (req, res) => {
    try {
        const origin = req.query.origin;
        const destination = req.query.destination;

        if(!origin || !destination) return res.status(400).send("Origin and destination are required");
        const distanceTime = await mapServices.getDistanceTime(origin, destination);
        res.status(200).send(distanceTime);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

)

mapRouter.get("/suggestions",authenticateUser, async (req, res) => {
    try {
        const input = req.query.input;
        const suggestions = await mapServices.getAutoCompleteSuggestion(input);
        res.status(200).send(suggestions);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = mapRouter;