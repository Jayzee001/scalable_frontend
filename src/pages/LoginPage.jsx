import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { login } from "../services/authService";

const LoginPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login({ username, password });
      console.log("Login successful:", user);
      setError(""); // Clear any previous errors

      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        const redirectTo =
          new URLSearchParams(location.search).get("redirect") || "/";
        navigate(redirectTo);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
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
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography
          color="error"
          variant={isVerySmallScreen ? "body2" : isSmallScreen ? "h6" : "h4"}
          sx={{ fontSize: "12px" }}
        >
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
          marginTop: "16px",
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        sx={{
          marginLeft: "16px",
          backgroundColor: "var(--primary-color)",
          "&:hover": {
            backgroundColor: "var(--primary-color)",
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
