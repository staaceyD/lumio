import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './Header.module.css'

Header.propTypes = {
    showSidebar: PropTypes.func,
};

function Header({ showSidebar }) {
    return (
        <>
            <div className={styles.navbar}>
                <Link to="#" className={styles.menuBars}>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <div className={styles.navbarRight}>
                    <Link to="#" className={styles.userIcon}>
                        <FaIcons.FaRegUser />
                    </Link>
                    <p className={styles.logo}>lumio</p>
                </div>
            </div>
        </>
    )
}

export default Header