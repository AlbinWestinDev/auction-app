import React, { useState, useCallback } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
// import './Header.css';
import '../style/css/style.css';
import logo from '../style/img/logo8.png';
import searchicon from '../style/img/search.png';

import { useStateValue } from './StateProvider';
import { auth } from '../firebase';

function Header() {
  const history = useHistory();
  const [{ loggedinuser }, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState('');
  const logoutUser = () => {
    if (loggedinuser) {
      auth.signOut();
    }
  };

  const handleOnClick = () => history.push(`/Search/${searchTerm}`);
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleOnClick();
    }
  };

  return (
    <nav className="header">
      
      {/* SEARCH */}
      <div className="header_search">
        <input
          type="text"
          className="header_searchInput"
          // value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />

        <Link
          to={{
            pathname: `/Search/${searchTerm}`,
          }}
        >
          <img src='https://www.pngkey.com/png/full/16-164810_transparent-search-icon-png.png'  alt='Search' className="headerSearchIcon" />
        </Link>
      </div>

      <Link to='/'>
      <img
        className="header_logo"
        alt="logo"
        src={logo}
      /></Link>
      

      {loggedinuser ? (
        <Link to="/AddAuction" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne"> Lägg till</span>
            <span className="header_optionLineTwo"> Ny Auktion</span>
          </div>
        </Link>
      ) : (
        <></>
      )}

      <Link to="/" className="header_link">
        <div className="header_option">
          <span className="header_optionLineOne"> Se pågående</span>
          <span className="header_optionLineTwo"> Auktioner</span>
        </div>
      </Link>
      <div className="header-nav">
        <Link to={!loggedinuser && '/login'} className="header_link">
          <div onClick={logoutUser} className="header_option">
            <span className="header_optionLineOne">
              Välkommen {loggedinuser?.email}
            </span>

            <span className="header_optionLineTwo">
              {loggedinuser ? 'Logga ut' : 'Logga in'}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
