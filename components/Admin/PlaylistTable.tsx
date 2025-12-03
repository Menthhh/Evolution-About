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


const PlaylistTableComponent = ({setOpenModal}) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [page,setPage] = useState(1)
  const [playlists,setPlaylists] = useState([])
  const router = useRouter()
  const api = useAPI(process.env.NEXT_PUBLIC_BASE_URL);
  const fetchData = async() =>{
    const playlistData = await api.get(`/playlists?page=${page}&limit=${displayCount}`)
    setPlaylists(playlistData)
  }

useEffect(()=>{fetchData()},[])
  const columns = [
    { id: 'plName', label: 'ชื่อเพลย์ลิสต์', sortable: true },
    { id: 'description', label: 'คำอธิบาย', sortable: true },
    
  ];
  const editModal=(mode,pname?,des?,id?)=>{
    Swal.fire({
      title: (mode === 'create' ? 'เพิ่ม' : 'แก้ไข') + "เพลย์ลิสต์",
      html: `
        <input id="swal-input-name" class="swal2-input" placeholder="ชื่อเพลย์ลิสต์">
        <input id="swal-input-description" class="swal2-input" placeholder="คำอธิบาย(optional)">
      `,
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      confirmButtonText: "Submit",
      showLoaderOnConfirm: true,
      didOpen: () => {
        // Set default values after the modal opens
        document.getElementById("swal-input-name").value = pname || "";
        document.getElementById("swal-input-description").value = des || "-";
      },
      preConfirm: async () => {
        const name = document.getElementById("swal-input-name").value;
        const description = document.getElementById("swal-input-description").value;
        const formData = new FormData();
        formData.append("plName", name || "");
        formData.append("description", description || "");
        if (!name) {
          Swal.showValidationMessage("กรุณาใส่ชื่อเพลย์ลิสต์");
          return;
        }
    
        try {
          const response =
          mode === 'create'
            ? await api.post(`/playlists`, formData)
            : await api.patch(`/playlists/${id}`, formData);
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
          const response = await api.del(`/playlists/${id}`)// Ensure this returns a promise
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
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={1}>แสดง</Typography>
          <Select
            value={displayCount}
            onChange={(e) => setDisplayCount(e.target.value)}
            size="small"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Box>
        <Box>
          <Button onClick={()=>{editModal("create")}} variant="contained" color="error" startIcon={<AddIcon />} sx={{ mr: 1 ,borderRadius:3}}>
            เพิ่มเพลย์ลิสต์
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
            {playlists?.data?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.plName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <IconButton sx={{color:theme.palette.main.main}} size="small" onClick={()=>{editModal("edit",item.plName,item.description,item._id)}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={()=>{deleteModal(item._id,item.plName)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          แสดง {displayCount} จาก {playlists?.metadata?.totalCount}
        </Typography>
        <Pagination count={Math.ceil(playlists?.metadata?.totalCount / displayCount)} color="error"/>
      </Box>


      </Box>
    </Paper>
  );
};

export default PlaylistTableComponent;