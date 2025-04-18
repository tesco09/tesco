import React from 'react';
import './BottomNav.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faBook, faBookAtlas, faDiagramSuccessor, faHome, faLayerGroup, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className="nav-item" activeClassName="active">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
            </NavLink>
            <NavLink to="/progress" className="nav-item" activeClassName="active">
                <FontAwesomeIcon icon={faBarsProgress} />
                <span>Progress</span>
            </NavLink>
            <NavLink to="/my-team" className="nav-item" activeClassName="active">
                <FontAwesomeIcon icon={faPeopleGroup} />
                <span>Team</span>
            </NavLink>
            <NavLink to="/team-detail" className="nav-item" activeClassName="active">
                <FontAwesomeIcon icon={faBook} />
                <span>Details</span>
            </NavLink>
        </nav>
    );
}

export default BottomNav;