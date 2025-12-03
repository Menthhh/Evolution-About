// @ts-nocheck
"use client";
import TagTableComponent from "@/components/Admin/EditTagTable";
import { theme } from "@/theme/index";
import { Box, Button, Modal, TextField, Typography, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddIcon from '@mui/icons-material/Add';
import BannerTableComponent from "./BannerTable";
import useAPI from "@/hook/useApi";
import AuthGuard from "@/components/Admin/AuthGuard";

function BannerPage() {
  const [openCreate, setOpenCreate] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [selectedBannerData, setSelectedBannerData] = useState(null);
  const api = useAPI(process.env.NEXT_PUBLIC_BASE_URL);

  // Fetch banner data when selected banner changes
  useEffect(() => {
    const fetchBannerData = async () => {
      if (selectedBanner) {
        try {
          const response = await api.get(`/banners/${selectedBanner}`);
          setSelectedBannerData(response.data);
        } catch (error) {
          console.error('Error fetching banner:', error);
          setSelectedBannerData(null);
        }
      } else {
        setSelectedBannerData(null);
      }
    };

    fetchBannerData();
  }, [selectedBanner]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: `5px solid ${theme.palette.main.main}`,
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
  };

  return (
     <AuthGuard>
    <Box m={10} mt={20}>
      <Typography
        variant="heading2"
        sx={{ mb: 3, color: theme.palette.secondary.main }}
      >
        แก้ไข Banner
      </Typography>

      <Box display="flex" gap={2}>
        {/* Banner Table */}
        <Box flex={2}>
          <BannerTableComponent 
            setOpenModal={setOpenCreate} 
            setSelectedBanner={setSelectedBanner} 
            selectedBanner={selectedBanner} 
          />
        </Box>

        {/* Banner Preview */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2,
            bgcolor: theme.palette.gray.light,
            flex: 1,
            minWidth: '300px',
            maxWidth: '500px'
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.main.main }}>
            Banner Preview
          </Typography>
          
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              position: 'relative',
              backgroundColor: theme.palette.grey[100],
              borderRadius: 1,
              overflow: 'hidden',
              border: `1px solid ${theme.palette.grey[300]}`
            }}
          >
            {selectedBannerData?.imageUrl ? (
              <Box
                component="img"
                src={selectedBannerData.imageUrl}
                alt={selectedBannerData.bannerName || "Banner preview"}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography color="text.secondary">
                  {selectedBanner ? 'Loading...' : 'No banner selected'}
                </Typography>
              </Box>
            )}
          </Box>

          {selectedBannerData && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {selectedBannerData.bannerName}
              </Typography>
              {selectedBannerData.description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {selectedBannerData.description}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      </Box>

      {/* Create Modal */}
      <Modal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={4}
            alignItems="center"
          >
            <Box textAlign='center'>
              <Typography
                variant="heading4"
                sx={{ color: theme.palette.secondary.main }}
              >
                เพิ่มหมวดหมู่
              </Typography>
              <BookmarkAddIcon
                sx={{ fontSize: 90, color: theme.palette.main.main }}
              />
            </Box>
            
            <TextField size="small" label="ชื่อหมวดหมู่ (ภาษาอาหรับ)"/>
            <TextField size="small" label="ชื่อหมวดหมู่ (ภาษาไทย)"/>
            <Button 
              startIcon={<AddIcon/>} 
              variant="contained" 
              sx={{bgcolor: theme.palette.main.main}}
            >
              เพิ่มหมวดหมู่
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
    </AuthGuard>
     
  );
}

export default BannerPage;