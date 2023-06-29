import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="mx-auto  max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center pt-20 h-screen bg-no-repeat bg-cover  bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')]">
        <div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
        </div>
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-x-6 p-4">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
