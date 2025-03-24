import React from 'react'

const LocationSearchPanel = (props) => {

  const locations=["Eldeco Green Meadows , Sector Pi-I , Greater Noida","Amity University Noida , Sector-125","B3/63 Yamuna Vihar , Delhi"]
  
  const handleClick=()=>{
    props.setVehiclePanel(true);
    props.setPanelOpen(false);
  }

  return (
    <div>

      {
        locations.map((elem,indx)=>{
          return <div key={indx} className='flex mt-3 items-center' onClick={handleClick}>
          <i className="ri-map-pin-line mx-2 "/><p>{elem}</p>
          </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel
 