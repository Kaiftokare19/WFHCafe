import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  alpha,
  Container,
  useMediaQuery,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import XIcon from '@mui/icons-material/X';
import { useTheme as useCustomTheme } from '../context/ThemeContext';
import logo from '../assets/WFHCafe_WObg.png';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { mode, toggleTheme } = useCustomTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lokiGradient = 'linear-gradient(135deg, #051814 0%, #0F3B2E 100%)';
  const goldColor = '#C4B66F';

  return (
    <AppBar
  position="fixed"
  elevation={0}
  sx={{
    top: 0,
    left: 0,
    right: 0,
    zIndex: (theme) => theme.zIndex.drawer + 1,
    background: mode === 'dark'
      ? lokiGradient
      : (isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent'),
    backdropFilter: 'blur(10px)',
    borderBottom: isScrolled ? `1px solid ${alpha(goldColor, 0.1)}` : 'none',
    color: mode === 'dark' ? '#E0E0E0' : '#051814',
    transition: 'all 0.3s ease',
  }}
>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo and App Name - Now aligned to left */}
          <Box 
            component="a"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="WFHCafe Logo"
              sx={{
                height: 40,
                width: 'auto',
                transition: 'all 0.3s ease',
                filter: mode === 'dark' ? 'brightness(1.1)' : 'none',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: '0.05em',
                '&:hover': {
                  color: goldColor,
                },
                transition: '0.3s'
              }}
            >
              WFHCafe
            </Typography>
          </Box>

          {/* Spacer to push other items to right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
          }}>
            {/* X (Twitter) Icon Button */}
            <Tooltip title="Follow us on X">
              <IconButton
                href="https://x.com/WFHCafee"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: goldColor,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <XIcon />
              </IconButton>
            </Tooltip>

            {/* Theme Toggle Button */}
            <Tooltip title="Toggle Theme">
              <IconButton 
                onClick={toggleTheme} 
                color="inherit"
                sx={{
                  '&:hover': {
                    color: goldColor,
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;