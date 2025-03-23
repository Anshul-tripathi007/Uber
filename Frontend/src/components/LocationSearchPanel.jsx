import React from 'react'

const LocationSearchPanel = () => {

  const locations=["Eldeco Green Meadows , Sector Pi-I , Greater Noida","Amity University Noida , Sector-125","B3/63 Yamuna Vihar , Delhi"]
  return (
    
    <div>

      {
        locations.map((elem,indx)=>{
          return <div key={indx} className='flex mt-3 items-center'>
          <i className="ri-map-pin-line mx-2 "/><p>{elem}</p>
          </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel
 