import React, {useState} from 'react';
import {MapContainer, useMap} from 'react-leaflet';
import L from 'leaflet';

interface Props{
    onSearch:(query:string,map:L.Map)=>void;
}

const SearchBar=({onSearch}:Props)=>{
    const [inputValue,setInputValue]=useState('');
    const map=useMap();

    const handleSubmit=(event:React.FormEvent)=>{
        event.preventDefault();
        onSearch(inputValue,map);
    };
    return(
        <form onSubmit={handleSubmit} className='searchBar-form'>
            <input 
            type='text'
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            placeholder='Enter a location'
            
            />
            <button type='submit'>Search</button>
        </form>
    );
};

const HandleSearch=(locationName:string,map:L.Map)=>{
fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`)
.then(response=>response.json())
.then(data=>{
    if(data.length>0){
        const lat=parseFloat(data[0].lat);
        const lon =parseFloat(data[0].lon);
        map.setView([lat,lon],13)
    }else{
        alert('location not found');
    }
})



}



export default SearchBar;
export {HandleSearch};