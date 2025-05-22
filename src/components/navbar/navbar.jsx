import React from 'react';
import "./navbar.scss"
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import ResNavbar from '../resNavbar/resNavbar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="wrapper">
                <div className="nav_content">
                    <div className="nav_logo">
                        <Link to="/"><a href="">GhostIQ</a></Link>
                    </div>
                    <ul className='nav_list'>
                        <Link to="/Sciences"><li>Fanlar</li></Link>
                        <Link to="/Statistics"><li>Statistika</li></Link>
                        <Link to="/Login"><li>Kirish</li></Link>
                    </ul>
                    <button onClick={() => setIsOpen(!isOpen)} class="btn">
                        <span className="icon">
                            <svg viewBox="0 0 175 80" width="40" height="40">
                                <rect width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                                <rect y="30" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                                <rect y="60" width="80" height="15" fill="#f0f0f0" rx="10"></rect>
                            </svg>
                        </span>
                        <span class="text">MENU</span>
                    </button>
                </div>
                {isOpen && <ResNavbar isOpen={isOpen} setIsOpen={setIsOpen} />}
            </div>
        </div>
    );
}

export default Navbar;
