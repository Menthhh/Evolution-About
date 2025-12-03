// @ts-nocheck
"use client";
import TagTableComponent from "@/components/Admin/EditTagTable";
import { theme } from "@/theme/index";
import {
  Box,
  Button,
  InputLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import AddIcon from "@mui/icons-material/Add";
import useAPI from "@/hook/useApi";
import Swal from "sweetalert2";
import AuthGuard from "@/components/Admin/AuthGuard";

function page() {
  const [openCrate, setOpenCreate] = useState(false);
  const [contact, setContact] = useState(null);
  const [fbName, setFbName] = useState(null);
  const [igName, setIgName] = useState(null);
  const [ytName, setYtname] = useState(null);
  const [fbLink, setFbLink] = useState(null);
  const [igLink, setIglink] = useState(null);
  const [ytLink, setYtLink] = useState(null);
  const [linkTree, setLinkTree] = useState(null);
  const [aboutUs, setAboutUs] = useState(null);

  function findByKey(data, searchKey) {
    const dataArray = Array.isArray(data) ? data : [data];
    return dataArray.find((item) => item.key === searchKey) || null;
  }

  const api = useAPI(process.env.NEXT_PUBLIC_BASE_URL);
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

  const fetctData = async () => {
    const contactData = await api.get("/social-media");
    setContact(contactData.data);
    setFbName(findByKey(contactData.data, "fb").name);
    setFbLink(findByKey(contactData.data, "fb").info);
    setIgName(findByKey(contactData.data, "ig").name);
    setIglink(findByKey(contactData.data, "ig").info);
    setYtname(findByKey(contactData.data, "yt").name);
    setYtLink(findByKey(contactData.data, "yt").info);
    setLinkTree(findByKey(contactData.data, "linktree").info);
    setAboutUs(findByKey(contactData.data, "about").info);
  };

  useEffect(() => {
    fetctData();
  }, []);

  const handleSave = async () => {
    let formData = {};
    api.put("/social-media/676ecc5751f8c015931f14c0",formData)

  
    contact.map((c) => {
      if (c.key === "ig") {
        formData = {
          key: "ig",
          info: igLink,
          name: igName,
        };
      } else if (c.key === "fb") {
        formData = {
          key: "fb",
          info: fbLink,
          name: fbName,
        };
      } else if (c.key === "yt") {
        formData = {
          key: "yt",
          info: ytLink,
          name: ytName,
        };
      } else if (c.key === "linktree") {
        formData = {
          key: "linktree",
          info: linkTree,
          name: "",
        };
      } else if (c.key === "about") {
        formData = {
          key: "about",
          info: aboutUs,
          name: "",
        };
      }

      try {
        api.put(`/social-media/${c._id}`, formData);
        Swal.fire({
                title: `บันทึกข้อมูลสำเร็จ`,
                icon: "success",
                draggable: true,
              });
        
      } catch (error) {
        console.log(error);
        Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: `ไม่สามารถ${isUpdating ? 'อัปเดต' : 'บันทึก'}ข้อมูลได้`,
                icon: "error",
              });
      }
    });
  };

  return (
<AuthGuard> 
    <Box m={10} mt={20}>
      <Typography
        variant="heading2"
        sx={{ mb: 3, color: theme.palette.secondary.main }}
      >
        แก้ไขโปรไฟล์
      </Typography>

      <Stack width="50%" gap={3}>
        <Stack gap={5}>
          <Typography variant="heading5">Facebook</Typography>
          <TextField
            label="ชื่อ เพจ"
            value={fbName || ""}
            onChange={(e) => setFbName(e.target.value)}
          />
          <TextField
            label="link เพจ"
            value={fbLink || ""}
            onChange={(e) => setFbLink(e.target.value)}
          />
        </Stack>
        <Stack gap={5}>
          <Typography variant="heading5">Instagram</Typography>
          <TextField
            label="ชื่อ Instagram"
            value={igName || ""}
            onChange={(e) => setIgName(e.target.value)}
          />
          <TextField
            label="link Instagram"
            value={igLink || ""}
            onChange={(e) => setIglink(e.target.value)}
          />
        </Stack>
        <Stack gap={5}>
          <Typography variant="heading5">Youtube</Typography>
          <TextField
            label="ชื่อ Youtube"
            value={ytName || ""}
            onChange={(e) => setYtname(e.target.value)}
          />
          <TextField
            label="link Youtube"
            value={ytLink || ""}
            onChange={(e) => setYtLink(e.target.value)}
          />
        </Stack>
        <Stack gap={5}>
          <Typography variant="heading5">linktree</Typography>
          <TextField
            label="linktree"
            value={linkTree || ""}
            onChange={(e) => setLinkTree(e.target.value)}
          />
        </Stack>

        <Box gap={5}>
          <Typography variant="heading5">About Us</Typography>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            multiline
            rows={10}
            maxRows={15}
            value={aboutUs || ""}
            onChange={(e) => setAboutUs(e.target.value)}
          />
        </Box>
        <Box width="20%" display="flex" justifyContent="start">
          <Button
            variant="contained"
            sx={{ bgcolor: theme.palette.main.main }}
            onClick={handleSave}
          >
            บันทึก
          </Button>
        </Box>
      </Stack>
    </Box>
   </AuthGuard>
  );
}

export default page;
