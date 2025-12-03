// @ts-nocheck
"use client";
import TagTableComponent from "@/components/Admin/EditTagTable";
import { theme } from "@/theme/index";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddIcon from '@mui/icons-material/Add';

function page() {
  const [openCrate, setOpenCreate] = useState(false);
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
    <Box m={10} mt={20}>
      <Typography
        variant="heading2"
        sx={{ mb: 3, color: theme.palette.secondary.main }}
      >
        แก้ไขหมวดหมู่
      </Typography>
      <TagTableComponent setOpenModal={setOpenCreate} />
      <Modal
        open={openCrate}
        onClose={() => {
          setOpenCreate(false);
        }}
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
            <Button startIcon={<AddIcon/>} variant="contained" sx={{bgcolor:theme.palette.main.main}}>เพิ่มหมวดหมู่</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default page;
