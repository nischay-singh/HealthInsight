import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export function Navbar() {
  return (
    <nav className="bg-secondary py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          HealthInsight
        </Link>
        <div className="space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/patient-search">Patient Search</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/symptom-graph">Symptom Graph</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/chatbot">Chatbot</Link>
          </Button>
          <Button variant="ghost">About Us</Button>
          <Button variant="ghost">Contact</Button>
        </div>
      </div>
    </nav>
  );
}
