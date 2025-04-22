const axios = require('axios');
const API='AIzaSyC0fF-BGviiaDdefYRL-HLUjgCW34Krr_o'
const captainModel=require('../models/captainModel')

module.exports.getAddressCoordinate= async (address)=>{
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: API
            }
        });

        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            console.log("error")
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
}   

module.exports.getDistanceTime = async (origin, destination) => {

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API}`;

    try {


        const response = await axios.get(url);
        if (response.data.status === 'OK') {

            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }

            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getAutoCompleteSuggestion = async (input) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: API
            }
        });

        if (response.data.status === 'OK') {
            const suggestions = response.data.predictions.map(prediction => ({
                description: prediction.description,
                place_id: prediction.place_id
            }));
            return suggestions;
        } else {
            throw new Error(`Autocomplete API error: ${response.data.status}`);
        }
    } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error.message);
        throw error;
    }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius,vehicleType) => {


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}
