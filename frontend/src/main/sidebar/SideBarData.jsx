import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "sidebar-text",
    },
    {
        title: "Team",
        path: "/team",
        icon: <IoIcons.IoMdPeople />,
        cName: "sidebar-text",
    },
    {
        title: "Support",
        path: "/support",
        icon: <IoIcons.IoMdHelpCircle />,
        cName: "sidebar-text",
    },
];