import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { fetchVideos } from "../services/api";

const CategoryPage = () => {
  const { category } = useParams();
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const fetchedVideos = await fetchVideos();
        setFilteredVideos(
          fetchedVideos.filter(
            (video) => video.category.toLowerCase() === category.toLowerCase()
          )
        );
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    loadVideos();
  }, [category]);

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        {category.charAt(0).toUpperCase() + category.slice(1)} Videos
      </Typography>
      {filteredVideos.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            No videos available
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {filteredVideos.map((video) => (
            <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <VideoPlayer video={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategoryPage;
