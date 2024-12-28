import './App.css'
import SideBar from './main/sidebar/SideBar.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import { Team, Home, Support } from "./main/sidebar/routes.jsx";

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
    <><RouterProvider router={router}>
    </RouterProvider>
    </>
  )
}

export default App
