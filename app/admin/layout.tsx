"use client";
import { Box } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/index';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Box 
        data-admin-layout
        sx={{ 
          backgroundColor: 'white !important', 
          minHeight: '100vh',
          width: '100%'
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
}
