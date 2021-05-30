import React, { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const color = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark');
        console.log('text');
    }

    return (
        <div className="header">
            <a style={{ color }} href="#default" className="logo">React Hooks</a>
            <div className="header-right">
                <label className="switch">
                    <input onClick={handleClick} type="checkbox" />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )

}

export default Header;