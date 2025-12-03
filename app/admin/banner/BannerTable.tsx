// @ts-nocheck

import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box,
  Pagination,
  TableSortLabel
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import StarsIcon from '@mui/icons-material/Stars';
import { theme } from '@/theme/index';
import { useRouter } from "next/navigation";
import useAPI from '@/hook/useApi';
import Swal from 'sweetalert2';


const BannerTableComponent = ({setOpenModal,setSelectedBanner,selectedBanner}) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [page,setPage] = useState(1)
  const [categories,setCategories] = useState([])
  const router = useRouter()
  const api = useAPI(process.env.NEXT_PUBLIC_BASE_URL);
  const fetchData = async() =>{
    const bannerData = await api.get(`/banners?page=${page}&limit=${displayCount}`)
    setCategories(bannerData)
  }

useEffect(()=>{fetchData()},[])
  const columns = [
    { id: 'catName', label: 'ชื่อ', sortable: true },
    { id: 'description', label: 'วันทีเพิ่ม', sortable: true },
    
  ];
  const editModal=(mode,pname?,des?,id?)=>{
    Swal.fire({
        title: "เพิ่ม Banner",
        html: `
            <input
                type="text"
                id="swal-input-name"
                class="swal2-input"
                placeholder="ชื่อ Banner">
            <input
                type="file"
                id="swal-input-file"
                class="swal2-file"
                accept="image/*">
        `,
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        didOpen: () => {
            document.getElementById("swal-input-name").value = pname || "";
        },
        preConfirm: async () => {
            const name = document.getElementById("swal-input-name").value;
            const fileInput = document.getElementById("swal-input-file");
            const file = fileInput.files[0];
            
            const formData = new FormData();
            formData.append("bannerName", name || "");
            
            if (!name) {
                Swal.showValidationMessage("กรุณาใส่ชื่อ");
                return;
            }
            
            if (!file) {
                Swal.showValidationMessage("กรุณาเลือกไฟล์");
                return;
            }
            
            formData.append("banner", file);
            try{
                const response = await api.post('/banners',formData)
                 if (!response || response.statusCode !== 201 && response.statusCode !== 200) {
                            throw new Error("Invalid response");
                          }
                          return response.data; // Pass data to `.then()`
                        } catch (error) {
                          Swal.showValidationMessage(`Request failed: ${error.message}`);
                          return false; // Prevent further execution
                        }
            
        },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        fetchData();
        Swal.fire({
          title: `${mode==="create"?'เพิ่ม':'แก้ไข'}สำเร็จ`,
          icon: "success",
          draggable: true,
        });
      }
    });
    
  }
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear().toString();
  
    return `${day}/${month}/${year}`;
  };
  
  const deleteModal=(id,title)=>{
    Swal.fire({
      title: `ยืนยันการลบ ${title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      preConfirm: async () => {
        try {
          const response = await api.del(`/banners/${id}`)// Ensure this returns a promise
          if (!response || response.statusCode !== 200) {
            throw new Error("Invalid response");
          }
          return response.data; // Pass data to `.then()`
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
          return false; // Prevent further execution
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetchData()
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ!",
          icon: "success"
        });
      }
    });
  }
  
  

  return (
    <Paper elevation={3} sx={{ pb: 2,bgcolor:theme.palette.gray.light }}>
      <Box p={2} sx={{borderTopLeftRadius:10,borderTopRightRadius:10}} bgcolor={theme.palette.main.main} display="flex" justifyContent="space-between" alignItems="center" mb={2}>

                <Box>
                  <Button onClick={()=>{editModal("create")}} variant="contained" color="secondary" startIcon={<AddIcon />} sx={{ mr: 1 ,borderRadius:3}}>
                    เพิ่ม Banner
                  </Button>
                </Box>
      </Box>
      <Box px={2}>
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.sortable ? (
                    <TableSortLabel
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {categories?.data?.map((item, index) => (
    <TableRow 
      key={item.id}
      hover
      onClick={() => {setSelectedBanner(item._id);}}
      sx={{ 
        cursor: 'pointer',
        bgcolor: selectedBanner === item._id ? theme.palette.gray.main : 'inherit',
        '&:hover': {
          bgcolor: theme.palette.gray.light,
        }
      }}
    >
      <TableCell>{index + 1}</TableCell>
      <TableCell>{item.bannerName}</TableCell>
      <TableCell>{formatDate(item.createdAt)}</TableCell>
      <TableCell>
        <IconButton 
          color="error" 
          size="small" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent row click when clicking delete button
            deleteModal(item._id, item.bannerName);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </TableContainer>
      



      </Box>
    </Paper>
  );
};

export default BannerTableComponent;