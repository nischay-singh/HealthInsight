import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import PatientSearch from "./pages/PatientSearch";
import SymptomGraph from "./pages/SymptomGraph";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
  },
  {
    path: "/patient-search",
    element: <PatientSearch />,
  },
  {
    path: "/symptom-graph",
    element: <SymptomGraph />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
