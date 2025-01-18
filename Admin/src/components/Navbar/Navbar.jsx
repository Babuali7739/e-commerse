import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import { CiSearch } from "react-icons/ci";
import { IoIosLogIn,IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegMoon,FaMoon } from "react-icons/fa";
import navprofile from '../../assets/nav-profile.svg';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResults, setShowResults] = useState(false); // To track if results are visible
  const [isDarkTheme, setIsDarkTheme] = useState(false); 
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const loginMenuRef = useRef(null); 
  const searchContainerRef = useRef(null); // To track search input and results
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const response = await axios.get(`http://localhost:8000/search?q=${query}`);
        setSearchResults(response.data); // Update search results
        setShowResults(true); // Show results when search query is not empty
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    } else {
      setSearchResults([]);
      setShowResults(false); // Clear results if search input is empty
    }
  };

  const handleClickOutside = (e) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
      setShowResults(false);
    }
    if (loginMenuRef.current && !loginMenuRef.current.contains(e.target)) {
      setShowLoginMenu(false); // Close login menu when clicking outside
    }
  };

  useEffect(() => {
    // Add event listener to detect outside clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchItemClick = (item) => {
    navigate(`/product/${item.id}`);
  };

  const performSearch = async () => {
    if (searchQuery) {
      try {
        const response = await axios.get(`http://localhost:8000/search?q=${searchQuery}`);
        setSearchResults(response.data);
        const uniqueResults = getUniqueResults(response.data);
        setSearchResults(uniqueResults);
        setShowResults(true); 
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    }
  };
  const getUniqueResults = (results) => {
    const uniqueResults = results.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueResults;
  };

  // login function

  const login = ()=>{

    setIsLoggedIn(!isLoggedIn); 

    if (!isLoggedIn) {
      navigate('/login'); 
    }
    else{
      navigate('/')
    }

  }
  const toggleLoginMenu = () => {
    const newClickCount = clickCount + 1;

    if (newClickCount >= 2) {
      setShowLoginMenu(false); // Close the login menu after two clicks
      setClickCount(0); // Reset the click count
    } else {
      setShowLoginMenu(prev => !prev); // Toggle the login menu
      setClickCount(newClickCount); // Increment the click count
    }
  };
  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev); // Toggle theme
  };

  return (
    <div className={`navbar ${isDarkTheme ? 'dark' : 'light'}`}>
      <img src={navlogo} alt="Logo" className="nav-logo" />
      <div className="search-container" ref={searchContainerRef}>
        <input
          type="text"
          className='search'
          placeholder='Search here'
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              performSearch();
            }
          }}
        />
        <CiSearch className='icon' onClick={performSearch} />
      </div>

      {/* nav profile image */}
        <img src={navprofile} className='navprofile'  onClick={toggleLoginMenu} alt="" />


        {showLoginMenu && (
        <div className="loginmenu" ref={loginMenuRef}>
          <div className="menusidebar">
            <img src={navprofile} className='navprofile' alt="" />
            <p>Babu Ali</p>
          </div>
          <hr />
          <div className="theme" onClick={toggleTheme}>
            {isDarkTheme ? <FaMoon /> : <FaRegMoon />} <p>Theme</p> {/* Change icon based on theme */}
          </div>
          <div className="theme" onClick={login}>
            <IoIosLogIn /> <p>Sign-In</p>
          </div>
          <div className="theme">
            <IoSettingsOutline /> <p>Settings</p>
          </div>
        </div>
      )}



      {showResults && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((item) => (
            <div 
              key={item.id} 
              className="search-item" 
              onClick={() => handleSearchItemClick(item)} 
            >
              <div className="result">
             <span>{item.name.slice(0,40)}</span>
             <img src={item.image} alt={item.name} className="search-item-image" />
             </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
