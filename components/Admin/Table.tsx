// @ts-nocheck
import React, { useState } from 'react';
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


const TableComponent = ({
  data,
  type,
  deleteItem,
  totalPages,
  currentPage,
  onPageChange,
  displayCount,
  onDisplayCountChange,
  totalItems,
  contentType
}) => {

  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');
  const router = useRouter()


  const columns = [
    { id: 'title', label: 'เนื้อหา', sortable: true },
    { id: 'date', label: 'วันที่เพิ่ม', sortable: true },
    { id: 'type', label: 'หมวดหมู่', sortable: true },
    { id: 'category', label: 'ผู้เขียน/บรรยาย', sortable: true },

  ];
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear().toString();
  
    return `${day}/${month}/${year}`;
  };
  const handlePageChange = (event, newPage) => {
    // Ensure the page number is within bounds
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(event, newPage);
    }
  };

  return (
    <Paper elevation={3} sx={{ pb: 2, bgcolor: theme.palette.gray.light }}>
      <Box p={2} sx={{borderTopLeftRadius:10, borderTopRightRadius:10}} bgcolor={theme.palette.main.main} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={1}>แสดง</Typography>
          <Select
            value={displayCount}
            onChange={(e) => onDisplayCountChange(e.target.value)}
            size="small"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Box>
        <Box>
          <Button onClick={()=>{router.push("/admin/tag")}} variant="contained" color="secondary" startIcon={<BookmarkIcon />} sx={{ mr: 1 ,borderRadius:3}}>
            แก้ไขหมวดหมู่
          </Button>
          <Button onClick={()=>{router.push("/admin/create")}} variant="contained" color="secondary" startIcon={<AddIcon />} sx={{ mr: 1 ,borderRadius:3}}>
            เพิ่มเนื้อหา
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
{ type==='books'&&        <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.bName}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>

                <TableCell>{item.catId.catName}</TableCell>
                <TableCell>{item.aId?.authorName||""}</TableCell>
                <TableCell>
                <IconButton sx={{color:theme.palette.main.main}} size="small" onClick={()=>{router.push(`/admin/update/${contentType}/${item._id}`)}}>
                <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={()=>{deleteItem(item._id,item.bName)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>}
          { type==='articles'&&        <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.artName}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>

                <TableCell>{item.catId.catName}</TableCell>
                <TableCell>{item?.lecId?.lecName||''}</TableCell>
                <TableCell>
                <IconButton sx={{color:theme.palette.main.main}} size="small"onClick={()=>{router.push(`/admin/update/${contentType}/${item._id}`)}}>
                <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={()=>{deleteItem(item._id,item.artName)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>}
          { type==='videos-podcasts'&&        <TableBody>
            {data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.vpName}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>

                <TableCell>{item.catId.catName}</TableCell>
                <TableCell>{item?.lecId?.lecName||''}</TableCell>
                <TableCell>
                  <IconButton sx={{color:theme.palette.main.main}} size="small" onClick={()=>{router.push(`/admin/update/${contentType}/${item._id}`)}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" size="small" onClick={()=>{deleteItem(item._id,item.vpName)}}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>}




        </Table>
      </TableContainer>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} px={2}>
        <Typography variant="body2" color="text.secondary">
          แสดง {Math.min(displayCount, data.length)} จาก {totalItems} รายการ
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Pagination 
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
            showFirstButton
            showLastButton
            boundaryCount={2}
            siblingCount={1}
            size="medium"
            sx={{
              '& .MuiPaginationItem-root': {
                margin: '0 4px',
              },
              '& .Mui-selected': {
                backgroundColor: theme.palette.error.main,
                color: 'white',
                '&:hover': {
                  backgroundColor: theme.palette.error.dark,
                }
              }
            }}
          />
        </Box>
      </Box>
      

      </Box>
    </Paper>
  );
};

export default TableComponent;