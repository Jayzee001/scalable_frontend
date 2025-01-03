import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import VideoDetails from "./pages/VideoDetails";
import AllVideosPage from "./pages/AllVideosPage";
import CategoryPage from "./pages/CategoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadVideoPage from "./pages/admin/UploadVideoPage";
import Container from "@mui/material/Container";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        >
          <Route path="upload-video" element={<UploadVideoPage />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <Header />
              <Container
                maxWidth="lg"
                sx={{ flexGrow: 1, paddingTop: "16px", paddingBottom: "16px" }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/video/:id" element={<VideoDetails />} />
                  <Route path="/videos" element={<AllVideosPage />} />
                  <Route
                    path="/category/:category"
                    element={<CategoryPage />}
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                </Routes>
              </Container>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
