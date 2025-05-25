import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../context/AuthContext";
export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

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

          {isAuthenticated && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/patient-search">Patient Symptom Search</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/symptom-graph">Doctor Specialty Analysis</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/questionanswer">Question Answer Search</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/keyword-symptom-explorer">Keyword Symptom Explorer</Link>
              </Button>
            </>
          )}

          <Button variant="ghost"> <Link to="/aboutus">About Us</Link></Button>

          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>Logout</Button>
          ) : (
            <Button variant="default" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
