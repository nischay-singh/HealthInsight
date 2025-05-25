import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background text-center">
        <h1 className="text-4xl font-bold mb-4 text-destructive">404 - Page Not Found</h1>
        <p className="text-lg mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Button size="lg" onClick={() => navigate("/")}>
          Go to Homepage
        </Button>
      </div>
    );
}
