import React, { useState } from "react";
import { Navbar } from "../components/ui/navbar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function KeywordSymptomExplorer() {
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [symptomResults, setSymptomResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const keywords = [
    "fever", "cough", "headache", "nausea", "fatigue",
    "pain", "dizziness", "rash", "vomiting", "diarrhea"
  ];

  const handleKeywordClick = async (keyword) => {
    console.log(keyword)
    setSelectedKeyword(keyword);
    setLoading(true);

    try {
      const searchParams = new URLSearchParams({ keyword: keyword });
      const response = await fetch(`/api/keyword-symptoms?${searchParams.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSymptomResults(data.results);
    } catch (error) {
      console.error("Failed to fetch symptoms:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Explore Symptoms by Keyword
        </h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {keywords.map((keyword) => (
              <Badge
                key={keyword}
                variant="secondary"
                onClick={() => handleKeywordClick(keyword)}
                className={`cursor-pointer transition-transform ${
                  selectedKeyword === keyword ? "scale-95 bg-primary text-primary-foreground" : ""
                }`}
              >
                {keyword}
              </Badge>
            ))}
          </div>

          {loading && (
            <p className="text-center text-muted-foreground">Loading symptoms...</p>
          )}

          {!loading && symptomResults.length > 0 && (
            <div className="space-y-4 mt-8">
              <h2 className="text-2xl font-semibold text-primary text-center">Symptoms matching "{selectedKeyword}"</h2>
              {symptomResults.map((item, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4 shadow-sm bg-card text-card-foreground"
                >
                  <p className="text-lg font-medium">{item.Keyword}</p>
                  <p className="text-sm text-muted-foreground">
                    Matches: {item.MatchCount}, Total Occurrences: {item.TotalOccurrences}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
