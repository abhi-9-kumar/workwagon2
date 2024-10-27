import { useContext, useEffect, Suspense, lazy } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Lazy loading components
const Home = lazy(() => import("./components/Home/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const Jobs = lazy(() => import("./components/Job/Jobs"));
const JobDetails = lazy(() => import("./components/Job/JobDetails"));
const Application = lazy(() => import("./components/Application/Application"));
const MyApplications = lazy(() => import("./components/Application/MyApplications"));
const PostJob = lazy(() => import("./components/Job/PostJob"));
const MyJobs = lazy(() => import("./components/Job/MyJobs"));
const AdminHome = lazy(() => import("./components/Admin/AdminHome"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, setIsAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://workwagon-server.onrender.com/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
        if (response?.data?.user?.isAdmin) {
          setIsAdmin(true);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser, setIsAdmin]);

  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
