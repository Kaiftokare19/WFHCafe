import React, { useState } from 'react';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme } from '../context/ThemeContext';

const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  // Styles
  const premiumGlassStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(196, 182, 111, 0.2)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    borderRadius: '24px',
  };
  const lightCardStyle = {
    background: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(12, 59, 46, 0.1)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    borderRadius: '24px',
  };

  const activeCardStyle = isDark ? premiumGlassStyle : lightCardStyle;
  const cardTitleColor = isDark ? 'white' : '#051814';
  const cardTextColor = isDark ? 'rgba(255,255,255,0.7)' : '#00291dff';

  const faqItems = [
    {
      question: "Find Your Perfect Workspace Cafe",
      answer: "Discover cafes near you with verified amenities - high-speed WiFi, power outlets, comfortable seating, and quiet zones perfect for productive work sessions.",
    },
    {
      question: "Connect with Remote Professionals",
      answer: "Meet other remote workers in your area. Join our community events, skill-sharing sessions, and networking meetups at curated cafe locations.",
    },
    {
      question: "Verified Cafe Reviews & Ratings",
      answer: "Read authentic reviews from fellow remote workers. Get real insights on WiFi speed, noise levels, seating comfort, and coffee quality before you visit.",
    },
    {
      question: "Collaboration Spaces & Events",
      answer: "Find cafes hosting remote work meetups, workshops, and collaboration sessions. Perfect for co-working, brainstorming, and building professional connections.",
    },
    {
      question: "Real-time Availability & Booking",
      answer: "Check live seating availability, reserve your spot, and plan your work sessions. Never waste time looking for a seat again.",
    },
    {
      question: "City Guides for Digital Nomads",
      answer: "Explore curated guides for remote workers in different cities. Find the best neighborhoods, cafe clusters, and local remote work communities.",
    },
  ];

  const handleExpandClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box className={`faq-container ${isDark ? '' : 'light-mode'}`}>
      <div className="faq-inner-container">
        <div className="faq-content-wrapper">
          <div className="faq-left-side">
            <div className="faq-left-content">
              <h1 className="faq-title">
                <span className="faq-title-text discord-font">
                  Welcome to,
                </span>
              </h1>
              <p className="faq-description">
                Discover how we're transforming remote work through community-powered cafe spaces.
              </p>
            </div>
          </div>

          <div className="faq-right-side">
            <div className="faq-items-container">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question-container" style={activeCardStyle}>
                    <button
                      className="faq-question-button"
                      onClick={() => handleExpandClick(index)}
                      style={{ background: 'transparent', border: 'none' }}
                    >
                      <span className="faq-question-text discord-font" style={{ color: cardTitleColor }}>
                        {item.question}
                      </span>
                      {expandedIndex === index ? (
                        <ExpandLessIcon style={{ width: '24px', height: '24px', color: isDark ? '#C4B66F' : '#051814' }} />
                      ) : (
                        <ExpandMoreIcon style={{ width: '24px', height: '24px', color: isDark ? '#aaa' : '#666' }} />
                      )}
                    </button>
                    {expandedIndex === index && (
                      <div className="faq-answer">
                        <p className="faq-answer-text" style={{ color: cardTextColor }}>
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FAQSection;