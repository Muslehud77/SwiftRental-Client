import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
        <div className="w-full">
          <div className="flex flex-col items-center max-w-lg mx-auto text-center">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
              404 error
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              We lost this page
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              We searched high and low, but couldn’t find the page you’re
              looking for. Let’s get you back on the road!
            </p>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg dark:text-gray-200 gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>
                <span>Go back</span>
              </button>

              <Link
                to="/"
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
              >
                Take me home
              </Link>
            </div>
          </div>

          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Documentation Card */}
            <div className="p-6 rounded-lg bg-blue-50 dark:bg-gray-800">
              <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200">
                Car Rental Guide
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Learn all about renting cars with SwiftRental.
              </p>
              <Link
                to="/inventory"
                className="inline-flex items-center mt-4 text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline"
              >
                <span>Start learning</span>
              </Link>
            </div>

            {/* Blog Card */}
            <div className="p-6 rounded-lg bg-blue-50 dark:bg-gray-800">
              <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200">
                Our Blog
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Read the latest posts about car rentals.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center mt-4 text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline"
              >
                <span>View latest posts</span>
              </Link>
            </div>

            {/* Chat Support Card */}
            <div className="p-6 rounded-lg bg-blue-50 dark:bg-gray-800">
              <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200">
                Need Assistance?
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Can’t find what you’re looking for?
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center mt-4 text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline"
              >
                <span>Chat with our team</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
