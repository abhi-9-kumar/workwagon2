import { useEffect, useState } from 'react';
import { magicRequest } from '../../axiosconfig';

const AdminHomePage = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', company: 'ACME Corp', verified: false },
    { id: 2, title: 'Backend Developer', company: 'Tech World', verified: true },
  ]);
  const [selectedDetails, setSelectedDetails] = useState(null);

  // Fetch job seekers and employers from the API
  const fetchUsers = async () => {
    const { data } = await magicRequest.get('user/get-all-users');
    const array1 = [];
    const array2 = [];
    data?.users?.forEach(element => {
      if (element.role === 'Job Seeker') {
        array1.push(element);
      } else if (element.role === 'Employer') {
        array2.push(element);
      }
    });
    console.log(data?.users)
    setJobSeekers(array1);
    setEmployers(array2);
  };
  const fetchAllJobs = async () => {
    const { data } = await magicRequest.get('job/getall');
    setJobs(data?.jobs);
    console.log(data?.jobs)[0]
    
  }

  useEffect(() => {
    fetchUsers();
    fetchAllJobs();
  }, []);

  // Handle selecting an item to view details
  const handleSelect = details => {
    setSelectedDetails(details);
  };

  const sendJobRequest = async (jobId, isVerified) => {
    const { data} = await magicRequest.patch(`/job/verify/${jobId}`, {
      isVerified: isVerified,
    })
    console.log(data)
  }

  const sendUserRequest = async (userId, isVerified) => {
    const { data} = await magicRequest.patch(`/user/verify/${userId}`, {
      isVerified: isVerified,
    })
    console.log(data)
  }

  // Handle verification
  const handleVerify = (type, id) => {
    switch (type) {
      case 'job-seeker':
        setJobSeekers(prevState =>
          prevState.map(seeker => 
            seeker._id === id ? { ...seeker, isVerified: true } : seeker)
        );
        sendUserRequest(id, true)
        break;
        
      case 'employer':
        setEmployers(prevState =>
          prevState.map(employer => 
            employer._id === id ? { ...employer, isVerified: true } : employer)
        );
        sendUserRequest(id, true)
        break;
      case 'job':
        setJobs(prevState =>
          prevState.map(job => 
            job._id === id ? { ...job, isVerified: true } : job)
        );
        sendJobRequest(id, true)
        break;
      default:
        break;
    }
    setSelectedDetails(null); // Clear the selected details after verification
  };

  // Handle rejection
  const handleReject = (type, id) => {
    switch (type) {
      case 'job-seeker':
        setJobSeekers(prevState =>
          prevState.map(seeker => 
            seeker._id === id ? { ...seeker, isVerified: false } : seeker)
        );
        sendUserRequest(id, false)
        break;
      case 'employer':
        setEmployers(prevState =>
          prevState.map(employer => 
            employer._id === id ? { ...employer, isVerified: false } : employer)
        );
        sendUserRequest(id, false)
        break;
      case 'job':
        setJobs(prevState =>
          prevState.map(job => 
            job._id === id ? { ...job, isVerified: false } : job)
        );
        sendJobRequest(id, false);
        break;
      default:
        break;
    }
    setSelectedDetails(null); // Clear the selected details after rejection
  };

  return (
    <div className="container mx-auto p-4 h-[78vh]">
      <h1 className="text-7xl font-bold text-center mb-12 p-5">Admin Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-70%">
        {/* Job Seekers */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-semibold mb-4">Job Seekers</h2>
          <div className="max-h-64 overflow-y-auto">
            <ul>
              {jobSeekers.map(seeker => (
                <li
                  key={seeker.id}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect({ ...seeker, type: 'job-seeker' })}
                >
                  <div>
                    <p>{seeker.name}</p>
                    <p className="text-sm text-gray-500">{seeker.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      seeker.isVerified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {seeker.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Employers */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Employers</h2>
          <div className="max-h-64 overflow-y-auto">
            <ul>
              {employers.map(employer => (
                <li
                  key={employer.id}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect({ ...employer, type: 'employer' })}
                >
                  <div>
                    <p>{employer.name}</p>
                    <p className="text-sm text-gray-500">{employer.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      employer.isVerified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {employer.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Jobs */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Jobs Posted</h2>
          <div className="max-h-64 overflow-y-auto">
            <ul>
              {jobs.map(job => (
                <li
                  key={job._id}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect({ ...job, type: 'job' })}
                >
                  <div>
                    <p>{job.title}</p>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      job.isVerified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {job.isVerified ? 'Verified' : 'Unverified'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Selected Details */}
      {selectedDetails && (
  <div className="mt-8 bg-white rounded-lg shadow-md p-4">
    <h3 className="text-xl font-semibold mb-4">Details</h3>
    <table className="table-auto w-full">
      <tbody>
        {Object.entries(selectedDetails)
          .filter(([key]) => ['name', 'email', 'phone', 'role', 'document', 'profilePicture', 'postedBy'].includes(key)) // Exclude unwanted fields
          .map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="p-2 font-semibold capitalize">{key}</td>
              <td className="p-2">
                {(key === 'document' || key === 'profilePicture') ? (
                  <img
                    src={value?.url}
                    alt="Selected Item"
                    className="h-64 w-64 object-cover rounded-md"
                  />
                ) : (
                  value
                )}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
    <div className="flex justify-end mt-4 space-x-4">
      <button
        className="px-6 py-3 bg-green-500 text-white rounded-lg text-lg"
        onClick={() => handleVerify(selectedDetails.type, selectedDetails._id)}
      >
        Verify
      </button>
      <button
        className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg"
        onClick={() => handleReject(selectedDetails.type, selectedDetails._id)}
      >
        Reject
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default AdminHomePage;


