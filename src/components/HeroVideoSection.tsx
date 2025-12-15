import React, { useRef, useEffect, useState } from 'react';
import { Box, TextField, Button, CircularProgress, alpha, useMediaQuery } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

interface HeroVideoSectionProps {
  email: string;
  setEmail: (email: string) => void;
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({ 
  email, 
  setEmail, 
  loading, 
  handleSubmit 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [positionState, setPositionState] = useState<'start' | 'fixed' | 'end'>('start');
  const { mode } = useTheme();
  const isDark = mode === 'dark';
  
  // Check for mobile view - use a specific breakpoint
  const isMobile = useMediaQuery('(max-width: 900px)');
  
  // Define video sources based on device
  const desktopVideoSrc = "https://salmon-selective-jackal-307.mypinata.cloud/ipfs/bafybeic4uhvpsvw2db2f54uaqa6gl4varqn7dsbmtcjgzzekf4dkl52v5q";
  const mobileVideoSrc = "https://salmon-selective-jackal-307.mypinata.cloud/ipfs/bafybeiacbo6j7j4ox4hfayizxck54fdhhbbnzsr7ldsrqioecn7p44l2ue";
  const fallbackImageSrc = "https://salmon-selective-jackal-307.mypinata.cloud/ipfs/QmREY2P5Gg3FWQvYJdGz95HKQommnb8kHRw6KuhSurxDnf";

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  // Optimized scroll handler with debouncing
  useEffect(() => {
    let ticking = false;
    
    const updateVideoFrame = (progress: number) => {
      if (videoDuration > 0 && videoRef.current) {
        // Only update video frame on desktop
        if (!isMobile) {
          videoRef.current.currentTime = videoDuration * progress;
        }
      }
    };
    
    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Use requestAnimationFrame for smoother performance
      if (!ticking) {
        requestAnimationFrame(() => {
          // 1. Determine Position State (works for both mobile and desktop)
          if (rect.top <= 0 && rect.bottom >= windowHeight) {
            setPositionState('fixed');
          } 
          else if (rect.bottom < windowHeight) {
            setPositionState('end');
          } 
          else {
            setPositionState('start');
          }
          
          // 2. Calculate Video Progress
          const scrolledPixels = -rect.top;
          const totalDistance = rect.height - windowHeight;
          
          let progress = scrolledPixels / totalDistance;
          progress = Math.max(0, Math.min(1, progress));
          
          // 3. Update Video Frame (only on desktop)
          updateVideoFrame(progress);
          
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Use passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoDuration, isMobile]); // Add isMobile to dependency array

  // Handle mobile video playback
  useEffect(() => {
    if (isMobile && videoRef.current) {
      // Play video normally on mobile
      videoRef.current.play().catch(e => {
        console.log("Autoplay prevented:", e);
        // Fallback: play on user interaction
        const playOnInteraction = () => {
          if (videoRef.current) {
            videoRef.current.play();
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          }
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
      
      // Loop the video on mobile
      videoRef.current.loop = true;
    } else if (!isMobile && videoRef.current) {
      // On desktop, ensure video doesn't auto-play
      videoRef.current.pause();
      videoRef.current.loop = false;
    }
  }, [isMobile]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const goldColor = '#C4B66F';
  const darkGreen = '#051814';
  const lokiGradient = 'linear-gradient(135deg, #051814 0%, #0F3B2E 100%)';

  return (
    <Box
      ref={containerRef}
      sx={{
        height: '200vh', // Keep 200vh for both mobile and desktop
        width: '100%',
        position: 'relative',
        bgcolor: isDark ? '#000000' : '#FFFFFF',
        // Add padding-top for sticky navbar only for desktop
        pt: { xs: 0, sm: 0, md: 0, lg: '64px' },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          
          // DYNAMIC POSITIONING LOGIC - Works for both mobile and desktop
          ...(positionState === 'fixed' && {
            position: 'fixed',
            top: 0,
            left: 0,
          }),
          ...(positionState === 'start' && {
            position: 'absolute',
            top: 0,
            left: 0,
          }),
          ...(positionState === 'end' && {
            position: 'absolute',
            bottom: 0, 
            left: 0,
          }),
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // Optimize for performance
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Mobile video for screens up to 900px */}
          <source 
            src={mobileVideoSrc}
            type="video/mp4" 
            media="(max-width: 900px)"
          />
          {/* Desktop video for screens above 900px */}
          <source 
            src={desktopVideoSrc}
            type="video/mp4" 
            media="(min-width: 901px)"
          />
          {/* Default source for browsers that don't support media attribute */}
          <source 
            src={desktopVideoSrc}
            type="video/mp4" 
          />
          <img 
            src={fallbackImageSrc}
            alt="Coffee shop background" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </video>
      </Box>

      {/* Sticky Email Input at Bottom - Liquid Glass Effect */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 40,
          left: 0,
          width: '100%',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          px: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            maxWidth: '700px',
            // Liquid Glass Effect with better blur and gradient
            background: isDark 
              ? 'linear-gradient(135deg, rgba(5, 24, 20, 0.25) 0%, rgba(15, 59, 46, 0.25) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(245, 245, 245, 0.25) 100%)',
            backdropFilter: 'blur(25px) saturate(180%)',
            WebkitBackdropFilter: 'blur(25px) saturate(180%)',
            border: `1px solid ${isDark ? alpha('#C4B66F', 0.4) : alpha('#051814', 0.25)}`,
            borderRadius: '50px',
            p: '8px',
            boxShadow: `0 15px 50px ${alpha(isDark ? '#C4B66F' : '#051814', 0.2)},
                       inset 0 1px 1px ${alpha(isDark ? '#FFFFFF' : '#051814', 0.1)}`,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backdropFilter: 'blur(30px) saturate(200%)',
              WebkitBackdropFilter: 'blur(30px) saturate(200%)',
              border: `1px solid ${isDark ? alpha('#C4B66F', 0.6) : alpha('#051814', 0.35)}`,
              boxShadow: `0 20px 60px ${alpha(isDark ? '#C4B66F' : '#051814', 0.3)},
                         inset 0 1px 1px ${alpha(isDark ? '#FFFFFF' : '#051814', 0.15)}`,
            },
          }}
        >
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email for Early Access"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'transparent',
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
                '& input::placeholder': {
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(5,24,20,0.7)',
                  opacity: 1,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  transition: 'color 0.3s ease',
                },
              },
              '& .MuiInputBase-input': {
                color: isDark ? '#FFFFFF' : '#051814',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                paddingLeft: '20px',
                transition: 'color 0.3s ease',
              },
            }}
            InputProps={{
              sx: {
                borderRadius: '50px',
                height: { xs: '50px', sm: '56px' },
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !email}
            sx={{
              minWidth: { xs: '120px', sm: '140px' },
              height: { xs: '50px', sm: '56px' },
              background: isDark 
                ? 'linear-gradient(45deg, #C4B66F 10%, #44A08D 90%)'
                : lokiGradient,
              color: isDark ? '#051814' : '#C4B66F',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderRadius: '50px',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-3px) scale(1.02)',
                boxShadow: `0 15px 30px ${alpha(isDark ? '#C4B66F' : '#051814', 0.4)}`,
                background: isDark 
                  ? 'linear-gradient(45deg, #D4C67F 10%, #54B09D 90%)'
                  : 'linear-gradient(135deg, #051814 0%, #1F4B3E 100%)',
              },
              '&:active': {
                transform: 'translateY(-1px) scale(1.01)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Join'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroVideoSection;
