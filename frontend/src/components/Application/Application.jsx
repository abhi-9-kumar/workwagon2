import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      // const api = import.meta.env.VITE_API_END_POINT;
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  const DrawOutlineButton = ({ children, ...rest }) => {
    return (
      <button
        {...rest}
        className="group relative px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-indigo-300"
      >
        <span>{children}</span>

        {/* TOP */}
        <span className="absolute left-0 top-0 h-[5px] w-0 bg-indigo-300 transition-all duration-100 group-hover:w-full" />

        {/* RIGHT */}
        <span className="absolute right-0 top-0 h-0 w-[5px] bg-indigo-300 transition-all delay-100 duration-100 group-hover:h-full" />

        {/* BOTTOM */}
        <span className="absolute bottom-0 right-0 h-[5px] w-0 bg-indigo-300 transition-all delay-200 duration-100 group-hover:w-full" />

        {/* LEFT */}
        <span className="absolute bottom-0 left-0 h-0 w-[5px] bg-indigo-300 transition-all delay-300 duration-100 group-hover:h-full" />
      </button>
    );
  };

  return (
    <section className="application flex flex-col bg-[#D6EAF8] pt-24 md:pt-5">
      <div className="container mx-auto px-4 py-12 flex flex-col text-center">
        <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6">APPLICATION FORM</h3>
        <form
          onSubmit={handleApplication}
          className="flex flex-col w-full max-w-md mx-auto py-10 px-4 gap-6"
        >
          <input
            className="border border-[#2a89c0] text-lg py-3 px-2 bg-[#D6EAF8] rounded"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#2a89c0] text-lg py-3 px-2 bg-[#D6EAF8] rounded"
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-[#2a89c0] text-lg py-3 px-2 bg-[#D6EAF8] rounded"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-[#2a89c0] text-lg py-3 px-2 bg-[#D6EAF8] rounded"
          />
          <textarea
            placeholder="Cover Letter (min 50 characters)..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full h-32 text-lg bg-[#D6EAF8] border border-[#2a89c0] rounded"
          />
          <div className="text-left">
            <label className="block text-lg mb-2">Select Resume</label>
            <input
              type="file"
              accept=".webp, .jpg, .png"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <div className="grid min-h-[60px] place-content-center bg-[#02113f] p-4 text-2xl">
            <DrawOutlineButton type="submit">Send Application</DrawOutlineButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Application;
