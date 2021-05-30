import React from 'react';

const Character = ({ name, status, image }) => {
    return(
        <div className="card">
            <img src={image} alt={name} className="imageCard"/>
            <h4><strong>Name: </strong>{name}</h4>
            <h4><strong>Status: </strong>{status}</h4>
        </div>
    )
}

export default Character;