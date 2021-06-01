import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import axios from 'axios';
import Character from '../Character/Index';
import Search from '../Search';
import useCharacters from '../../hooks/useCharacters';

const initialState = {
    favorites: []
}

const API = 'https://rickandmortyapi.com/api/character';


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

    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] = useState("");
    const searchInput = useRef(null);

    const characters = useCharacters(API);

    const handleClick = favorite => {
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite });
    }

    // const handleSearch = () => {
    //     setSearch(searchInput.current.value);
    // }

    const handleSearch = useCallback(() => {
        setSearch(searchInput.current.value);
    },[]);


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
            <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />
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