import React from "react";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to HealthInsight</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Empowering patients with accessible healthcare information through interactive tools and AI-powered
          assistance.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <a href="/patient-search">Explore Patient Data</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/symptom-graph">View Symptom Graph</a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="/chatbot">Chat with AI</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
