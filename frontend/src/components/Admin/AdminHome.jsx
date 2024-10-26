import React, { useState } from 'react';

const AdminHomePage = () => {
  // Mock data for job seekers, employers, and jobs
  const [jobSeekers, setJobSeekers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', verified: false },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', verified: true },
  ]);

  const [employers, setEmployers] = useState([
    { id: 1, name: 'ACME Corp', email: 'hr@acme.com', verified: false },
    { id: 2, name: 'Tech World', email: 'contact@techworld.com', verified: true },
  ]);

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Frontend Developer', company: 'ACME Corp', verified: false },
    { id: 2, title: 'Backend Developer', company: 'Tech World', verified: true },
  ]);

  const [selectedDetails, setSelectedDetails] = useState(null);

  // Handle selecting an item to view details
  const handleSelect = (details) => {
    setSelectedDetails(details);
  };

  // Handle verification or rejection
  const handleVerify = (type, id) => {
    switch (type) {
      case 'job-seeker':
        setJobSeekers(prevState =>
          prevState.map(seeker =>
            seeker.id === id ? { ...seeker, verified: true } : seeker
          )
        );
        break;
      case 'employer':
        setEmployers(prevState =>
          prevState.map(employer =>
            employer.id === id ? { ...employer, verified: true } : employer
          )
        );
        break;
      case 'job':
        setJobs(prevState =>
          prevState.map(job =>
            job.id === id ? { ...job, verified: true } : job
          )
        );
        break;
      default:
        break;
    }
    // Hide the details box after verification
    setSelectedDetails(null);
  };

  // Handle rejection (set verified to false)
  const handleReject = (type, id) => {
    switch (type) {
      case 'job-seeker':
        setJobSeekers(prevState =>
          prevState.map(seeker =>
            seeker.id === id ? { ...seeker, verified: false } : seeker
          )
        );
        break;
      case 'employer':
        setEmployers(prevState =>
          prevState.map(employer =>
            employer.id === id ? { ...employer, verified: false } : employer
          )
        );
        break;
      case 'job':
        setJobs(prevState =>
          prevState.map(job =>
            job.id === id ? { ...job, verified: false } : job
          )
        );
        break;
      default:
        break;
    }
    // Hide the details box after rejection
    setSelectedDetails(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Home Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Job Seekers */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Job Seekers</h2>
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
                    seeker.verified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {seeker.verified ? 'Verified' : 'Unverified'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Employers */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Employers</h2>
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
                    employer.verified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {employer.verified ? 'Verified' : 'Unverified'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Jobs */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Jobs Posted</h2>
          <ul>
            {jobs.map(job => (
              <li
                key={job.id}
                className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect({ ...job, type: 'job' })}
              >
                <div>
                  <p>{job.title}</p>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    job.verified ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {job.verified ? 'Verified' : 'Unverified'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Selected Details */}
      {selectedDetails && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Details</h3>
          <pre className="text-sm">{JSON.stringify(selectedDetails, null, 2)}</pre>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded mr-2"
              onClick={() => handleVerify(selectedDetails.type, selectedDetails.id)}
            >
              Verify
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleReject(selectedDetails.type, selectedDetails.id)}
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
