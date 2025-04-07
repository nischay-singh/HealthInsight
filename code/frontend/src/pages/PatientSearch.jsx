import React, { useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function PatientSearch() {
  const [manualQuery, setManualQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [results, setResults] = useState([]);
  const [age, setAge] = useState("");

  const commonSymptoms = [
    "Fever", "Cough", "Headache", "Fatigue",
    "Nausea", "Vomiting", "Shortness of breath", "Dizziness", "Sore throat"
  ];

  const handleBadgeClick = (symptom) => {
    const isSelected = selectedTags.includes(symptom);
    let updatedTags;

    if (isSelected) {
      updatedTags = selectedTags.filter((tag) => tag !== symptom);
    } else {
      updatedTags = [...selectedTags, symptom];
    }

    setSelectedTags(updatedTags);
  };

  const handleSearch = async () => {
    const finalQuery = `${manualQuery} ${selectedTags.join(" ")} ${age}`.trim();
    if (finalQuery === "") return;
    console.log(finalQuery);
    try {
      const response = await fetch(`/api/patientSearch?q=${encodeURIComponent(finalQuery)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received search results:", data);
      setResults(data.results);
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
        <p className="mb-6 text-justify">This tool allows you to search for past medical records by typing in symptoms or conditions. It returns previous patient visits that closely match your input based on keyword relevance, along with a confidence score. This helps surface relevant clinical cases by analyzing medical transcription data.</p>
        <div className="max-w-2xl mx-auto space-y-6">
          <Input
            type="text"
            placeholder="Search for symptoms, conditions, or patient attributes..."
            className="w-full"
            value={manualQuery}
            onChange={(e) => setManualQuery(e.target.value)}
          />

          <p className="text-sm text-muted-foreground italic">
            Full query:{" "}
            <span className="font-medium">{manualQuery} {selectedTags.join(" ")}</span>
          </p>

          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Badge
                key={symptom}
                variant="secondary"
                onClick={() => handleBadgeClick(symptom)}
                className={`cursor-pointer transition-transform ${
                  selectedTags.includes(symptom) ? "scale-95 bg-primary text-primary-foreground" : ""
                }`}
              >
                {symptom}
              </Badge>
            ))}
          </div>

          <Input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)}/>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setManualQuery("");
                setSelectedTags([]);
              }}
            >
              Clear Filters
            </Button>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        {results.length > 0 && (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Search Results</h2>
            {results.map((record, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 shadow-sm bg-card text-card-foreground"
            >
                <h3 className="text-lg font-semibold mb-2">{record.doctor_specialty.trim()}</h3>
                <p className="text-muted-foreground italic mb-2">{record.visit_description}</p>
                <p className="text-sm mb-2"><strong>Score:</strong> {record.score.toFixed(2)}</p>
                <p className="text-sm text-foreground">{record.medical_transcription}</p>
            </div>
              ))}
        </div>
        )}
  
      </div>
    </main>
  );
}
