import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { submitRating } from "../services/api";
import { useLocation } from "react-router-dom";

const Rating = ({ videoId, initialRating }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [userRating, setUserRating] = useState(null);
  const location = useLocation();

  const handleRating = async (value) => {
    setUserRating(value);
    setRating(value);

    const ratingData = {
      videoId: videoId,
      rating: value,
    };

    try {
      const response = await submitRating(ratingData, location.pathname);
      setRating(response.averageRating);
      console.log(`Video ID: ${videoId}, User Rating: ${value}`);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        Rate this video:
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 1 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Box
            key={star}
            onClick={() => handleRating(star)}
            sx={{
              cursor: "pointer",
              color: userRating >= star ? "gold" : "gray",
              marginRight: 0.5,
            }}
          >
            {userRating >= star ? <StarIcon /> : <StarBorderIcon />}
          </Box>
        ))}
      </Box>
      <Typography variant="body1">
        {" "}
        Average Rating: {rating.toFixed(1)}
      </Typography>
    </Box>
  );
};

export default Rating;