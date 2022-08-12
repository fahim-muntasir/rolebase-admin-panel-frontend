import React from "react";
import { BiPlus } from "react-icons/bi";
import Layout from "../Layout";

export default function Messages() {
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
          <div className="flex items-center justify-between border-b py-1.5 px-1 border-x border-x-white hover:shadow-md hover:border-x-gray-200">
            <div className="flex items-center justify-start gap-5">
              <img
                src="./images/blankImage.png"
                alt="user"
                className="w-8 h-8 rounded-md"
              />
              <span className=" font-semibold ">Fahim muntasir</span>
            </div>
            <div>
              <p>
                You: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Harum, quae!...
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold">Jul 2</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b py-1.5 px-1 border-x border-x-white hover:shadow-md hover:border-x-gray-200">
            <div className="flex items-center justify-start gap-5">
              <img
                src="./images/blankImage.png"
                alt="user"
                className="w-8 h-8 rounded-md"
              />
              <span className=" font-semibold ">Fahim muntasir</span>
            </div>
            <div>
              <p>
                You: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Harum, quae!...
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold">Jul 2</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b py-1.5 px-1 border-x border-x-white hover:shadow-md hover:border-x-gray-200">
            <div className="flex items-center justify-start gap-5">
              <img
                src="./images/blankImage.png"
                alt="user"
                className="w-8 h-8 rounded-md"
              />
              <span className=" font-semibold ">Fahim muntasir</span>
            </div>
            <div>
              <p>
                You: Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Harum, quae!...
              </p>
            </div>
            <div>
              <span className="text-sm font-semibold">Jul 2</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
