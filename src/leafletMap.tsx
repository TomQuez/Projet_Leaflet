import React, { useState } from 'react';
import { MapContainer,TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import {iconMappings, townMarker} from "./constantes";



const LeafletMap=()=>{
    
    const [mapCenter, setMapCenter]=useState<[number,number]>([46.2401341,3.6339728]);
    const [selectedType, setSelectedType]=useState("Tous");

    const getCustomIcon=(type:string)=>{
        console.log("icone pour le type ",type,iconMappings[type])
        const options=iconMappings[type]||iconMappings.town;
        return new L.Icon({
            iconUrl:options.iconUrl,
            iconSize:options.iconSize
        })
    };
    const typeOption=["Tous",...Object.keys(iconMappings).sort()];
    const filteredMarkers=townMarker.filter(
        (marker)=>selectedType==="Tous" || marker.type === selectedType
    );
    const handleTypeChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{

        console.log("type select ", e.target.value);
        setSelectedType(e.target.value);
    };


    return (
        <section className='info-carte'>
            <div>
                <label htmlFor='filter'>Filtrer par : </label>
                <select id='filter' onChange={handleTypeChange} value={selectedType}>
                {...typeOption.map((type)=>(
                    <option key={type} value={type}>{type}</option> ))}
                </select>
            </div>
            <MapContainer 
            center={mapCenter}
            zoom={13}
            style={{height:"500px",width:"500px"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; 
                    <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
/>  
                <Marker position={mapCenter} icon={getCustomIcon('town')}>
                    <Popup>My bled</Popup>
                </Marker>
                <MarkerClusterGroup>
                    {filteredMarkers.map((city,index)=>{
                        <Marker
                        key={index}

                        position={city.coordinates}
                        icon={getCustomIcon(city.type)}>
                            <Popup>
                                {city.name}<br/>
                                {city.description.startsWith("http")?(<a href={city.description} target='_blank' rel='noopener noreferrer'>Visiter le site</a>):(city.description)}
                            </Popup>
                        </Marker>
                    })}
                </MarkerClusterGroup>
            </MapContainer>
        </section>
    );
}

export default LeafletMap;