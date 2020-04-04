import React from 'react';
import List from './list'
import Map from './map'
import '../App.css';

function Combine(){
    return(
        <div className="row">
            <div className="column">
            <List/>
            </div>
            <div className="column">
            <Map/>
            </div>
        
        </div>

    );
}

export default Combine;
