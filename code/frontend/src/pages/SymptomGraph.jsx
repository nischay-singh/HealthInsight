import { Navbar } from "../components/ui/navbar"

export default function SymptomGraph() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Symptom-Diagnosis Graph Visualization</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-center">
          This interactive graph visualizes the relationships between symptoms and diagnoses. Explore connections,
          identify patterns, and gain insights into how different health conditions are interrelated.
        </p>
        <div className="bg-secondary aspect-video rounded-lg flex items-center justify-center">
          <p className="text-2xl text-muted-foreground">Graph Visualization Placeholder</p>
        </div>
      </div>
    </main>
  )
}

