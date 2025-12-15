import React from 'react';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Stack,
  alpha,
  Button,
} from '@mui/material';
import {
  Coffee,
  Description,
} from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import { useTheme } from '../context/ThemeContext';
import TextLogo from '../assets/Text-WFHCafe_WObg.png';

const Footer: React.FC = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  
  const goldColor = '#C4B66F';
  const darkGreen = '#051814';

  const currentYear = new Date().getFullYear();
  
  // Get feedback form URL from environment variable or use default
  const feedbackFormUrl = process.env.REACT_APP_FEEDBACK_FORM || 'https://docs.google.com/forms/d/1Q15R1_ow38WvtlOjI3OX89nfCgn5h8Aaq7mMzddXQp8/edit?pli=1';

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: isDark ? '#051814' : '#FFFFFF',
        borderTop: `1px solid ${isDark ? alpha(goldColor, 0.1) : alpha(darkGreen, 0.1)}`,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">

        {/* App Name */}
              <Box
  component="img"
  src={TextLogo}
  alt="WFHCafe"
  sx={{
    display: 'block',
    mx: 'auto',
    width: '100%',
    maxWidth: '450px',
    transition: 'all 0.3s ease',
    opacity: 0.9,
    '&:hover': {
      opacity: 1,
      transform: 'scale(1.02)',
    },
  }}
/>

        {/* Tagline */}
        <Typography
          align="center"
          sx={{
            mb: 4,
            color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(5,24,20,0.7)',
            maxWidth: '600px',
            mx: 'auto',
            lineHeight: 1.6,
            fontSize: '1.1rem',
          }}
        >
          Where remote work meets the perfect cafe experience
        </Typography>

        {/* Feedback Call-to-Action */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 4,
          p: 3,
          borderRadius: '16px',
          bgcolor: isDark ? alpha(goldColor, 0.05) : alpha(darkGreen, 0.03),
          border: `1px solid ${isDark ? alpha(goldColor, 0.1) : alpha(darkGreen, 0.1)}`,
          maxWidth: '800px',
          mx: 'auto',
        }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: isDark ? '#FFFFFF' : darkGreen,
              fontWeight: 600,
            }}
          >
            Help us improve WFHCafe
          </Typography>
          <Typography
            sx={{
              mb: 3,
              color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(5,24,20,0.7)',
              fontSize: '1rem',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Your feedback is valuable! Help shape the future of remote work by sharing your thoughts and suggestions.
          </Typography>
          <Button
            href={feedbackFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            startIcon={<Description />}
            sx={{
              background: isDark 
                ? `linear-gradient(45deg, ${goldColor} 10%, #44A08D 90%)`
                : `linear-gradient(135deg, ${darkGreen} 0%, #1D5C4A 100%)`,
              color: isDark ? '#051814' : '#FFFFFF',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '25px',
              px: 4,
              py: 1.5,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Fill Out Feedback Form
          </Button>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            mt: 4,
            mb: 8,
            pt: 4,
            borderTop: `1px solid ${isDark ? alpha(goldColor, 0.1) : alpha(darkGreen, 0.1)}`,
          }}
        >
          <Typography
            sx={{
              color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(5,24,20,0.6)',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Coffee sx={{ 
              fontSize: 16, 
              verticalAlign: 'middle',
              color: goldColor,
            }} />
            © {currentYear} WFHCafe. All rights reserved.
          </Typography>
        </Box>

        {/* Feedback Note */}
        <Typography
          align="center"
          sx={{
            mt: 3,
            color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(5,24,20,0.4)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
          }}
        >
          Have suggestions? <a 
            href={feedbackFormUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: goldColor, 
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Share your feedback here
          </a>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;