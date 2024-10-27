import { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, isAdmin, setIsAdmin } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://workwagon-server.onrender.com/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      
      // Clear all auth-related state
      setIsAuthorized(false);
      if (setIsAdmin) {
        setIsAdmin(false);
      }
      
      toast.success(response.data.message);
      
      // Force navigation after state updates
      setTimeout(() => {
        navigateTo("/login", { replace: true });
      }, 0);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      // Don't set isAuthorized to true on error - keep existing state
    }
  };

  if (isAdmin && isAuthorized) {
    return (
      <AdminNavbar
        isAdmin={isAdmin}
        isAuthorized={isAuthorized}
        user={user}
        handleLogout={handleLogout}
      />
    );
  }

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/job/getall" onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              {user && user.role === "Employer" 
                ? "APPLICANT'S APPLICATIONS" 
                : "MY APPLICATIONS"}
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setShow(false)}>
              MY PROFILE
            </Link>
          </li>
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to="/job/post" onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          )}
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

const AdminNavbar = ({ isAuthorized, handleLogout }) => {
  const [show, setShow] = useState(false);

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to="/" onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={() => setShow(false)}>
              MY PROFILE
            </Link>
          </li>
          <li>
            <Link to="/admin" onClick={() => setShow(false)}>
              ADMIN PAGE
            </Link>
          </li>
          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;