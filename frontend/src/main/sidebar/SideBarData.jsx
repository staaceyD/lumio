import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "sidebarText",
    },
    {
        title: "Team",
        path: "/team",
        icon: <IoIcons.IoMdPeople />,
        cName: "sidebarText",
    },
    {
        title: "Support",
        path: "/support",
        icon: <IoIcons.IoMdHelpCircle />,
        cName: "sidebarText",
    },
];