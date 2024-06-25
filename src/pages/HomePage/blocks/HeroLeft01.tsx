/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from '../components/TwoSidedLayout';

export default function HeroLeft01() {
  return (
    <TwoSidedLayout>
      <Typography style={{color: "lime"}} fontSize="lg" fontWeight="lg">
        @SongifyAI
      </Typography>
      <Typography
        level="h1"
        fontWeight="xl"
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Explore New Sounds
      </Typography>
      <Typography fontSize="lg" textColor="text.secondary" lineHeight="lg">
        Discover the Perfect Soundtrack for You – Instant, Personalized Music Recommendations Powered by AI!
      </Typography>
      <Link href="messages">
        <Button style={{backgroundColor: "lime"}} size="lg" endDecorator={<ArrowForward fontSize="xl" />}>
          Get Started
        </Button>
      </Link>
      <Typography>
        Already a member? <Link style={{color: "lime"}} href="login" fontWeight="lg">Sign in</Link>
      </Typography>
      <Typography
        level="body-xs"
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        
      </Typography>
    </TwoSidedLayout>
  );
}
