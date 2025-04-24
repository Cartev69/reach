import React, { useState, useEffect } from 'react';
import './FAQ.css';

const FAQ = () => {
    const [faqs, setFaqs] = useState([
        {
            question: "What should I expect during my child's first chemotherapy session?",
            answer: "Loading...",
            isExpanded: false
        },
        {
            question: "How can I help manage my child's treatment side effects?",
            answer: "Loading...",
            isExpanded: false
        },
        {
            question: "What support resources are available for siblings?",
            answer: "Loading...",
            isExpanded: false
        },
        {
            question: "How can I communicate effectively with my child's medical team?",
            answer: "Loading...",
            isExpanded: false
        }
    ]);

    useEffect(() => {
        // Load answers for all FAQs when component mounts
        const loadAnswers = async () => {
            const updatedFaqs = await Promise.all(
                faqs.map(async (faq) => {
                    try {
                        const response = await fetch('http://localhost:5000/api/query', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ question: faq.question }),
                        });
                        const data = await response.json();
                        return {
                            ...faq,
                            answer: data.answer
                        };
                    } catch (error) {
                        return {
                            ...faq,
                            answer: "We're having trouble loading this answer. Please try again later."
                        };
                    }
                })
            );
            setFaqs(updatedFaqs);
        };

        loadAnswers();
    }, []);

    const toggleFAQ = (index) => {
        setFaqs(faqs.map((faq, i) => ({
            ...faq,
            isExpanded: i === index ? !faq.isExpanded : false
        })));
    };

    return (
        <div className="faq-container">
            <div className="faq-header">
                <h2>Frequently Asked Questions</h2>
                <p>Common questions from parents like you</p>
            </div>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`faq-item ${faq.isExpanded ? 'expanded' : ''}`}
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="faq-question">
                            <h3>{faq.question}</h3>
                            <span className="toggle-icon">
                                {faq.isExpanded ? '−' : '+'}
                            </span>
                        </div>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
