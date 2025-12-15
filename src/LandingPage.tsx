import React, { useState } from 'react';
import {
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FAQSection from './components/FAQSection';
import HeroVideoSection from './components/HeroVideoSection';
import TextSection from './components/TextSection';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  // State for email submission
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <Box sx={{ 
      overflowX: 'hidden',
      minHeight: '100vh',
    }}>
      
      {/* Snackbar for error messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Snackbar for success messages */}
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Successfully registered for early access! We'll notify you when we launch.
        </Alert>
      </Snackbar>

      {/* Navbar - Sticky at top */}
      <Navbar />

      {/* 1. Hero Video Section with Sticky Email Input at Bottom */}
      <HeroVideoSection 
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
      />

      {/* 2. Text Section */}
      <TextSection />

      {/* 3. FAQ Section */}
      <FAQSection />

      {/* 4. Footer */}
      <Footer />
    </Box>
  );
};

export default LandingPage;