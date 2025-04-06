import React from "react";
import { Navbar } from "../components/ui/navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function PatientSearch() {
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
            <Button variant="outline">Clear Filters</Button>
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
