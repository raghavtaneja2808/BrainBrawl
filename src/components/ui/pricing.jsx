import React from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const handlePayment = (planType) => {
    const amount = planType === "monthly" ? 200 : 2400;
    navigate("/payment", { state: { planType, amount } });
  };

  return (
    <section
      id="pricing"
      className="min-h-screen flex items-center justify-center bg-white dark:bg-black dark:text-gray-300 text-gray-700 p-6"
      style={{ marginTop: "-80px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Monthly Plan */}
        <div className="relative bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-purple-400 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-2">🧠 Monthly Brain Plan</h3>
          <p className="text-gray-400 mb-4">Try 7 days free, then ₹200 /month</p>
          <h2 className="text-4xl font-extrabold text-purple-400">
            ₹200 <span className="text-lg text-gray-400"> /month</span>
          </h2>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>✅ 250 GenAI Questions / Day</li>
            <li>✅ PDF Upload for Smart Quiz</li>
            <li>✅ Topic Suggestions</li>
            <li>✅ Priority Support</li>
            <li>✅ Future Features Included</li>
          </ul>
          <button
            onClick={() => handlePayment("monthly")}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-500 dark:text-gray-300 text-gray-700 py-2 px-4 rounded-lg transition-all duration-300 hover:cursor-pointer"
          >
            🚀 Try 7 Days Free
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="relative bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300">
          <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-3 py-1 text-sm font-bold rounded-full">
            🏆 Best Value
          </span>
          <h3 className="text-2xl font-bold mb-2">📘 Yearly Brain Plan</h3>
          <p className="text-gray-400 mb-4">Try 7 days free, then ₹2400 billed yearly</p>
          <h2 className="text-4xl font-extrabold text-yellow-400">
            ₹2400 <span className="text-lg text-gray-400"> /year</span>
          </h2>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li>✅ 250 GenAI Questions / Day</li>
            <li>✅ Unlimited PDF Uploads</li>
            <li>✅ Topic Suggestions</li>
            <li>✅ Priority Support (Chat + Email)</li>
            <li>✅ All Premium Features Forever</li>
          </ul>
          <button
            onClick={() => handlePayment("yearly")}
            className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded-lg transition-all duration-300 hover:cursor-pointer"
          >
            🌟 Try 7 Days Free
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
