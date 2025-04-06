import React from "react";
import { Navbar } from "../components/ui/navbar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export default function Chatbot() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          HealthInsight AI Assistant
        </h1>
        <div className="max-w-2xl mx-auto bg-secondary rounded-lg p-6 space-y-4">
          <div className="space-y-4">
            {/* AI Message */}
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-4 rounded-lg">
                <p>
                  Hello! I'm your HealthInsight AI assistant. How can I help you
                  today?
                </p>
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start gap-4 justify-end">
              <div className="bg-primary p-4 rounded-lg text-primary-foreground">
                <p>What are the common symptoms of the flu?</p>
              </div>
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>

            {/* AI Response */}
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-4 rounded-lg">
                <p>
                  The common symptoms of the flu include:
                  <br />1. Fever or feeling feverish/chills
                  <br />2. Cough
                  <br />3. Sore throat
                  <br />4. Runny or stuffy nose
                  <br />5. Muscle or body aches
                  <br />6. Headaches
                  <br />7. Fatigue
                  <br />
                  Some people may also experience vomiting and diarrhea, though
                  this is more common in children than adults.
                </p>
              </div>
            </div>
          </div>

          {/* Input Field */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Type your health-related question here..."
              className="flex-grow"
            />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
