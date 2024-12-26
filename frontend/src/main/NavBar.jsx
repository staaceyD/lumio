import PropTypes from 'prop-types';
import './NavBar.css'

NavBar.propTypes = {
    children: PropTypes.any,
};

export default function NavBar({ children }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo">
                    {children}
                </a>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    <li>
                        <a href="/products">Products</a>
                    </li>
                    <li>
                        <a href="/about">About Us</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
