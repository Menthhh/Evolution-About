// @ts-nocheck
"use client";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Cardboard from "./Cardboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DescriptionIcon from "@mui/icons-material/Description";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { theme } from "@/theme/index";
import RecommendBox from "./RecommendBox";
import SearchIcon from "@mui/icons-material/Search";
import TableComponent from "./Table";
import { Article } from "@/types/Article.type";
import { Book } from "@/types/Book.type";
import { ArticleResponse, BookResponse, Category, Video, VideoResponse } from "@/types/Type";
import useAPI from "@/hook/useApi";
import RecommendSection from "./RecommendSection";
import Swal from "sweetalert2";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import LogoutIcon from '@mui/icons-material/Logout';
import {


  Add as AddIcon
} from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import { useRouter } from "next/navigation";

function Dashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter()
  const api = useAPI(process.env.NEXT_PUBLIC_BASE_URL);
  const [displayCount,setDisplayCount] = useState(10)

  const [pageCount,setPageCount]=useState(1)
  const [bookPage, setBookPage] = useState(1);
  const [recBookTotalPage,setrecBookTotalPage]=useState(1)

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [totalPagesRecBook, setTotalPagesRecBook] = useState(1);
  const [currentPageRecBook, setCurrentPageRecBook] = useState(1);
  const [totalItemsRecBook, setTotalItemsRecBook] = useState(0);

  const [totalPagesRecArt, setTotalPagesRecArt] = useState(1);
  const [currentPageRecArt, setCurrentPageRecArt] = useState(1);
  const [totalItemsRecArt, setTotalItemsRecArt] = useState(0);
const [recArt,setRecArt]=useState([])

