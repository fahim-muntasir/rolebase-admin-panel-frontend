import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineExport, AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation, useParams } from "react-router-dom";
import Layout from "../Layout";

export default function Users() {
  const [allUsers, setUsers] = useState([]);

  const { role } = useParams();
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${role}`)
      .then(({ data }) => setUsers(data))
      .catch((e) => console.log(e));
  }, [role]);

  return (
    <Layout>
      <div className="pt-6">
        <div className="flex justify-between mb-3 ">
          <h2 className=" text-3xl font-bold ">Users</h2>
          <div className="flex justify-end items-center gap-2">
            <button className=" flex items-center rounded px-2 h-7 text-sm shadow-sm hover:shadow font-semibold border-solid border border-gray-300 ">
              <AiOutlineExport className="mr-1" />
              Export
            </button>
            <button className=" flex items-center rounded px-2 h-7 text-sm shadow-sm hover:shadow font-semibold bg-indigo-500 text-white ">
              <AiOutlinePlus className="mr-1" />
              Create User
            </button>
          </div>
        </div>
        <div className=" border-solid border-b border-gray-200 pb-2 mb-3 ">
          <ul className="flex gap-6 text-sm text-gray-500 font-medium ">
            <li className="relative">
              <Link
                to="/users/all"
                className={
                  location.pathname.split("/")[2] === "all"
                    ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                    : ""
                }
              >
                All
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/users/admin"
                className={
                  location.pathname.split("/")[2] === "admin"
                    ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                    : ""
                }
              >
                Admin
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/users/worker"
                className={
                  location.pathname.split("/")[2] === "worker"
                    ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                    : ""
                }
              >
                Worker
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/users/manager"
                className={
                  location.pathname.split("/")[2] === "manager"
                    ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                    : ""
                }
              >
                Manager
              </Link>
            </li>
          </ul>
        </div>

        {allUsers.length > 0 && (
          <div className="w-full">
            <div className="flex flex-col min-w-full ">
              <div className="py-2 inline-block min-w-full">
                <div className="overflow-x-auto pb-4 tableScrollBar">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th scope="col" className="py-2 text-left w-8">
                          <input type="checkbox" />
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 pr-6 py-2 text-left pl-3 md:pl-0 lg:pl-0"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                        >
                          Avatar
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                        >
                          Email address
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-2 text-left"
                        >
                          User Role
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((user, i) => (
                        <tr
                          key={user.email}
                          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td className=" w-8 py-2 whitespace-nowrap">
                            <input type="checkbox" />
                          </td>
                          <td className="pr-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900 pl-3 md:pl-0 lg:pl-0">
                            {i + 1}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                            <img
                              src={`http://localhost:5000/images/${user.avatar}`}
                              alt="blank"
                              className="w-6 h-6 rounded-full"
                            />
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                            {`${user.firstName} ${user.lastName}`}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                            {user.email}
                          </td>
                          <td className=" relative text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
                            <span className="rounded px-2 bg-green-500 text-white text-xs font-semibold pb-1 ">
                              {user.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {allUsers.length === 0 && (
          <div className="text-center pt-10">
            <img
              src="http://localhost:3000/images/emptydata.svg"
              alt="empty"
              className="w-28 mx-auto mb-5"
            />
            <p className="text-2xl font-semibold text-gray-700">
              The {location.pathname.split("/")[2]} has not been created yet!
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}