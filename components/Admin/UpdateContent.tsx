// @ts-nocheck
"use client";
import { theme } from "@/theme/index";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  Checkbox,
  Divider,
  FormHelperText,
} from "@mui/material";
import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import QuillEditor from "@/components/Admin/RichText";
import { useRouter, useSearchParams } from "next/navigation";
import useAPI from "@/hook/useApi";
import Swal from "sweetalert2";
import { title } from "process";
const QuillEditorComponent = dynamic(
  () => import('@/components/Admin/RichText').then(mod => mod.default), 
  {
    ssr: false,
    loading: () => <p>Loading editor...</p>
  }
);
interface Category {
  _id: string;
  catName: string;
}

interface Author {
  _id: string;
  authorName: string;
}

interface Lecturer {
  _id: string;
  lecName: string;
}

interface FormErrors {
  title: string;
  category: string;
  link?: string;
  author?: string;
  lecturer?: string;
  description: string;
  content?: string;
  file?: string;
  playlist?: string;
  timeRead?: string;
}

function CreateUpdateContent({ id, type }) {
  const api = useAPI(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  const router = useRouter();
  const searchParams = useSearchParams();
  const contentId = searchParams.get("id");
  const isUpdating = Boolean(id);

  // Refs
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLSelectElement>(null);
  const lecturerRef = useRef<HTMLSelectElement>(null);
  const timeReadRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<{
    getContent: () => string;
    setContent: (content: string) => void;
  }>(null);

  // State
  const [contentType, setContentType] = useState<string>(type || "book");
  const [subjectCategories, setSubjectCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [isRecommended, setIsRecommended] = useState(false);
  const [isPlayList, setIsPlayList] = useState(false);
  const [isPodcast, setIsPodcast] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [playlistSelect, setPlaylistSelect] = useState([]);
  const [playlist, setPlaylist] = useState("");
  const [existingContent, setExistingContent] = useState(null);
  const [selectedAuthorLecturer, setSelectedAuthorLecturer] = useState("");
  const [contentEditor, setContentEditor] = useState<any>(null);

  // Form validation states
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    category: "",
    description: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const deleteModal = (id, title) => {
    Swal.fire({
      title: `ยืนยันการลบ ${title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      preConfirm: async () => {
        try {
          const response = await api.del(`/${contentType}/${id}`); // Ensure this returns a promise
          if (!response || response.statusCode !== 200) {
            throw new Error("Invalid response");
          }
          return response.data; // Pass data to `.then()`
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
          return false; // Prevent further execution
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/admin/dashboard");
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ!",
          icon: "success",
        });
      }
    });
  };
  // Fetch existing content data if updating
  const fetchExistingContent = async () => {
    if (!id) return;

    try {
      let endpoint;
      // Determine endpoint based on content type
      if (contentType === "book") endpoint = `/books/get-book/${id}`;
      else if (contentType === "article")
        endpoint = `/articles/get-article/${id}`;
      else endpoint = `/videos-podcasts/get-video-podcast/${id}`; // New endpoint for video-podcast

      const response = await api.get(endpoint);
      // Handle different response structures
      const content = contentType === "video" ? response.data : response.data;
      setExistingContent(content);

      // Populate form fields with existing data
      if (contentType === "video") {
        // Handle video/podcast specific data
        if (titleRef.current) titleRef.current.value = content.vpName;
        if (descriptionRef.current)
          descriptionRef.current.value = content.description;
        if (linkRef.current) linkRef.current.value = content.videoUrl || "";
        if (lecturerRef.current)
          lecturerRef.current.value = content.lecId?._id || "";
        setCategory(content.catId._id);
        setIsRecommended(content.isRec);
        setIsPodcast(content.isPodcast || false);

        // Handle playlist
        if (content.plId) {
          setIsPlayList(true);
          setPlaylist(content.plId._id);
        }

        // Handle cover image preview
        if (content.coverPath) {
          setCoverPreview(content.coverPath);
          const coverResponse = await fetch(content.coverPath);
          const blob = await coverResponse.blob();
          const file = new File([blob], "cover.jpg", { type: "image/jpeg" });
          setCoverFile(file);
        }

        setSelectedAuthorLecturer(content.lecId._id);
      } else {
        // Original book/article handling
        if (titleRef.current)
          titleRef.current.value = content.bName || content.artName;
        if (descriptionRef.current)
          descriptionRef.current.value = content.description;
        if (linkRef.current) linkRef.current.value = content.videoUrl || "";
        if (authorRef.current) authorRef.current.value = content.aId?._id || "";
        if (lecturerRef.current)
          lecturerRef.current.value = content.lecId?._id || "";
        if (contentType === 'article' && timeReadRef.current) {
             timeReadRef.current.value = content.timeRead || "";
        }
        console.log(content)
        setCategory(content.catId._id);
        setIsRecommended(content.isRec);
        setIsPodcast(content.isPodcast || false);
        setIsPlayList(content.isPlaylist || false);
        setPlaylist(content.plId || "");

        if (content.aId?._id) {
          setSelectedAuthorLecturer(content.aId._id);
        } else if (content.lecId?._id) {
          setSelectedAuthorLecturer(content.lecId._id);
        }

        if (content.coverPath) {
          const coverResponse = await fetch(content.coverPath);
          const blob = await coverResponse.blob();
          const file = new File([blob], "cover.jpg", { type: "image/jpeg" });
          setCoverFile(file);
          setCoverPreview(content.coverPath);
        }

        if (content.filePath) {
          const fileResponse = await fetch(content.filePath);
          const blob = await fileResponse.blob();
          const file = new File([blob], "document.pdf", {
            type: "application/pdf",
          });
          setUploadedFile(file);
        }

        if (!contentEditor && content.content) {
          setContentEditor(content.content);
        }
      }
    } catch (error) {
      console.error("Error fetching existing content:", error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถดึงข้อมูลเนื้อหาได้",
        icon: "error",
      });
    }
  };

  // Fetch initial data
  const fetchInitialData = async () => {
    try {
      const [categoryData, authorData, lecturerData, playlistData] =
        await Promise.all([
          api.get("/categories"),
          api.get("/authors"),
          api.get("/lecturers"),
          api.get("/playlists"),
        ]);
      setPlaylistSelect(playlistData?.data || []);
      setSubjectCategories(categoryData?.data || []);
      setAuthors(authorData?.data || []);
      setLecturers(lecturerData?.data || []);
    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
    if (id) {
      fetchExistingContent();
    }
  }, [id]);

  useEffect(() => {
    if (existingContent && contentType === "article" && timeReadRef.current) {
      timeReadRef.current.value = existingContent.timeRead || "";
    }
  }, [existingContent, contentType]);

  // Form validation
  const validateForm = () => {
    const newErrors: FormErrors = {
      title: "",
      category: "",
      description: "",
    };

    // Title validation
    if (!titleRef.current?.value.trim()) {
      newErrors.title = "กรุณากรอกชื่อเนื้อหา";
    }

    // Category validation
    if (!category) {
      newErrors.category = "กรุณาเลือกหมวดหมู่";
    }

    // Description validation
    if (!descriptionRef.current?.value.trim()) {
      newErrors.description = "กรุณากรอกคำอธิบาย";
    }

    // Content type specific validation
    if (contentType === "video") {
      if (!linkRef.current?.value.trim()) {
        newErrors.link = "กรุณากรอกลิงก์ Youtube";
      } else if (
        !linkRef.current.value.includes("youtube.com") &&
        !linkRef.current.value.includes("youtu.be")
      ) {
        newErrors.link = "กรุณากรอกลิงก์ Youtube ที่ถูกต้อง";
      }
    }

    if (isPlayList && !playlist) {
      newErrors.playlist = "กรุณาเลือกเพลย์ลิสต์";
    }

    if (contentType === "book") {
      if (!selectedAuthorLecturer) {
        newErrors.author = "กรุณาเลือกผู้เขียน";
      }
      if (!uploadedFile && !existingContent?.filePath) {
        newErrors.file = "กรุณาอัพโหลดไฟล์";
      }
    }

    if (contentType === "article" || contentType === "video") {
      if (!selectedAuthorLecturer) {
        newErrors.lecturer = "กรุณาเลือกผู้บรรยาย";
      }
      if (!contentEditor&& contentType === "article") {
        newErrors.content = "กรุณากรอกเนื้อหาบทความ";
      }
      if (contentType === "article" && !timeReadRef.current?.value.trim()) {
        newErrors.timeRead = "กรุณาระบุเวลาในการอ่าน";
      }
    }

    setErrors(newErrors);

    // Return validation result
    return {
      isValid: Object.values(newErrors).every((error) => !error),
      errors: newErrors,
    };
  };
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  // Reset form
  const resetForm = () => {
    if (titleRef.current) titleRef.current.value = "";
    if (linkRef.current) linkRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (coverFileRef.current) coverFileRef.current.value = "";
    if (timeReadRef.current) timeReadRef.current.value = "";
    if (contentEditor) setContentEditor("");
    setContentType("book");
    setIsRecommended(false);
    setCoverFile(null);
    setCoverPreview(null);
    setUploadedFile(null);
    setCategory("");
    setTouched({});
    setErrors({
      title: "",
      category: "",
      description: "",
    });
  };

  // Submit form handler
  const submitForm = async () => {
    const validationResult = validateForm();
    if (!validationResult.isValid) {
      // Create error message from validation errors
      const errorMessages = Object.entries(validationResult.errors)
        .filter(([_, value]) => value !== "")
        .map(([field, message]) => `- ${message}`)
        .join("\n");

      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        html: errorMessages.replace(/\n/g, "<br>"),
        icon: "error",
      });
      return;
    }

    try {
      let endpoint;
      let formData;

      if (contentType === "book") {
        endpoint = isUpdating ? `/books/${id}` : "/books";
        formData = new FormData();
        formData.append("bName", titleRef.current?.value || "");
        formData.append("description", descriptionRef.current?.value || "");
        formData.append("isRec", isRecommended.toString());
        formData.append("catId", category || "");
        formData.append("aId", selectedAuthorLecturer || "");
        if (coverFile) {
          formData.append("cover", coverFile);
        }
        if (uploadedFile) {
          formData.append("file", uploadedFile);
        }
      } else if (contentType === "article") {
        endpoint = isUpdating ? `/articles/${id}` : "/articles";
        formData = new FormData();
        formData.append("artName", titleRef.current?.value || "");
        formData.append("description", descriptionRef.current?.value || "");
        formData.append("isRec", isRecommended.toString());
        formData.append("catId", category || "");
        formData.append("lecId", selectedAuthorLecturer || "");
        formData.append("content", contentEditor|| "");
        formData.append("timeRead", timeReadRef.current?.value || "");
        if (coverFile) {
          formData.append("cover", coverFile);
        }
      } else {
        endpoint = isUpdating ? `/videos-podcasts/${id}` : "/videos-podcasts";
        formData = new FormData();
        formData.append("vpName", titleRef.current?.value || "");
        formData.append("description", descriptionRef.current?.value || "");
        formData.append("isRec", isRecommended.toString());
        formData.append("catId", category || "");
        formData.append("lecId", selectedAuthorLecturer || "");
        formData.append("videoUrl", linkRef.current?.value || "");
        formData.append("isPodcast", isPodcast.toString());
        formData.append("isPlaylist", isPlayList.toString());
        formData.append("plId", playlist || "");
        if (coverFile) {
          formData.append("cover", coverFile);
        }
      }

      // Use PUT for update, POST for create
      await api.patch(endpoint, formData);

      Swal.fire({
        title: `${isUpdating ? "อัปเดต" : "บันทึก"}ข้อมูลสำเร็จ`,
        icon: "success",
        draggable: true,
      });

      if (!isUpdating) {
        resetForm();
      } else {
        router.back();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: `ไม่สามารถ${isUpdating ? "อัปเดต" : "บันทึก"}ข้อมูลได้`,
        icon: "error",
      });
    }
  };
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box display='flex' flexDirection='column' sx={{py:5, px: '10%', width: '100%' }}>
      <Typography
        variant="h2"
        sx={{ mb: 4, color: theme.palette.secondary.main }}
      >
        {isUpdating ? "แก้ไขเนื้อหา" : "เพิ่มเนื้อหา"}
      </Typography>

      <Box display="flex" gap={4} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
        <Box flex={1} display="flex" flexDirection="column" gap={3} maxWidth='50%'>
            <TextField
              inputRef={titleRef}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              label="ชื่อเนื้อหา"
              fullWidth
              error={touched.title && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              onBlur={() => handleBlur("title")}
            />
            <Box display="flex" gap={3}>
              <FormControl fullWidth>
                <InputLabel>ประเภท</InputLabel>
                <Select
                  value={contentType}
                  label="ประเภท"
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <MenuItem value="book">หนังสือ</MenuItem>
                  <MenuItem value="article">บทความ</MenuItem>
                  <MenuItem value="video">วิดีโอ/พอดเเคสต์</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                error={touched.category && Boolean(errors.category)}
              >
                <InputLabel>หมวดหมู่</InputLabel>
                <Select
                  label="หมวดหมู่"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onBlur={() => handleBlur("category")}
                >
                  {subjectCategories.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.catName}
                    </MenuItem>
                  ))}
                </Select>
                {touched.category && errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* Author / Lecturer Selection */}
            {(contentType === "book" || contentType === "article" || contentType === "video") && (
              <Box display="flex" gap={2} alignItems="flex-start">
                <FormControl
                  fullWidth
                  error={
                    touched.author &&
                    Boolean(
                      contentType === "book" ? errors.author : errors.lecturer
                    )
                  }
                >
                  <InputLabel>
                    {contentType === "book" ? "ผู้เขียน" : "ผู้บรรยาย"}
                  </InputLabel>
                  <Select
                    label={contentType === "book" ? "ผู้เขียน" : "ผู้บรรยาย"}
                    value={selectedAuthorLecturer}
                    onChange={(e) => {
                      setSelectedAuthorLecturer(e.target.value);
                      if (contentType === "book" && authorRef.current) {
                        authorRef.current.value = e.target.value;
                      } else if (lecturerRef.current) {
                        lecturerRef.current.value = e.target.value;
                      }
                    }}
                    onBlur={() =>
                      handleBlur(contentType === "book" ? "author" : "lecturer")
                    }
                  >
                    {(contentType === "book" ? authors : lecturers).map(
                      (item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {contentType === "book"
                            ? item.authorName
                            : item.lecName}
                        </MenuItem>
                      )
                    )}
                  </Select>
                  {touched.author &&
                    (contentType === "book"
                      ? errors.author
                      : errors.lecturer) && (
                      <FormHelperText>
                        {contentType === "book" ? errors.author : errors.lecturer}
                      </FormHelperText>
                    )}
                </FormControl>
                <Button
                  variant="contained"
                  sx={{ 
                    bgcolor: theme.palette.secondary.main, 
                    minWidth: 'fit-content', 
                    height: '56px' 
                  }}
                  onClick={() => router.push("/admin/author")}
                >
                  <AddIcon />
                </Button>
              </Box>
            )}

            {contentType === "article" && (
              <TextField
                inputRef={timeReadRef}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                label="เวลาในการอ่าน (เช่น 5 นาที)"
                fullWidth
                error={touched.timeRead && Boolean(errors.timeRead)}
                helperText={touched.timeRead && errors.timeRead}
                onBlur={() => handleBlur("timeRead")}
              />
            )}

            {/* Video Specific Fields */}
            {contentType === "video" && (
              <>
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={linkRef}
                  fullWidth
                  label="ลิงก์ Youtube"
                  error={touched.link && Boolean(errors.link)}
                  helperText={touched.link && errors.link}
                  onBlur={() => handleBlur("link")}
                />
                <Box display="flex" gap={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isPodcast}
                        onChange={(e) => setIsPodcast(e.target.checked)}
                      />
                    }
                    label="พอดแคสต์"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isPlayList}
                        onChange={(e) => setIsPlayList(e.target.checked)}
                      />
                    }
                    label="เพลย์ลิสต์"
                  />
                </Box>

                {isPlayList && (
                  <Box display="flex" gap={2} alignItems="flex-start">
                    <FormControl
                      fullWidth
                      error={isPlayList && touched.playlist && Boolean(errors.playlist)}
                    >
                      <InputLabel>เพลย์ลิสต์</InputLabel>
                      <Select
                        label="เพลย์ลิสต์"
                        value={playlist}
                        onChange={(e) => setPlaylist(e.target.value)}
                        onBlur={() => handleBlur("playlist")}
                      >
                        {playlistSelect.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.plName}
                          </MenuItem>
                        ))}
                      </Select>
                      {isPlayList && touched.playlist && errors.playlist && (
                        <FormHelperText error>{errors.playlist}</FormHelperText>
                      )}
                    </FormControl>
                    <Button
                      variant="contained"
                      sx={{ 
                        bgcolor: theme.palette.secondary.main, 
                        minWidth: 'fit-content', 
                        height: '56px' 
                      }}
                      onClick={() => router.push("/admin/playlist")}
                    >
                      <AddIcon />
                    </Button>
                  </Box>
                )}
              </>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={isRecommended}
                  onChange={(e) => setIsRecommended(e.target.checked)}
                />
              }
              label="เนื้อหาเเนะนำ"
            />
        </Box>

        <Box width={{ xs: '100%', md: '400px' }} flexShrink={0}>
          <Typography sx={{ mb: 2 }}>อัพโหลดหน้าปก</Typography>
          <Box
            height="300px"
            width="100%"
            border="2px dashed"
            borderColor="grey.400"
            borderRadius={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{ backgroundColor: 'grey.50' }}
          >
            {coverPreview ? (
              <Box
                component="img"
                src={coverPreview}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  background: "#ffff",
                }}
              />
            ) : (
              <Button
                component="label"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                }}
              >
                <FileUploadIcon
                  sx={{ fontSize: 80, color: "secondary.main" }}
                />
                <Typography variant="caption" color="text.secondary">
                  Upload File
                </Typography>
                <input
                  type="file"
                  ref={coverFileRef}
                  onChange={handleCoverUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </Button>
            )}
          </Box>
          {coverPreview && (
            <Button
              onClick={() => {
                setCoverFile(null);
                setCoverPreview(null);
              }}
              sx={{ mt: 1 }}
              color="error"
            >
              delete
            </Button>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box mt={4}>
        <Box width="100%">
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={descriptionRef}
            fullWidth
            label="คำอธิบาย"
            multiline
            rows={contentType === "article" ? 5 : 10}
            maxRows={15}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            onBlur={() => handleBlur("description")}
          />

          {contentType === "article" && (
            <Box mt={3}>
              <QuillEditorComponent value={contentEditor} setContent={setContentEditor}/>
              {touched.content && errors.content && (
                <FormHelperText error>{errors.content}</FormHelperText>
              )}
            </Box>
          )}

          {contentType === "book" && (
            <Box mb={3}>
              <Button
                variant="contained"
                sx={{ mt: 5, px: 4, bgcolor: theme.palette.secondary.main }}
                component="label"
              >
                <Typography color="white">อัฟโหลดไฟล์</Typography>
                <FileUploadIcon sx={{ fontSize: 20, color: "#fff" }} />
                <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
              </Button>
              {uploadedFile && (
                <Typography>ไฟล์ที่อัพโหลด: {uploadedFile.name}</Typography>
              )}
              {touched.file && errors.file && (
                <FormHelperText error>{errors.file}</FormHelperText>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            sx={{ px: 4, bgcolor: theme.palette.secondary.main }}
            onClick={() => router.back()}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            sx={{ px: 4, bgcolor: theme.palette.main.main }}
            onClick={submitForm}
          >
            บันทึก
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateUpdateContent;
