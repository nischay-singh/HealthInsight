import React, { useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function PatientSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      const response = await fetch(`/api/patientSearch?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received search results:", data);
      setResults(data.results); // You can render this later
    } catch (error) {
      console.error("Search failed:", error.message);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Patient Information Search
        </h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <Input
            type="text"
            placeholder="Search for symptoms, conditions, or patient attributes..."
            className="w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Age</Badge>
            <Badge variant="secondary">Gender</Badge>
            <Badge variant="secondary">Fever</Badge>
            <Badge variant="secondary">Cough</Badge>
            <Badge variant="secondary">Headache</Badge>
            <Badge variant="secondary">Fatigue</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" placeholder="Min Age" />
            <Input type="number" placeholder="Max Age" />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear Filters
            </Button>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
        
      </div>
    </main>
  );
}
