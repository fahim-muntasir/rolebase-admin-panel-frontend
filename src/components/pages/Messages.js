import React from "react";
import { BiPlus } from "react-icons/bi";
import Layout from "../Layout";

export default function Messages() {
  const messageText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem dignissimos, deleniti pariatur quo eaque doloremque blanditiis nam facilis sequi numquam ratione omnis error corporis aspernatur commodi possimus tempora. Consectetur, quasi?";

  return (
    <Layout>
      <div className="pt-6">
        <div className="flex justify-between items-center pb-5 px-2 border-b">
          <h2 className=" text-3xl font-bold ">Inbox</h2>
          <div>
            <button className="flex items-center border rounded-lg px-2 py-1 border-indigo-500 hover:bg-gray-50">
              <BiPlus />
              Create Conversation
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between border-b py-1.5 px-2 border-x border-x-white hover:shadow-md hover:border-x-gray-200">
            <input
              type="checkbox"
              className="mr-3 accent-indigo-600 cursor-pointer "
            />
            <div className=" w-64 md:w-72 lg:w-72 flex items-center justify-start gap-2">
              <img
                src="./images/blankImage.png"
                alt="user"
                className="w-8 h-8 rounded-md"
              />
              <span className=" leading-4 ">Fahim muntasir</span>
            </div>
            <div className=" w-80 md:w-full lg:w-full">
              <p className=" hidden lg:block  leading-4">
                You: {messageText.slice(0, 70)}...
              </p>
              <p className=" hidden md:block lg:hidden  leading-4">
                You: {messageText.slice(0, 30)}...
              </p>
              <p className=" block md:hidden lg:hidden  leading-4">
                You: {messageText.slice(0, 20)}...
              </p>
            </div>
            <div className="w-20 text-right ">
              <span className="text-sm font-semibold">Jul 2</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
