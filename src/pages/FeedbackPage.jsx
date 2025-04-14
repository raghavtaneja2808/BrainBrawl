import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";
import { FileVideo } from "lucide-react";

export default function FeedbackPage() {
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [otherType, setOtherType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const fileInputRef = useRef(null);

  const feedbackTypes = [
    "Bug Report",
    "Feature Request",
    "UI/UX Suggestion",
    "General Feedback",
    "Other",
  ];

  const handleSubmit = () => {
    // Add integration with backend if needed
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleClickUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-4 py-12 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl font-bold text-center mb-4">We'd love your feedback! 💬</h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-10">
            Help us make <span className="font-semibold">BrainBrawl</span> even better!
          </p>

          {/* User Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <input
              type="text"
              placeholder="Your Name (optional)"
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email (optional)"
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Feedback Type */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold">What type of feedback?</label>
            <div className="flex flex-wrap gap-3">
              {feedbackTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    selectedType === type
                      ? "bg-blue-600 text-white"
                      : "border-blue-500 text-blue-500 dark:border-blue-400 dark:text-blue-400 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {selectedType === "Other" && (
              <input
                type="text"
                placeholder="Please specify"
                className="mt-4 w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={otherType}
                onChange={(e) => setOtherType(e.target.value)}
              />
            )}
          </div>

          {/* Star Rating */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold">How would you rate your experience?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className={`text-4xl transition-transform duration-200 ${
                    selectedRating && selectedRating >= star ? "text-yellow-400" : "text-gray-400"
                  } hover:scale-110`}
                  aria-label={`${star} Star`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold">Your Feedback</label>
            <textarea
              rows="6"
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Share your thoughts, suggestions, or any issue you faced..."
            />
          </div>

          {/* Optional File Upload (Fully Clickable Div) */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold">Add a screenshot or video (optional)</label>
            <div
              onClick={handleClickUpload}
              className="flex items-center gap-3 border-2 border-dashed border-gray-400 dark:border-gray-600 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <FileVideo className="text-gray-500 dark:text-gray-400" size={28} />
              <span className="text-gray-600 dark:text-gray-300">Click to upload a file</span>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Submit Feedback
            </button>
          </div>

          {/* Success Popup */}
          {showPopup && (
            <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl z-50">
              🎉 Your feedback has been submitted!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
