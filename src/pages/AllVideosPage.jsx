import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { fetchVideos } from "../services/api";

const AllVideosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

   useEffect(() => {
     const loadVideos = async () => {
       try {
         const fetchedVideos = await fetchVideos();
         setVideos(fetchedVideos);
         setFilteredVideos(fetchedVideos);
       } catch (error) {
         console.error("Error fetching videos:", error);
       }
     };

     loadVideos();
   }, []);

  useEffect(() => {
    setFilteredVideos(
      videos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, videos]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = filteredVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  return (
    <Box sx={{ padding: "16px" }}>
      <TextField
        label="Search Videos"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginLeft: "16px",
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "var(--primary-color)",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "var(--primary-color)",
            },
          },
          marginBottom: "16px",
        }}
      />
      <Grid container spacing={2} justifyContent="center">
        {currentVideos.map((video) => (
          <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <VideoPlayer video={video} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          count={Math.ceil(filteredVideos.length / videosPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "var(--primary-color)",
              "&:hover": {
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
              },
              "&.Mui-selected": {
                backgroundColor: "white",
                color: "var(--primary-color)",
                "&:hover": {
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AllVideosPage;
