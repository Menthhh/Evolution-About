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


const AuthorTableComponent = ({setOpenModal}) => {
  const api = useAPI(process.env.NEXT_PUBLIC_BASE_URL);

  const [displayCount, setDisplayCount] = useState(10);
  const [countPage,setCountPage]=useState(1)
  const [page,setPage]=useState('authors');
  const [authors,setAuthors]=useState([])
  const [lecturers,setLecturers]=useState([])
  const [totalAuthor,setTotalAuthor]=useState(0)
  const [totalLec,setTotalLec]=useState(0)




  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const router = useRouter()



  const fetchInitialData = async () => {
    try {
      const [authorData, lecturerData,totalItem] = await Promise.all([
        api.get("/authors"),
        api.get(`/lecturers?page=${countPage}&limit=${displayCount}`),
        api.get('/admin/content-counts')
      ]);
      setAuthors(authorData?.data || []);
      setLecturers(lecturerData?.data || []);
      setTotalAuthor(Number(authorData?.metadata?.totalCount) || 0)
      setTotalLec(Number(lecturerData?.metadata?.totalCount) || 0)

      
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  };
useEffect(()=>{
  fetchInitialData()
},[displayCount,countPage])
  const columns = [
    { id: 'title', label: 'ชื่อผู้เขียน', sortable: true },
    { id: 'date', label: 'คำอธิบาย', sortable: true },
    { id: 'category', label: 'วันที่เพิ่ม', sortable: true },
    { id: 'type', label: 'วันที่เเก้ไข', sortable: true },

    
  ];
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear().toString();
  
    return `${day}/${month}/${year}`;
  };
  
const editModal=(mode,type,pname?,des?,id?)=>{
  Swal.fire({
    title: (mode === 'create' ? 'เพิ่ม' : 'แก้ไข') + (type === 'authors' ? 'ผู้เขียน' : 'ผู้บรรยาย'),
    html: `
      <input id="swal-input-name" class="swal2-input" placeholder="ชื่อ">
      <input id="swal-input-description" class="swal2-input" placeholder="คำอธิบาย(optional)">
    `,
    confirmButtonColor: "#3085d6",
    showCancelButton: true,
    confirmButtonText: "Submit",
    showLoaderOnConfirm: true,
    didOpen: () => {
      // Set default values after the modal opens
      document.getElementById("swal-input-name").value = pname || "";
      document.getElementById("swal-input-description").value = des || "";
    },
    preConfirm: async () => {
      const name = document.getElementById("swal-input-name").value;
      const description = document.getElementById("swal-input-description").value;
      const formData = new FormData();
      formData.append(type === 'authors' ? "authorName" : "lecName", name || "");
      formData.append("description", description || "");
      if (!name) {
        Swal.showValidationMessage("กรุณาใส่ชื่อ");
        return;
      }
  
      try {
        const response =
        mode === 'create'
          ? await api.post(`/${type}`, formData)
          : await api.patch(`/${type}/${id}`, formData);
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
      fetchInitialData();
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
        const response = await api.del(`/${page}/${id}`)// Ensure this returns a promise
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
      fetchInitialData()
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
        <Box display='flex' alignItems="center" mr={3}>
          <Typography variant="body1" mr={1}>แสดง</Typography>
          <Select
            value={page}
            size="small"
            onChange={(e)=>{setPage(e.target.value)}}
          >
            <MenuItem value={"authors"}>ผู้เขียน</MenuItem>
            <MenuItem value={"lecturers"}>ผู้บรรยาย</MenuItem>

          </Select>
          </Box>
          <Box display='flex' alignItems="center" mr={3}>
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


          
        </Box>
        
        <Box>
          <Button onClick={()=>{editModal('create','authors')}} variant="contained" color="error" startIcon={<AddIcon />} sx={{ mr: 1 ,borderRadius:3}}>
            เพิ่มผู้เขียน
          </Button>
          <Button onClick={()=>{editModal('create','lecturers')}} variant="contained" color="error" startIcon={<AddIcon />} sx={{ mr: 1 ,borderRadius:3}}>
            เพิ่มผู้บรรยาย
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
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
  
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
            {(page==='authors'?authors:lecturers).map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{page==='authors'? item.authorName:item.lecName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{formatDate(item.updatedAt)}</TableCell>
 
                <TableCell>
                  <IconButton sx={{color:theme.palette.main.main}} size="small"  onClick={()=>{editModal('edit','authors',page==='authors'? item.authorName:item.lecName,item.description,item._id)}}>
                    <EditIcon />
                  </IconButton >
                  <IconButton color="error" size="small" onClick={()=>{deleteModal(item._id,page==='authors'? item.authorName:item.lecName)}}>
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
          แสดง {page==='authors'?displayCount>totalAuthor?totalAuthor:displayCount:displayCount>totalLec?totalLec:displayCount}  จาก {page==='authors'?totalAuthor:totalLec}
        </Typography>
        <Pagination count={Math.ceil((page==='authors'?totalAuthor:totalLec) / displayCount)} color="error"/>
      </Box>
      

      </Box>
      
    </Paper>
  );
};

export default AuthorTableComponent;