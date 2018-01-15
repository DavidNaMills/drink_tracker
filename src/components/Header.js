import React from 'react';

export default ({type=0})=>(
    <div className={type===0? "mainHeader" : "mainHeader subHeader"}>
        <h3>Body-Stats</h3>
    </div>
);