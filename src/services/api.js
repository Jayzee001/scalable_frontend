import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const fetchVideos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const fetchVideo = async (videoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};

export const submitComment = async (commentData, currentPath) => {
  try {
    const token = localStorage.getItem("token");

    if (isTokenExpired(token)) {
      localStorage.removeItem("token"); // Remove the expired token
      window.location.href = `/login?redirect=${encodeURIComponent(
        currentPath
      )}`; // Redirect to login page with current path
      return;
    }
    const response = await axios.post(
      `${API_BASE_URL}/videos/comment`,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

export const submitRating = async (ratingData, currentPath) => {
  try {
    const token = localStorage.getItem("token");

    if (isTokenExpired(token)) {
      localStorage.removeItem("token"); // Remove the expired token
      window.location.href = `/login?redirect=${encodeURIComponent(
        currentPath
      )}`; // Redirect to login page with current path
      return;
    }

    const response = await axios.post(
      `${API_BASE_URL}/videos/rate`,
      ratingData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};


export const uploadVideo = async (videoData, currentPath) => {
  try {
    const token = localStorage.getItem('token');

    if (isTokenExpired(token)) {
      localStorage.removeItem("token"); // Remove the expired token
      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`; // Redirect to login page with current path
      return;
    }

    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('category', videoData.category);
    formData.append('video', videoData.video);

    const response = await axios.post(
      `${API_BASE_URL}/admin/upload-video`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};