import React, {useEffect, useState } from 'react';
import { MapContainer,TileLayer, Marker, Popup } from 'react-leaflet';
import {icon} from "leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';
import {iconMappings, townMarker} from "./constantes";
import "./LeafletInfos.scss";


const LeafletMap=()=>{
    
    const [mapCenter, setMapCenter]=useState<[number,number]>([46.2401341,3.6339728]);
    const [selectedType, setSelectedType]=useState("Tous");
    const getCustomIcon=(type)=>{
        return new Icon(iconMappings[type] || iconMappings.town);

    };
    const typeOption=["Tous",...Object.keys(iconMappings).sort()];
    const fliteredMarkers=townMarker.filter(
        (marker)=>selectedType==="Tous" || marker.type === selectedType ||
        marker.type === "town"
    );
    const handleTypeChange=(e)=>{
        setSelectedType(e.target.value);
    };


    return (
        <section className='info-carte'>
            <div>
                <label htmlFor='filter'>Filtrer par : </label>
                <select id='filter' onChange={handleTypeChange} value={selectedType}>
                {...typeOption.map((type)=>(
                    <option key={type} value={type}>{type}</option> ))};
                </select>
            </div>
            <MapContainer 
            center={mapCenter}
            zoom={13}
            style={{height:"500px",width:"100%"}}>
                <TileLayer 
                url="https://tile.openstreetmap.fr/?layers=B00000000FFFFFF"/>
                <Marker position={mapCenter} icon={getCustomIcon('town')}>
                    <Popup>My bled</Popup>
                </Marker>
                <MarkerClusterGroup>
                    {fliteredMarkers.map((city,index)=>{
                        <Marker
                        key={index}
                        position={city.coodinates}
                        icon={getCustomIcon(city.type)}></Marker>
                    })}
                </MarkerClusterGroup>
            </MapContainer>
        </section>
    );
}

export default LeafletMap;