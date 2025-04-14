import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Star,
    Frown,
    Smile,
    ThumbsUp,
    Bug,
    ChevronRight,
    AlertCircle,
} from 'lucide-react';
import Switch from "react-switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";

const QuizAppFeedbackForm = () => {
    const [rating, setRating] = useState(3);
    const [ratingValue, setRatingValue] = useState('Average');
    const [feedback, setFeedback] = useState({
        questions: '',
        interface: '',
        features: '',
        bugs: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDark, setIsDark] = useState(
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    // Handle theme toggle
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    const ratingLabels = {
        1: 'Very Poor',
        2: 'Poor',
        3: 'Average',
        4: 'Good',
        5: 'Excellent',
    };

    const handleRatingChange = (event) => {
        const newRating = parseInt(event.target.value, 10);
        setRating(newRating);
        setRatingValue(ratingLabels[newRating]);
    };

    const handleInputChange = (event, field) => {
        setFeedback({ ...feedback, [field]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!rating) {
            alert('Please provide an overall rating.');
            return;
        }

        setIsSubmitting(true);

        try {
            console.log('Feedback submitted:', { rating, ...feedback });
            alert('Thank you for your feedback!');
            resetForm();
        } catch (error) {
            console.error('Failed to submit feedback', error);
            alert('Failed to submit feedback. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setRating(3);
        setRatingValue(ratingLabels[3]);
        setFeedback({ questions: '', interface: '', features: '', bugs: '' });
    };

    const getRatingColor = () => {
        switch (rating) {
            case 1:
                return 'text-red-600';
            case 2:
                return 'text-orange-600';
            case 3:
                return 'text-gray-600';
            case 4:
                return 'text-yellow-600';
            case 5:
                return 'text-green-600';
            default:
                return 'text-gray-600';
        }
    };

    const getIconForField = (field) => {
        switch (field) {
            case 'questions':
                return <Star className="w-5 h-5" />;
            case 'interface':
                return <Smile className="w-5 h-5" />;
            case 'features':
                return <ThumbsUp className="w-5 h-5" />;
            case 'bugs':
                return <Bug className="w-5 h-5" />;
            default:
                return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className={`bg-gray-100 dark:bg-gray-800 p-6 rounded-lg`}>
            <Navbar />
            
            

            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Quiz App Feedback
                </h1>
                <form id="feedbackForm" className="space-y-6" onSubmit={handleSubmit}>
                    {/* Rating Section */}
                    <div>
                        <label
                            htmlFor="rating"
                            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                        >
                            Overall Experience:
                        </label>
                        <input
                            type="range"
                            id="rating"
                            name="rating"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={handleRatingChange}
                            className="w-full"
                        />
                        <p id="ratingValue" className={getRatingColor()}>
                            {ratingValue}
                        </p>
                    </div>

                    {/* Feedback Fields */}
                    {Object.keys(feedback).map((key) => (
                        <div key={key} className="feedback-input-container">
                            <label
                                htmlFor={key}
                                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                            >
                                {key === 'questions'
                                    ? 'Quality of Questions:'
                                    : key === 'interface'
                                    ? 'User Interface:'
                                    : key === 'features'
                                    ? 'Features:'
                                    : 'Bugs/Issues:'}
                            </label>
                            <textarea
                                id={key}
                                name={key}
                                placeholder={
                                    key === 'questions'
                                        ? 'How were the questions? Too easy/hard? Clear/confusing?'
                                        : key === 'interface'
                                        ? "How was the app's design and usability?"
                                        : key === 'features'
                                        ? 'Any features you liked or would like to see added?'
                                        : 'Did you encounter any errors or unexpected behavior?'
                                }
                                value={feedback[key]}
                                onChange={(e) => handleInputChange(e, key)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            <div className="feedback-input-icon">
                                {getIconForField(key)}
                            </div>
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                            isSubmitting && "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <ChevronRight className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Submit Feedback'
                        )}
                    </button>
                </form>
            </div>
            <br></br>
            
            <Footer />
        </div>
    );
};

export default QuizAppFeedbackForm;

