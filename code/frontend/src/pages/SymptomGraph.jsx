import React, { useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import SymptomWordCloud from "../components/ui/SymptomWordCloud";

export default function SymptomGraph() {
  const [keyword, setKeyword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [formattedWords, setFormattedWords] = useState([]);

  const handleSearch = async () => {
    if (keyword.trim() !== "") {
      try {
        const response = await fetch("/api/symptomGraph", {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({ keyword }),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server responded with status ${response.status}: ${errorText}`);
        }
  
        const data = await response.json();
        console.log("Received data from backend:", data);    
        setGraphData(data);
        setFormattedWords(data.map(item => [item.DoctorSpecialty.trim().toUpperCase(), item.NumRecords]));
        console.log(data.map(item => [item.DoctorSpecialty.trim().toUpperCase(), item.NumRecords]))
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

        {showMessage && (
          <div className="text-center text-muted-foreground px-4">
            <p className="text-xl mb-4"> Showing results for: <span className="font-semibold">{keyword}</span></p>

    {graphData && (
      <div className="overflow-x-auto mx-auto">
        {/* <table className="min-w-full bg-secondary rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="text-left bg-primary text-primary-foreground">
              <th className="py-3 px-4">Doctor Specialty</th>
              <th className="py-3 px-4">Matching Records</th>
            </tr>
          </thead>
          <tbody>
            {graphData.map((item, idx) => (
              <tr key={idx} className="border-t border-muted">
                <td className="py-2 px-4">{item.DoctorSpecialty}</td>
                <td className="py-2 px-4">{item.NumRecords}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <SymptomWordCloud words = {formattedWords} />
      </div>
    )}
  </div>
)}
      </div>
    </main>
  );
}
