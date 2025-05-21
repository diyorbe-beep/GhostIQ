import React from 'react';
import "./navbar.scss"
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className="wrapper">
                <div className="nav_content">
                    <div className="nav_logo">
                        <Link to="/">GhostIQ</Link>
                    </div>
                    <ul className='nav_list'>
                        <Link to="/Sciences"><li>Fanlar</li></Link>
                        <Link to="/Statistics"><li>Statistika</li></Link>
                        <li>Kirish</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
