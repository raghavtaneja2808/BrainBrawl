import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";

const Payment = () => {
  const location = useLocation();
  const { planType, amount } = location.state || { planType: "monthly", amount: 200 };

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
                    ₹{amount} - {planType === "monthly" ? "Monthly" : "Yearly"} Premium Plan
                  </div>
                </div>

                <Button
                  className="w-full text-lg py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                  aria-label={`Pay ₹${amount} for ${planType} Premium Plan`}
                >
                  Pay Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

      {/* Pricing Features Section */}
<div className="w-full md:w-1/3 space-y-4 text-center animate-fadeInUp delay-150">
  <h3 className="text-2xl font-bold mb-2">💸 Plan Details</h3>
  <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-zinc-800 dark:to-zinc-700 p-4 rounded-xl shadow-md text-left text-sm md:text-base">
    <ul className="list-disc list-inside space-y-2">
      <li>
        <span className="font-semibold">Monthly Plan:</span> ₹200/month – Ideal for short-term commitment and trying out features.
      </li>
      <li>
        <span className="font-semibold">Yearly Plan:</span> ₹2400/year -  get full access all year long.
      </li>
      <li>
        Cancel anytime from your profile settings.
      </li>
      <li>
        Secure payments powered by industry-standard encryption.
      </li>
    </ul>
  </div>
</div>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Payment;
