import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, alpha } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import HeroBg from '../assets/background.jpg'; 

const TextSection: React.FC = () => {
  const [drinkIndex, setDrinkIndex] = useState(0);
  const drinks = ['coffee', 'chai', 'croissant', 'cappuccino', 'americano', 'latte', 'matcha', 'espresso'];
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  // Theme constants
  const lokiTextGradient = 'linear-gradient(45deg, #C4B66F 10%, #44A08D 90%)'; 
  const lightModeTextGradient = 'linear-gradient(135deg, #051814 0%, #1D5C4A 100%)';
  const discordFont = {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    fontWeight: 800,
    letterSpacing: '-0.02em',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDrinkIndex((prev) => (prev + 1) % drinks.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [drinks.length]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${HeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: isDark 
            ? 'rgba(5, 24, 20, 0.7)' 
            : 'rgba(255, 255, 255, 0.65)',
          backdropFilter: isDark ? 'blur(2px)' : 'none',
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ 
          textAlign: 'center', 
          py: { xs: 6, md: 10 },
          position: 'relative',
          zIndex: 1,
        }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
              lineHeight: 0.95,
              mb: { xs: 1, sm: 6 },
              textTransform: 'uppercase',
              ...discordFont,
              background: isDark ? 'none' : lightModeTextGradient,
              WebkitBackgroundClip: isDark ? 'none' : 'text',
              WebkitTextFillColor: isDark ? 'white' : 'transparent',
              textShadow: isDark ? '0 0 30px rgba(12, 59, 46, 0.5)' : 'none',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: { xs: '-30px', sm: '-20px' },
                left: '50%',
                transform: 'translateX(-50%)',
                width: { xs: '150px', sm: '200px' },
                height: '4px',
                background: lokiTextGradient, 
                borderRadius: '2px',
                display: { xs: 'none', sm: 'block' },
              }
            }}
          >
            Your office is where
            <Box 
              component="span" 
              sx={{ 
                display: 'block',
                background: lokiTextGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                minHeight: { xs: '1.8em', sm: '1.2em' },
                fontStyle: 'italic',
                mt: { xs: 1, sm: 0 },
                lineHeight: { xs: 1.2, sm: 0.95 },
              }}
            >
              your {drinks[drinkIndex]} is.
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TextSection;