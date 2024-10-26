import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img
        src="/notfound.png"
        alt="Not Found"
        className="w-full max-w-[600px] max-h-[60vh] object-contain mb-6"
      />
      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-blue-500 text-lg font-semibold text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        RETURN TO HOME
      </Link>
    </div>
  );
};

export default NotFound;
