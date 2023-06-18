import { FC } from "react";
import LandingPage from "./LandingPage";
import Register from "./Register";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import LoginPage from "./LoginPage";

const router = createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  }
]);

const App: FC = () => (
  <RouterProvider router={router}/>
);

export default App;
