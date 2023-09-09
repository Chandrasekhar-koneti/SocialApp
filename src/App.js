import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const router2 = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/signup", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/profile", element: <Profile /> },
  ]);
  return (
    <>
      <RouterProvider router={router2}></RouterProvider>
    </>
  );
}

export default App;
