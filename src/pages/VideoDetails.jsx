import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommentSection from "../components/CommentSection";
import Rating from "../components/Rating";
import { fetchVideo, submitComment } from "../services/api";

const VideoDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const fetchedVideo = await fetchVideo(id);
        setVideo(fetchedVideo);
        setComments(fetchedVideo.comments || []);
      } catch (error) {
        setError("Failed to load video");
        console.error("Error loading video:", error);
      }
    };

    loadVideo();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment) return;

    const newComment = {
      videoId: id,
      comment: comment,
    };

    try {
      await submitComment(newComment, location.pathname);
      setComments((prevComments) => [
        ...prevComments,
        { text: comment, username: "You" }, // Assuming "You" as the username for the new comment
      ]);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "16px",
          margin: "0 auto",
          height: "calc(100vh - 64px)",
        }}
      >
        {error}
      </Typography>
    );
  }

  if (!video) {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          padding: "16px",
          margin: "0 auto",
          height: "calc(100vh - 64px)",
        }}
      >
        Loading...
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      <Box
        component="video"
        controls
        src={video.url}
        sx={{
          width: "100%",
          marginBottom: "16px",
          height: "30rem",
          boxShadow: 3,
        }}
      />
      <Rating videoId={video.id} initialRating={video.averageRating} />
      <CommentSection comments={comments} />
      <Box sx={{ display: "flex", alignItems: "center", marginTop: "16px" }}>
        <Avatar>{video.title.charAt(0)}</Avatar>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: "16px",
            backgroundColor: "var(--primary-color)",
            "&:hover": {
              backgroundColor: "var(--primary-color)",
            },
          }}
          onClick={handleAddComment}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default VideoDetails;
