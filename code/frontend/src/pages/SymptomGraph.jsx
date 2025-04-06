import React, { useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function SymptomGraph() {
  const [keyword, setKeyword] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSearch = async () => {
    if (keyword.trim() !== "") {
      try {
        console.log(keyword)

        const response = await fetch("/api/symptomGraph", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ keyword }),
        });
  
        // Check if response is ok (status 200–299)
        if (!response.ok) {
          const errorText = await response.text(); // Read raw error (could be HTML)
          throw new Error(`Server responded with status ${response.status}: ${errorText}`);
        }
  
        const data = await response.json();
        console.log("Received data from backend:", data);
  
        setShowMessage(true);
      } catch (error) {
        console.error("Error fetching data:", error.message || error);
      }
    }
  };
  

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Symptom-Diagnosis Graph Visualization
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-justify">
          This interactive graph visualizes the relationships between symptoms and diagnoses. Explore connections,
          identify patterns, and gain insights into how different health conditions are interrelated.
        </p>

        <div className="max-w-xl mx-auto flex gap-4 mb-8">
          <Input
            type="text"
            placeholder="Enter keyword (e.g., fever)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {showMessage && <div className="bg-secondary aspect-video rounded-lg flex items-center justify-center">
            <p className="text-xl text-muted-foreground text-center px-4">
              Showing results for: <span className="font-semibold">{keyword}</span>
              <br />
              (Graph data will appear here in future)
            </p>
        </div>}
      </div>
    </main>
  );
}
