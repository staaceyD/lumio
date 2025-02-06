import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import { IconContext } from "react-icons";
import styles from './SideBar.module.css'
import Header from "../header/Header";

function SideBar() {
    const [sidebar, setSidebar] = useState(false);

    const handleShowSidebar = () => setSidebar(!sidebar);
    const navMenuClassName = sidebar ? `${styles.active} ${styles.navMenu}` : styles.navMenu;

    return (
        <>
            <IconContext.Provider value={{ color: "undefined" }}>
                <Header showSidebar={handleShowSidebar} />
                <nav className={navMenuClassName}>
                    <ul className={styles.navMenuItems} onClick={handleShowSidebar}>
                        <li className={styles.sidebarToggle}>
                            <NavLink to="/" className={styles.menuBars}>
                                <AiIcons.AiOutlineClose />
                            </NavLink>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={styles.sidebarText}>
                                    <NavLink to={item.path} className={({ isActive }) => isActive ? `${styles.sidebarText} ${styles.active}` : undefined}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default SideBar;