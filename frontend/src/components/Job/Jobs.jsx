import { useContext, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
// const api = import.meta.env.VITE_API_END_POINT;
const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
          
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }
  return (
    <section className="jobs page">
      <div className="container">
        <h1 className="font-serif underline underline-offset-8">
          All available jobs
        </h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div
                  className="card relative p-4 border rounded-lg shadow-sm"
                  key={element._id}
                >
                  {element.isVerified && (
                    <div
                      className="absolute top-2 right-2"
                      title="Verified Job"
                    >
                      <CheckCircle className="w-6 h-6 text-blue-500" />
                    </div>
                  )}
                  <div className="mt-2">
                    <p className="font-semibold text-lg">{element.title}</p>
                    <p className="text-gray-600">{element.category}</p>
                    <p className="text-gray-600 mb-4">{element.country}</p>

                    <Link
                      className="block w-full p-2 text-lg rounded-lg text-black text-center bg-blue-400 transition-all duration-300 hover:bg-blue-500 hover:text-black hover:scale-105"
                      to={`/job/${element._id}`}
                    >
                      Job Details
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
