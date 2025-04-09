import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>
        <Link to={"/"}>Desaparecidos</Link>
      </h2>
      <ul>
        <li>
          <Link to={"/"} className="new-btn">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
