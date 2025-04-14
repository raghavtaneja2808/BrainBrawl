import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";

const Payment = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 via-white to-purple-100 text-black dark:from-zinc-900 dark:via-black dark:to-zinc-800 dark:text-white transition-colors duration-500">

      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 px-6 md:px-12 py-10 gap-10 items-start justify-center animate-fadeInUp">
        
        {/* Left Info Section */}
        <div className="md:w-1/4 w-full space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-extrabold">🧠 Brain Brawl</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Challenge your mind with quizzes on logic, tech, science & more. Climb the leaderboard and win bragging rights!
          </p>
          <img
            src="/images/quiz-illustration.svg"
            alt="Quiz Illustration"
            className="w-full rounded-xl mt-4 hidden md:block"
          />
        </div>

        {/* Payment Form Section */}
        <div className="w-full md:w-1/3 animate-fadeInUp delay-200">
          <Card className="w-full rounded-2xl border-0 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-2xl dark:shadow-none transition-shadow duration-300">
            <CardContent className="p-6">
              <h2 className="text-3xl font-bold text-center mb-8">Complete Your Payment</h2>

              <form className="space-y-5">
                <div>
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input id="name" placeholder="John Doe" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label>Amount</Label>
                  <div className="bg-purple-100 dark:bg-zinc-800 p-3 rounded mt-1 font-semibold text-center">
                    ₹99 - Premium Quiz Access
                  </div>
                </div>

                <Button
                  className="w-full text-lg py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                  aria-label="Pay ₹99 for Premium Quiz Access"
                >
                  Pay Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Premium Features Section */}
        <div className="md:w-1/4 w-full space-y-4 animate-fadeInUp delay-300 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">🚀 Premium Perks</h3>
          <ul className="space-y-2 text-sm md:text-base list-disc list-inside">
            <li>Access exclusive quiz categories</li>
            <li>Challenge mode with friends</li>
            <li>Leaderboard boost & top-tier visibility</li>
            <li>Early access to new quiz themes</li>
            <li>Ad-free immersive experience</li>
            <li>Priority support & updates</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Payment;
