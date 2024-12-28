import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Header.css'

Header.propTypes = {
    showSidebar: PropTypes.bool,
};

function Header({ showSidebar }) {
    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <div className="navbar-right">
                    <Link to="#" className="user-icon">
                        <FaIcons.FaRegUser />
                    </Link>
                    <p className="logo">lumio</p>
                </div>
            </div>
        </>
    )
}

export default Header