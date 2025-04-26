import React, {useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import PatientSearch from "./pages/PatientSearch";
import SymptomGraph from "./pages/SymptomGraph";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.js";
import Login from "./pages/Login.jsx";

function App() {
  const [email, setEmail] = useState("");

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
      element: <Login setEmail={setEmail} />
    },
    {
      path: "/chatbot",
      element: <ProtectedRoute> <Chatbot /> </ProtectedRoute>,
    },
    {
      path: "/patient-search",
      element: <ProtectedRoute> <PatientSearch email={email} /> </ProtectedRoute>,
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

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
