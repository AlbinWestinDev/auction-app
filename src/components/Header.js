import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import "./Header.css";

import { useStateValue } from "./StateProvider";
import { auth } from "../firebase";

function Header() {
  const [{ loggedinuser }, dispatch] = useStateValue();
  const logoutUser = () => {
    if (loggedinuser) {
      auth.signOut();
    }
  };
  return (
    <nav className="header">
      <img
        className="header_logo"
        alt="logo"
        src="https://image.shutterstock.com/image-vector/creative-auction-logo-you-can-260nw-1095315374.jpg"
      />
      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <SearchIcon className="headerSearchIcon" />
      </div>
      <div className="header-nav">
        <Link to={!loggedinuser && "/login"} className="header_link">
          <div onClick={logoutUser} className="header_option">
            <span className="header_optionLineOne">
              Välkommen {loggedinuser?.email}
            </span>
            <span className="header_optionLineTwo">
              {loggedinuser ? "Logga ut" : "Logga in"}
            </span>
          </div>
        </Link>
        <Link to="/" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne"> Om oss</span>
            <span className="header_optionLineTwo"> Läs här</span>
          </div>
        </Link>
        <Link to="/" className="header_link">
          <div className="header_option">
            <span className="header_optionLineOne"> Se pågående</span>
            <span className="header_optionLineTwo"> Auktioner</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
