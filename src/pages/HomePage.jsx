import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import VideoPlayer from "../components/VideoPlayer";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { fetchVideos } from "../services/api";

const HomePage = () => {
  const [videoData, setVideoData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await fetchVideos();
        setVideoData(videos);
      } catch (error) {
        setError("Failed to load videos");
        console.error("Error loading videos:", error);
      }
    };

    loadVideos();
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 4 }}
      >
        <Grid size={12} marginTop={4}>
          <h2>Featured Videos</h2>
        </Grid>
        {videoData.slice(0, 4).map((video) => (
          <Grid key={video.id} size={{ xs: 12, sm: 6, md: 6 }}>
            <VideoPlayer video={video} />
          </Grid>
        ))}
        <Grid size={12} sx={{ textAlign: "center", marginTop: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/videos"
            sx={{
              marginLeft: "16px",
              color: "var(--primary-color)",
              backgroundColor: "var(--primary-color-light)",
              "&:hover": {
                backgroundColor: "var(--primary-color-light)",
              },
            }}
          >
            See More
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
