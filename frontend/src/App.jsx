import SideBar from './main/sidebar/SideBar.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Team, Home, Support } from "./main/routes/sidebarRoutes.jsx";
import TaskDetails from "./main/routes/taskDetails.jsx";

const AppLayout = () => (
  <>
    <SideBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/details/:id",
        element: <TaskDetails />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "support",
        element: <Support />,
      }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
