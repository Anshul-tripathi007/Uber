import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const API='AIzaSyC0fF-BGviiaDdefYRL-HLUjgCW34Krr_o'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude,
                });
            });
        };
        
        // Update location immediately and then every 10 seconds
        updatePosition();
        const intervalId = setInterval(updatePosition, 10000);

        // return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    return (
        <LoadScript googleMapsApiKey={API}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;