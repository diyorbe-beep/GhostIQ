import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./resNavbar.scss"
function Modal({ onClose }) {
    return (
        <div className="wrapper">
            <div className="resNavbar">
                <div className="nav_logo">
                    <Link to="/"><a href="">GhostIQ</a></Link>
                </div>
                <ul className='nav_list'>
                    <Link to="/Sciences"><li onClick={onClose} >Fanlar</li></Link>
                    <Link to="/Statistics"><li onClick={onClose}>Statistika</li></Link>
                    <Link to="/Login"><li onClick={onClose}>Kirish</li></Link>
                </ul>
            </div>
        </div>
    );
}

export default Modal;
