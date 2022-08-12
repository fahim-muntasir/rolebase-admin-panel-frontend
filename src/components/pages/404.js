import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mx-auto pt-28">
      <div className="w-96 mx-auto text-center">
        <img
          src="http://localhost:3000/images/404.svg"
          alt="notFound"
          className="w-full mb-10"
        />
        <Link
          to="/"
          className=" bg-indigo-600 text-white text-center font-semibold py-1 px-3 rounded-md "
        >
          Go to home page
        </Link>
      </div>
    </div>
  );
}
