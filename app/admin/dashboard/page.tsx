'use client'
import Admin from '@/components/Admin'
import useAPI from '@/hook/useApi'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress, Box } from '@mui/material'

function Page() {
  // TODO: Enable authentication when backend is ready

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
    )
  }

  if (!isAuthenticated) {
    return null 
  }


  return <Admin />
}

export default Page