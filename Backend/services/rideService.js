const crypto = require('crypto');
const {getDistanceTime} = require('./mapServices');

const baseFare = {
    auto: 30,
    car: 50,
    moto: 20
};

const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8
};

const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5
};

module.exports.generateOtp=()=>{
    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
    return otp;
}

module.exports.calculateFare=async (pickup,destination,vehicleType)=>{

    const distanceTime = await getDistanceTime(pickup, destination);
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    }

    if(vehicleType === 'all'){
        return fare
    }
    return fare[vehicleType]
}

