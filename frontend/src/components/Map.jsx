import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import {Tooltip} from '@mui/material';
import { MdMyLocation } from "react-icons/md";

const FlyToLocation = ({ position }) => {
  const map = useMap();
  map.flyTo(position, 14);
  return null;
};

const FindMe =({setPosition, setMarkerPosition, setPlace}) => {
  const map = useMapEvents({
    click(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng])
      setPosition([e.latlng.lat, e.latlng.lng])
      setPlace(null)
    },
    locationfound(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      setPlace('Your current location')
    },
  });
  return <div className='absolute bottom-4 rounded-full p-1 z-[1000] cursor-pointer left-4 h-8 w-8 bg-gray-900 dark:bg-gray-700'>
    <MdMyLocation onClick={() => map.locate()} className='h-full w-full text-gray-50 dark:text-white'/>
  </div>
}

const MapComponent = ({markerPosition, setMarkerPosition}) => {
  markerPosition = markerPosition.includes(undefined) ? [9.0358287, 38.7524127]:markerPosition
  const [position, setPosition] = useState([9.0358287, 38.7524127]);
  const searchQuery = useRef(null);
  const [place, setPlace] = useState(null)
  const [results, setResults] = useState(null)

  const changePosition = (lat, lon, display_name) => {
    setPosition([parseFloat(lat), parseFloat(lon)]);
    setMarkerPosition([parseFloat(lat), parseFloat(lon)]);
    setPlace(display_name)
  }

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      if (!searchQuery.current)
        return;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${searchQuery.current.value}, Ethiopia&format=json&countrycodes=ET&limit=5`
      );
      
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        changePosition(lat, lon, display_name);
        const data = response.data.map(({lat, lon, display_name})=> ({lat, lon, display_name}))
        setResults(data)
      } else {
        toast.error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      alert('Error fetching location data');
    }
  };
  
  return (
    <div className='relative w-full'>
      <ul className="min-w-max absolute z-[1000] m-2 bottom-1 right-0 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      {results && 
        results.map(({lat, lon, display_name}) =>
          <Tooltip title={display_name}>
            <li key={lat+lon} onClick={()=>changePosition(lat, lon, display_name)} className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 cursor-pointer">{display_name.slice(0,45) + (display_name.length>45?' ...':'')}</li>
          </Tooltip>
        )}
      </ul>
      
      <MapContainer className='z-0 relative' center={markerPosition} zoom={13} style={{ height: '80vh', width: '100%' }}>        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

      <form className="max-w-md absolute z-[100000] top-0 right-0 m-2" onSubmit={handleSearch}>
          <input type="search" id="default-search" ref={searchQuery} className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find places..." />
          <button type="submit" className="text-white absolute top-0 bottom-0 right-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </button>
      </form>
      
        {markerPosition && (
          <Marker position={markerPosition}>
              {place && 
            <Popup>
              {place}
            </Popup>
              }
          </Marker>
        )}
        <FlyToLocation position={markerPosition} />
        <FindMe setPosition={setPosition} setMarkerPosition={setMarkerPosition} setPlace={setPlace}/>
      </MapContainer>
        
    </div>
  );
};

export default MapComponent;
