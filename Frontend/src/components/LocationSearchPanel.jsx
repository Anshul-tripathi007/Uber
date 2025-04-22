import React, { useEffect, useState } from "react";
import axios from "axios";
const LocationSearchPanel = (props) => {
  
  const [suggestions, setsuggestions] = useState([]);
  const [pickupChanging, setpickupChanging] = useState(false)
  const [destinationChanging, setdestinationChanging] = useState(false)
  const handleClick = (e) => {
    if(pickupChanging){
      props.setPickup(e.target.innerHTML);
      setpickupChanging(false);
    }
    else if(destinationChanging){
      props.setDestination(e.target.innerHTML);
      setdestinationChanging(false);
    }
    setsuggestions([]);
  };
 
  useEffect(() => {
    setpickupChanging(true);
    setdestinationChanging(false);
    if (props.pickup == "") setsuggestions([]);
    async function suggest() {
      const response = await axios.get(
        `http://localhost:3000/maps/suggestions`,
        {
          params: {
            input: props.pickup,
          },
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setsuggestions(response.data);
      } else {
        console.log("Error in fetching suggestions");
      }
    }
    if (props.pickup.length > 4) suggest();
  }, [props.pickup]);

  useEffect(() => {
    setdestinationChanging(true);
    setpickupChanging(false);
    if (props.destination == "") setsuggestions([]);
    async function suggest() {
      const response = await axios.get(
        "http://localhost:3000/maps/suggestions",
        {
          params: {
            input: props.destination,
          },
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setsuggestions(response.data);
      } else {
        console.log("Error in fetching suggestions");
      }
    }
    if (props.destination.length > 4) suggest();
  }, [props.destination]);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
      {suggestions.map((elem, indx) => {
        return (
          <div
            key={indx}
            className="flex mt-3 items-center"
            onClick={handleClick}
          >
            <i className="ri-map-pin-line mx-2 " />
            <p>{elem.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
