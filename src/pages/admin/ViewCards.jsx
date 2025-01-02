import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fetchVideos } from "../../services/api";

const ViewCards = () => {
  const categories = ["Comedy", "Action", "Drama", "love"];
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videos = await fetchVideos();
        const counts = categories.map((category) => ({
          category,
          count: videos.filter((video) => video.category === category).length,
        }));
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    loadVideos();
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: 4 }}>
      {categoryCounts.map(({ category, count }) => (
        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={category}>
          <Card
            sx={{
              borderRadius: "16px",
              textAlign: "center",
              height: "10rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h5">{category}</Typography>
              <Typography variant="h6">{count} Videos</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ViewCards;
