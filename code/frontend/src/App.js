import React, {useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import QuestionAnswer from "./pages/QuestionAnswer.jsx";
import PatientSearch from "./pages/PatientSearch";
import SymptomGraph from "./pages/SymptomGraph";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.js";
import Login from "./pages/Login.jsx";

function App() {
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
      element: <Login/>
    },
    {
      path: "/questionanswer",
      element: <ProtectedRoute> <QuestionAnswer /> </ProtectedRoute>,
    },
    {
      path: "/patient-search",
      element: <ProtectedRoute> <PatientSearch/> </ProtectedRoute>,
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
