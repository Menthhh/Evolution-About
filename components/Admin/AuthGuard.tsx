'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode; // Components to render if authenticated
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${baseUrl}/auth/check`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        console.error('Authentication failed:', err);
        router.replace('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering if not authenticated
  }

  return <>{children}</>;
};

export default AuthGuard;
