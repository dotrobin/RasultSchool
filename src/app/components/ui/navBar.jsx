import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/users">
                        Users
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
