import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import PatientSearch from "./pages/PatientSearch";
import SymptomGraph from "./pages/SymptomGraph";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.js";
import Login from "./pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: 
    <ProtectedRoute> <Home /> </ProtectedRoute>,
  },{
    path: "/",
    element: 
    <ProtectedRoute> <Home /> </ProtectedRoute>,
  },{
    path: "/login",
    element: <Login />
  },
  {
    path: "/chatbot",
    element: <ProtectedRoute> <Chatbot /> </ProtectedRoute>,
  },
  {
    path: "/patient-search",
    element: <ProtectedRoute> <PatientSearch /> </ProtectedRoute>,
  },
  {
    path: "/symptom-graph",
    element: <ProtectedRoute> <SymptomGraph /> </ProtectedRoute>,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>
);
}

export default App;