const [totalPagesRecVid, setTotalPagesRecVid] = useState(1);
const [currentPageRecVid, setCurrentPageRecVid] = useState(1);
const [totalItemsRecVid, setTotalItemsRecVid] = useState(0);
const [recVid,setRecVid]=useState([])


  const [contentType,setContentType] = useState("books")
  const [recBook, setRecBook] = useState<BookResponse>([]);   
  const [category,setCategory] = useState<Category[]>([])
  const [authorList,setAuthorList]=useState([])
  const [lecturerList,setLecturerList]=useState([])
  const [totalContent,setTotalContent]=useState()
  const [bookData, setBookData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchCat, setSearchCat] = useState("");
  const [searchLec, setSearchLec] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const clearSearchFilters = () => {
    setSearch("");
    setSearchAuthor("");
    setSearchLec("");
    setSearchCat("");
    setDisplayCount(10);
    setPageCount(null);
  };
  const fetchData = async () => {
    try {
      // Fetch static data
      const [categoryData, lecturerData, authorData,totalContentData,recBookData,recArtData,recVidData] = await Promise.all([
        api.get("/categories"),
        api.get("/lecturers"),
        api.get("/authors"),
        api.get("/admin/content-counts"),
        api.get(`/books/get-recommended-contents?page=${currentPageRecBook}&limit=5`),
        api.get(`/articles/get-recommended-contents?page=${currentPageRecArt}&limit=5`),
        api.get(`/videos-podcasts/get-recommended-contents?page=${currentPageRecVid}&limit=5`)
      ]);
  
      // Construct search parameters
      const searchParams = new URLSearchParams();
      
      // Only add parameters if they have values
      const contentTypeName = contentType==='books'?"bName":contentType==='articles'?"artName":"vpName"
      if (search) searchParams.append(contentTypeName, search);
      if (searchAuthor && contentType==="books") searchParams.append('author', searchAuthor);
      if (searchLec && (contentType==="articles"|| contentType==='videos-podcasts')) searchParams.append('lecName', searchAuthor);
      if (searchCat) searchParams.append('catName', searchCat);
      if (displayCount) searchParams.append('limit', displayCount.toString());
      if (currentPage) searchParams.append('page', currentPage.toString());
  

  
      // Fetch books with constructed URL
      const contentData = await api.get(`/${contentType}/search?${searchParams.toString()}`);
      // Update state
      setCategory(categoryData.data);
      setAuthorList(authorData.data);
      setLecturerList(lecturerData.data);
      setBookData(contentData.data);
      setTotalContent(totalContentData.data);
      setRecBook(recBookData.data);
      setTotalPagesRecBook(recBookData.pagination.total_pages)
      setTotalItemsRecBook(recBookData.pagination.total_items)
      setRecArt(recArtData.data)
      setTotalPagesRecArt(recArtData.pagination.total_pages)
      setTotalItemsRecArt(recArtData.pagination.total_items)

      setRecVid(recVidData.data)
      setTotalPagesRecVid(recVidData.pagination.total_pages)
      setTotalItemsRecVid(recVidData.pagination.total_items)



      setTotalPages(contentData.pagination.total_pages || 1);
      setTotalItems(contentData.pagination.total_items || 0);
      

  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePageChange = async (event, newPage) => {
    setCurrentPage(newPage);
    try {
      const searchParams = new URLSearchParams();
      const contentTypeName = contentType === 'books' ? "bName" : contentType === 'articles' ? "artName" : "vpName";
      
      if (search) searchParams.append(contentTypeName, search);
      if (searchAuthor && contentType === "books") searchParams.append('author', searchAuthor);
      if (searchLec && (contentType === "articles" || contentType === 'videos-podcasts')) searchParams.append('lecName', searchLec);
      if (searchCat) searchParams.append('catName', searchCat);
      if (displayCount) searchParams.append('limit', displayCount.toString());
      searchParams.append('page', newPage.toString());
  
      const contentData = await api.get(`/${contentType}/search?${searchParams.toString()}`);
      setBookData(contentData.data);
      setTotalPages(contentData.pagination.total_page || 1);
      setTotalItems(contentData.pagination.total_items || 0);
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };
  // Handle items per page change
  const handleDisplayCountChange = (value) => {
    setDisplayCount(value);
    setCurrentPage(1); // Reset to first page when changing display count
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, displayCount, search, searchAuthor, searchCat, searchLec, contentType,currentPageRecBook,currentPageRecArt,currentPageRecVid]);

useEffect(()=>{
  clearSearchFilters()
},[contentType])
  const deleteAllCookies = () => {
    deleteCookies()
};
const removeRecommendItem=async (id:number,type:string)=>{
  const formData = new FormData();
  formData.append('artName', '');
  formData.append('content', '');
  formData.append('description', '');
  formData.append('isRec', 'false'); 
  formData.append('catId', '');
  formData.append('lecId', '');
  formData.append('cover', '');
  formData.append('file', '');
  
  try {
    // Use the patch method from useAPI
    const data = await api.patch(`/${type}/${id}`, formData);
  } catch (error) {
    console.error('Error updating article:', error);
  }
  // updateArticle('672ce2d8330e1d876859c397');
  fetchData();
}
  const handleLogout = async() => { 
    const response = await fetch(`${baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
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
        const response = await api.del(`/${contentType}/${id}`)// Ensure this returns a promise
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
    <Box mx={10} mt={20} >
              <Box display='flex' justifyContent='end' mb={4}>
          <Button onClick={()=>{router.push("/admin/contact")}} variant="contained" color="secondary" startIcon={<CallIcon />} sx={{ mr: 1 ,borderRadius:3}}>
            แก้ไขโปรไฟล์
          </Button>
          <Button onClick={()=>{router.push("/admin/banner")}} variant="contained" color="secondary" startIcon={<ViewCarouselIcon />} sx={{ mr: 1 ,borderRadius:3}}>
            เแก้ไข Banner
        </Button>
        <Button onClick={() => {
          handleLogout();
         router.push("/admin/login")
        }} variant="outlined" color="secondary" startIcon={<LogoutIcon />} sx={{ mr: 1, borderRadius: 3 }}>
            Log out
          </Button>
        </Box>
      <Box display="flex" justifyContent="center"  gap={4}>
        
      <Cardboard
          Icon={BookmarkIcon}
          total={totalContent?.total?.allContent}
          unit={"ทั้งหมด"}
        />
        <Cardboard
          Icon={AutoStoriesIcon}
          total={totalContent?.total?.books}
          unit={"เล่ม"}
        />
        <Cardboard
          Icon={DescriptionIcon}
          total={totalContent?.total?.articles}
          unit={"บทความ"}
        />
        <Cardboard
          Icon={VideoLibraryIcon}
          total={totalContent?.total?.podcasts+totalContent?.total?.videos}
          unit={"คลิป"}
        />

      </Box>
      <Box my={4}>
        <Typography
          variant="heading2"
          sx={{ color: theme.palette.secondary.main }}
        >
          เนื้อหาแนะนำ
        </Typography>
      </Box>
      <Box display="flex" gap={5}>
      <RecommendSection
  title="หนังสือ"
  recommend={recBook}
  total={totalPagesRecBook}
  totalItem={totalItemsRecBook}
  currentPage={currentPageRecBook}
  setPage={setCurrentPageRecBook}
  limit={5}
  type="books"
  removeItem={removeRecommendItem}
/>
        <RecommendSection
          title={"บทความ"}
          recommend={recArt}
          total={totalPagesRecArt}
          currentPage={currentPageRecArt}
          setPage={setCurrentPageRecArt}
          limit={5}
          type="articles"
          removeItem={removeRecommendItem}
        />
        <RecommendSection
          title={"พอดแคสต์/วิดีโอ"}
          recommend={recVid}
          total={totalPagesRecVid}
          currentPage={currentPageRecVid}
          setPage={setCurrentPageRecVid}
          limit={5}
          type="videos-podcasts"
          removeItem={removeRecommendItem}
        />
      </Box>
      <Box my={4}>
        <Typography
          variant="heading2"
          sx={{ color: theme.palette.secondary.main }}
        >
          เนื้อหาทั้งหมด
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <OutlinedInput
                onChange={(e)=>{setSearch(e.target.value);}}
                placeholder="ค้นหา"
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>


            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ประเภท</InputLabel>
              <Select
              onChange={(e)=>{setContentType(e.target.value)}}
                value={contentType}
              >
                <MenuItem value={"books"}>หนังสือ</MenuItem>
                <MenuItem value={"articles"}>บทความ</MenuItem>
                <MenuItem value={"videos-podcasts"}>วิดีโอ/พอดเเคสต์</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>หมวดหมู่</InputLabel>
              <Select label="Age" onChange={(e)=>{setSearchCat(e.target.value)}}>
                {category.map((item)=>{
                  return(
                    <MenuItem value={item.catName}>{item.catName}</MenuItem>
                  )
                
                })}
              </Select>
            </FormControl>
          </Grid>
          {contentType==="books"?(          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">ผู้เขียน</InputLabel>
              <Select
              onChange={(e)=>{setSearchAuthor(e.target.value)}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
              >{authorList.map((item)=>{
                return(
                  <MenuItem value={item.authorName}>{item.authorName}</MenuItem>

                )
              })}
              </Select>
            </FormControl>
          </Grid>):(
                      <Grid item xs={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">ผู้บรรยาย</InputLabel>
                        <Select
                        onChange={(e)=>{setSearchLec(e.target.value)}}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                        >
                          {lecturerList.map((item)=>{
                return(
                  <MenuItem value={item.lecName}>{item.lecName}</MenuItem>

                )
              })}
   
                        </Select>
                      </FormControl>
                    </Grid>
          )}




        </Grid>
      </Box>
      <TableComponent 
      data={bookData} 
      type={contentType} 
      deleteItem={deleteModal}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      displayCount={displayCount}
      onDisplayCountChange={handleDisplayCountChange}
      totalItems={totalItems}
      contentType={contentType}
    />
    </Box>
  );
}

export default Dashboard;
