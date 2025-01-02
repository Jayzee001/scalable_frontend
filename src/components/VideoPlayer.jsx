import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const VideoPlayer = ({ video }) => {
  return (
    <Card sx={{ margin: "16px" }}>
      <CardMedia
        component="video"
        controls
        src={video.url}
        title={video.title}
        sx={{ height: 400 }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component={Link}
          to={`/video/${video.id}`}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {video.title}
        </Typography>
        <Rating videoId={video.id} initialRating={video.averageRating} />
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
