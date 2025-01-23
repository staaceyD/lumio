import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SideBarData";
import { IconContext } from "react-icons";
import './SideBar.css'
import Header from "../header/Header";

function SideBar() {
    const [sidebar, setSidebar] = useState(false);

    const handleShowSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: "undefined" }}>
                <Header showSidebar={handleShowSidebar} />
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={handleShowSidebar}>
                        <li className="sidebar-toggle">
                            <NavLink to="/" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </NavLink>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <NavLink to={item.path} className={({ isActive }) => isActive ? item.cName + " active" : undefined}>
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