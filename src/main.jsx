import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import PrivateRoute from "./PrivateRoute/PrivateRoute.jsx";
import PrivateSign from "./PrivateRoute/PrivateSign.jsx";
import AddTask from "./pages/AddTask/AddTask.jsx";
import ManageTask from "./pages/ManageTask/ManageTask.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PrivateRoute><Home /></PrivateRoute>,
      },
      {
        path: "/add-task",
        element: <PrivateRoute><AddTask /></PrivateRoute>,
      },
      {
        path: "/manage-task",
        element: <PrivateRoute><ManageTask /></PrivateRoute>,
      },
      {
        path: "/login",
        element: <PrivateSign><Login /></PrivateSign>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
