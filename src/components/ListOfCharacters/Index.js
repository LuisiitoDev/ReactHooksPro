import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from '../Character/Index';
const ListOfCharactersComponent = () => {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get("https://rickandmortyapi.com/api/character", {})
            .then(response => {
                setCharacters(response.data.results);
            })
    }, []);

    return (
        <div className="cards">
            {characters.map(character => <Character key={character.id} {...character} />)}
        </div>

    )
}

export default ListOfCharactersComponent;