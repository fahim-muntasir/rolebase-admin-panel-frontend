import React from "react";

export default function InputBox({ error, innerRef, ...props }) {
  return (
    <>
      <input
        ref={innerRef}
        {...props}
        className={
          error
            ? `form-control block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-red-500
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:outline-none`
            : `form-control block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`
        }
      />
      {error && <p className="text-red-500 text-xs">{error.msg}</p>}
    </>
  );
}
