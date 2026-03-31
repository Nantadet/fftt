import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white px-6 py-16 text-slate-900">
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center text-center">
        <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
          withMe
        </div>
        <h1 className="mt-6 text-5xl font-black tracking-tight">404</h1>
        <p className="mt-3 text-lg text-slate-500">Oops! Page not found</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-600"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
