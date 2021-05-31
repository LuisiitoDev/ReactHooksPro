import React, { useState, useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';
import Character from '../Character/Index';

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}


const ListOfCharactersComponent = () => {

    const [characters, setCharacters] = useState([]);
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://rickandmortyapi.com/api/character", {})
            .then(response => {
                setCharacters(response.data.results);
            })
    }, []);

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite });
    }

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    // const filteredUsers = characters.filter(user => {
    //     return user.name.toLowerCase().includes(search.toLowerCase());
    // });

    const filteredUsers = useMemo(() =>
        characters.filter(user => {
            return user.name.toLowerCase().includes(search.toLowerCase());
        }),
        [characters, search]
    );

return (
    <>
        {favorites.favorites.map(fav => (
            <li key={fav.id}>{fav.name}</li>
        ))}
        <div className="Search">
            <input type="text" value={search} onChange={handleSearch} />
        </div>
        <div className="cards">
            {filteredUsers.map(character => (
                <div key={character.id}>
                    <Character {...character} />
                    <button type="button" onClick={() => handleClick(character)}>Add to favorite</button>
                </div>
            ))}
        </div>
    </>
)
}

export default ListOfCharactersComponent;