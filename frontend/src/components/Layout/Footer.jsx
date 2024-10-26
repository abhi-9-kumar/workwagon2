import  { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Abhinav Kumar.</div>
      <div>
        <Link to={"https://www.facebook.com/profile.php?id=100011683800860&name=xhp_nt_"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.linkedin.com/in/abhinav-kumar-018366201/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/abhi_9_kumar/"} target="_blank">
          <RiInstagramFill />
        </Link>
        <Link to={"https://x.com/Abhi99904652079"} target="_blank">
        <BsTwitterX />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
