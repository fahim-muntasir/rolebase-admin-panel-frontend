import axios from "axios";
import { useEffect, useState } from "react";
import {
    AiOutlineDelete,
    AiOutlineExport,
    AiOutlinePlus,
} from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import { Link, useLocation, useParams } from "react-router-dom";
import Layout from "../Layout";
import UserPermission from "../userPermission/UserPermission";

export default function Users() {
    const [allUsers, setUsers] = useState([]);
    const [showActionMenu, setShowActionMenu] = useState(true);
    const [showPermissionDiv, setShowPermissionDiv] = useState(false);
    const [selectedUsers, setSelectedUser] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { role } = useParams();
    const location = useLocation();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${role}`)
            .then(({ data }) => setUsers(data))
            .catch((e) => console.log(e));
    }, [role]);

    const userRoleColorSelect = (role) => {
        switch (role) {
            case "admin":
                return (
                    <span className="rounded px-2 bg-green-500 text-white text-xs font-semibold pb-1 ">
                        {role}
                    </span>
                );
            case "manager":
                return (
                    <span className="rounded px-2 bg-orange-500 text-white text-xs font-semibold pb-1 ">
                        {role}
                    </span>
                );

            default:
                return (
                    <span className="rounded px-2 bg-amber-400 text-white text-xs font-semibold pb-1 ">
                        {role}
                    </span>
                );
        }
    };

    const showActionMenuHandler = () => {
        setShowActionMenu((prev) => !prev);
    };

    const showPermissionDivHandler = () => {
        setShowPermissionDiv(true);
    };

    const hidePermissionDivHandler = () => {
        setShowPermissionDiv(false);
    };

    // user select checkbox handler;
    const userCheckBoxHandler = (userID) => {
        if (selectedUsers.includes(userID)) {
            // create a copy selected product array to splice the product id;
            const copySelectedProducts = [...selectedUsers];
            // fild index;
            const productIdIndex = copySelectedProducts.indexOf(userID);
            // splice the existing element;
            copySelectedProducts.splice(productIdIndex, 1);
            setSelectedUser(copySelectedProducts);
        } else {
            setSelectedUser([...selectedUsers, userID]);
        }
    };

    // all select handler;
    const allSelectHandler = () => {
        if (allUsers?.length === selectedUsers?.length) {
            setSelectedUser([]);
        } else {
            const allUserIds = allUsers.map((product) => product._id);
            setSelectedUser(allUserIds);
        }
    };

    // user delete Handler
    const userDeleteHandler = () => {
        setDeleteLoading(true);
        axios
            .delete(
                `${
                    process.env.REACT_APP_BACKEND_URL
                }/api/users/${JSON.stringify(selectedUsers)}`
            )
            .then(({ data }) => {
                console.log(data);
                const filterProduct = allUsers.filter(
                    (user) => !selectedUsers.includes(user?._id)
                );
                setUsers(filterProduct);
                setDeleteLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setDeleteLoading(false);
            });
    };

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
                <div className=" border-solid border-b border-gray-200 pb-2 mb-3 flex justify-between ">
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
                                    location.pathname.split("/")[2] ===
                                    "manager"
                                        ? "before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-[-8px] before:bg-indigo-600 text-indigo-600 "
                                        : ""
                                }
                            >
                                Manager
                            </Link>
                        </li>
                    </ul>
                    <div>
                        {selectedUsers?.length > 0 && (
                            <button
                                onClick={userDeleteHandler}
                                className="flex items-center rounded px-2 h-7 text-sm shadow-sm hover:shadow font-semibold border border-solid border-red-500 text-red-500 gap-1 "
                            >
                                <AiOutlineDelete /> Delete
                            </button>
                        )}
                    </div>
                </div>

                {allUsers.length > 0 && (
                    <div className="w-full lg:flex gap-3">
                        <div
                            className={`flex flex-col pt-3 ${
                                showPermissionDiv
                                    ? "w-full lg:w-[68%] mb-3 md:mb-3 lg:mb-0"
                                    : "min-w-full"
                            }`}
                        >
                            <div className="py-2 inline-block min-w-full">
                                <div className="overflow-x-auto pb-4 tableScrollBar">
                                    <table
                                        className={
                                            showPermissionDiv
                                                ? "min-w-max lg:mx-auto"
                                                : "min-w-max lg:min-w-full"
                                        }
                                    >
                                        <thead className="bg-white border-b">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-2 text-left w-8"
                                                >
                                                    <input
                                                        checked={
                                                            allUsers?.length ===
                                                            selectedUsers?.length
                                                        }
                                                        type="checkbox"
                                                        onChange={
                                                            allSelectHandler
                                                        }
                                                    />
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
                                                <th
                                                    scope="col"
                                                    className="text-sm font-medium text-gray-900 px-6 py-2 text-center"
                                                >
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allUsers.map((user, i) => (
                                                <tr
                                                    key={i}
                                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                                    onClick={
                                                        showPermissionDivHandler
                                                    }
                                                >
                                                    <td className=" w-8 py-2 whitespace-nowrap">
                                                        <input
                                                            checked={selectedUsers.includes(
                                                                user["_id"]
                                                            )}
                                                            type="checkbox"
                                                            onChange={() =>
                                                                userCheckBoxHandler(
                                                                    user["_id"]
                                                                )
                                                            }
                                                        />
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
                                                        {userRoleColorSelect(
                                                            user.role
                                                        )}
                                                    </td>
                                                    <td className=" relative text-xl text-gray-900 font-light px-6 py-2 whitespace-nowrap flex justify-center">
                                                        <button>
                                                            <BiDotsHorizontal className=" cursor-pointer text-gray-600 " />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {showPermissionDiv && (
                            <UserPermission
                                handler={hidePermissionDivHandler}
                            />
                        )}
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
                            The {location.pathname.split("/")[2]} has not been
                            created yet!
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
