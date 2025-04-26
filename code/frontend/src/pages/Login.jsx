import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Navbar } from "../components/ui/navbar";
import { useAuth } from "../context/AuthContext";
export default function Login({setEmail}) {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { login } = useAuth();
  const [inputEmail, setInputEmail] = useState("");
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setEmail(loginEmail)
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      login(data.token);
      navigate("/");
    } else {
      alert(data.error || "Login failed.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong.");
  }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      })
      const data = await response.json();

      if (response.ok) {
        // TODO:Success logic here
        const token = data.token;
        login(token);
        navigate("/");
      }else{
        alert(data.error || "Signup failed.");
      }
    } catch (error){
      
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
    <main className="min-h-screen bg-background flex items-center justify-center px-8">
  <div className="flex max-w-6xl w-full items-center justify-between gap-12">
    {/* Left Section */}
    <div className="flex-1 text-left">
      <h1 className="text-5xl font-bold mb-6 text-primary">Welcome to HealthInsight</h1>
      <p className="text-xl text-muted-foreground max-w-xl">
        Empowering patients with accessible healthcare information through interactive tools and AI-powered assistance.
      </p>
    </div>

    {/* Right Section (Auth Tabs) */}
    <div className="max-w-md w-full">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Access your HealthInsight account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="button" onClick={handleLogin}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
        <Card>
    <form onSubmit={handleSignup}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Join HealthInsight to access all features</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="signup-name">Name</Label>
          <Input
            id="signup-name"
            type="text"
            placeholder="John Doe"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="your@email.com"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </CardFooter>
    </form>
  </Card>
</TabsContent>
      </Tabs>
    </div>
  </div>
</main>
</div>
  );
}
