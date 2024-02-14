// YourComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
const DesktopSidebar = () => {

    return (
        <div className="d-flex flex-column flex-shrink-0 p-0  sidebar-box small-sidebar overflow-y-sm">
            <ul className="nav flex-column mb-auto ">
                <li className="nav-item">
                    <Link to="/" className="nav-link active d-grid" aria-current="page" data-bs-dismiss="offcanvas">
                        <i className='bi bi-house-door-fill'></i>
                        <span className='sidebar-title'>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/shorts" className="nav-link d-grid " data-bs-dismiss="offcanvas">
                        <i className='bi bi-skip-end-btn'></i>
                        <span className='sidebar-title'> Short </span>
                    </Link>
                </li>
                <li>
                    <Link to="/subscriptions" className="nav-link d-grid" data-bs-dismiss="offcanvas">
                        <i className='bi-play-btn'></i>
                        <span className='sidebar-title'> Subscriptions </span>
                    </Link>
                </li>
                <li>
                    <Link to="/" className="nav-link d-grid" data-bs-dismiss="offcanvas">
                        <i className='bi bi-person'></i>
                        <span className='sidebar-title'> You </span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default DesktopSidebar;
