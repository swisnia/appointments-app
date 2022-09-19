import React/*, {useState, useRef, useEffect}*/ from 'react'
import { FormRow } from '../../components'
/*import mapboxgl from 'mapbox-gl'

const MAP_TOKEN = process.env.REACT_APP_MAPBOX_KEY
mapboxgl.accessToken = MAP_TOKEN*/

const StepOne = ({values, changeValue}) => { 
/*const mapContainer = useRef(null)
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9)
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9)

    useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    })
  })*/

  return (
    <div>
      <h4>Wpisz dane firmy</h4>
      <h6>Dane podstawowe</h6>
      <FormRow 
        type='text'
        name='companyName'
        labelText='Nazwa salonu'
        value={values.companyName}
        handleChange={changeValue}               
      />
      <FormRow 
        type='text'
        name='businessOwner'
        labelText='Właściciel'
        value={values.businessOwner}
        handleChange={changeValue}                
      />
      <FormRow 
        type='tel'
        name='phoneNumber'
        labelText='Numer telefonu (dla klientów)'
        value={values.phoneNumber}
        handleChange={changeValue}               
      />
      <h6>Adres</h6>
      <div className='street-and-number'>
        <FormRow 
          type='text'
          name='street'
          labelText='Ulica'
          value={values.street}
          handleChange={changeValue}               
        />
        <FormRow 
          type='text'
          name='number'
          labelText='Numer'
          value={values.number}
          handleChange={changeValue}               
        />
      </div>
      <div className='postal-code-and-city'>
        <FormRow 
          type='text'
          name='postalCode'
          labelText='Kod pocztowy'
          value={values.postalCode}
          handleChange={changeValue}               
        />
        <FormRow 
          type='text'
          name='city'
          labelText='Miasto'
          value={values.city}
          handleChange={changeValue}               
        />
      </div>
      {/*<div>
        <div ref={mapContainer} className="map-container" />
      </div>*/}
    </div>
  )
}

export default StepOne