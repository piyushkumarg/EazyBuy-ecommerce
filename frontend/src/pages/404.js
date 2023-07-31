import { Link } from "react-router-dom";
import notfoundAnim from "./404anim.json";
import Lottie from "lottie-react";

function PageNotFound() {
  return (
    <div>
      <div>
        <Lottie animationData={notfoundAnim} className="h-screen" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-x-6 p-4 m-10">
        <Link
          to="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
