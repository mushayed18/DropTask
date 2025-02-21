import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-green-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Oops! Page Not Found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <button className="px-4 py-2 rounded-md bg-green-500 text-white cursor-pointer">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
