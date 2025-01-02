import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadVideo } from "../../services/api";

const categories = ["Comedy", "Action", "Drama", "Love"];

const UploadVideoPage = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !category || !file) {
      setError("All fields are required");
      return;
    }

    const videoData = {
      title,
      category,
      video: file,
    };

    setLoading(true);
    try {
      await uploadVideo(videoData, location.pathname);
      setSuccess("Video uploaded successfully");
      setError("");
      setTitle("");
      setCategory("");
      setFile(null);
      setVideoPreview(null);
    } catch (error) {
      setError("Error uploading video");
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setError("Please upload a valid video file");
    }
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: "26px" }}>
        Upload Video
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{
          marginBottom: "16px",
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
      <TextField
        select
        label="Category"
        variant="outlined"
        fullWidth
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        sx={{
          marginBottom: "16px",
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
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {videoPreview && (
        <Box sx={{ marginBottom: "5rem", width: "30rem", height: "30rem" }}>
          <Typography variant="h6">Video Preview:</Typography>
          <video width="100%" height="100%" controls>
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      )}
      <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <Button
          variant="contained"
          component="label"
          sx={{
            color: "var(--primary-color)",
            backgroundColor: "var(--primary-color-light)",
            "&:hover": {
              backgroundColor: "var(--primary-color-light)",
            },
          }}
        >
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{
            color: "var(--primary-color)",
            backgroundColor: "var(--primary-color-light)",
            "&:hover": {
              backgroundColor: "var(--primary-color-light)",
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>
      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: "16px" }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography variant="body1" color="success" sx={{ marginTop: "16px" }}>
          {success}
        </Typography>
      )}
    </Box>
  );
};

export default UploadVideoPage;
