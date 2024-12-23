import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFileText, FiUpload, FiHome, FiSettings } from 'react-icons/fi';
import { HiMenuAlt1,HiMenuAlt3 } from "react-icons/hi";

import '../App.css';

const Navbar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? <HiMenuAlt1 /> : <><HiMenuAlt3 /> Menu</>}
            </button>
            <Link to="/" className="nav-link">
                <FiHome />
                {!isCollapsed && <span>Home</span>}
            </Link>
            <Link to="/manual" className="nav-link">
                <FiFileText />
                {!isCollapsed && <span>Analyze</span>}
            </Link>
            <Link to="/upload" className="nav-link">
                <FiUpload />
                {!isCollapsed && <span>File Upload</span>}
            </Link>
            <Link to="/" className="nav-link">
                <FiSettings/>
                {!isCollapsed && <span>Settings</span>}
            </Link>
        </div>
    );
};

export default Navbar;
