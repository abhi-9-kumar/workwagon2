import { useContext, useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion, useMotionValue, useMotionTemplate, animate } from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const AuroraHero = ({ children }) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen overflow-hidden pl-5 sm:pl-10 md:pl-20 lg:pl-80"
    >
      <div className="relative z-10">
        {children}
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={3500} factor={5} fade speed={4} />
        </Canvas>
      </div>
    </motion.section>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const { isAdmin, setIsAdmin } = useContext(Context);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      console.log(data)
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      if(data?.user?.isAdmin){
        setIsAdmin(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if(isAdmin){
    return <Navigate to={"/admin"}/>;
  }
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <AuroraHero>
      <div className="flex flex-col gap-6 pl-5 sm:pl-10 md:pl-20 lg:pl-20">
        <div className="flex flex-col p-5 pl-5 sm:pl-10 mt-5 mb-10 h-auto w-full md:w-3/4 lg:w-1/2">
          <div className="flex flex-col mb-5 text-center">
            <img src="/logo.png" alt="logo" className="w-32 h-32 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400">Login to your account</h2>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-yellow-200 text-lg sm:text-xl">Login As</label>
              <div className="flex items-center border rounded-lg bg-[#87878778]">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="bg-transparent py-3 px-3 border-none w-full text-lg sm:text-xl text-white"
                >
                  <option className="bg-black" value="">Select Role</option>
                  <option className="bg-black" value="Employer">Employer</option>
                  <option className="bg-black" value="Job Seeker">Job Seeker</option>
                  <option className="bg-black" value="Admin">Admin</option>
                </select>
                <FaRegUser className="text-white text-4xl sm:text-6xl rounded-sm p-2" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-yellow-200 text-lg sm:text-xl">Email Address</label>
              <div className="flex items-center border rounded-lg bg-[#87878778]">
                <input
                  type="email"
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent py-3 px-3 border-none w-full text-lg sm:text-xl text-white"
                />
                <MdOutlineMailOutline className="text-white text-4xl sm:text-6xl rounded-sm p-2" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-yellow-200 text-lg sm:text-xl">Password</label>
              <div className="flex items-center border rounded-lg bg-[#87878778]">
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent py-3 px-3 border-none w-full text-lg sm:text-xl text-white"
                />
                <RiLock2Fill className="text-white text-4xl sm:text-6xl rounded-sm p-2" />
              </div>
            </div>
          </form>
          <div className="flex flex-col gap-4 mt-6">
            <button onClick={handleLogin}
              type="submit"
              className="py-4 text-lg sm:text-2xl text-center border-none font-bold text-white bg-[#191771] rounded-lg w-full"
            >
              Login to your account
            </button>
            <Link
              to={"/register"}
              className="py-4 text-lg sm:text-2xl text-center border-none font-bold text-white bg-[#191771] rounded-lg w-full"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </AuroraHero>
  );
};

export default Login;
