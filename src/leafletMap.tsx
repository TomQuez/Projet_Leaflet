import React, {useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap:React.FC=()=>{
    useEffect(()=>{
        const map = L.map('map',{
            center:[46.23898,3.63389],
            zoom:13
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors'

        }).addTo(map);
    },[]);

    return <div id="map" style={{height:'500px',width:'100%'}}/>
};

export default LeafletMap;