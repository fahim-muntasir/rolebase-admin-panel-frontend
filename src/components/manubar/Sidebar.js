import { AiOutlineArrowLeft, AiTwotoneShop } from "react-icons/ai";
import { BiPlus } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { MdDashboard, MdOutlineAnalytics } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { UseContext } from "../context/ContextProvider";

// hidden h-screen md:fixed lg:fixed top-10 bottom-0 translate-x-[-150px] md:translate-x-0 lg:translate-x-0

export default function Sidebar({ showSideBar, sideBarHandlear }) {
    const location = useLocation();

    const {
        currentUser: { role },
    } = UseContext();

    return (
        <div
            className={
                showSideBar
                    ? `h-screen fixed top-0 bottom-0 bg-gray-200 md:bg-transparent lg:bg-transparent px-5 md:px-0 lg:px-0 pt-5 md:pt-10 lg:pt-10 translate-x-[0] md:translate-x-0 lg:translate-x-0 transition-all ease-in-out`
                    : `h-screen fixed top-0 bottom-0 bg-gray-200 md:bg-transparent lg:bg-transparent px-5 md:px-0 lg:px-0 pt-5 md:pt-10 lg:pt-10 translate-x-[-250px] md:translate-x-0 lg:translate-x-0 transition-all ease-in-out`
            }
        >
            <div className="border-l border-white md:border-gray-200 lg:border-gray-200 pl-5 mt-5 ">
                <AiOutlineArrowLeft
                    onClick={sideBarHandlear}
                    className=" md:hidden lg:hidden absolute top-3 right-5 text-xl cursor-pointer "
                />
                <input
                    type="text"
                    placeholder="Search..."
                    className="rounded-md mb-3 text-sm px-2 box-content outline-none py-1 block md:hidden lg:hidden "
                />
                <ul className="leading-9 text-sm">
                    <li className="relative">
                        <Link
                            to="/dashboard"
                            className={
                                location.pathname === "/dashboard"
                                    ? "before:content-[''] before:absolute before:w-[2px] before:h-5 before:bg-indigo-600 before:left-[-20px] before:top-2 text-indigo-600 font-semibold flex items-center gap-1"
                                    : " flex items-center gap-1"
                            }
                        >
                            <MdDashboard />
                            Dashboard
                        </Link>
                    </li>
                    {(role === "admin" || role === "manager") && (
                        <li className="relative">
                            <Link
                                to="/users/all"
                                className={
                                    location.pathname.split("/")[1] === "users"
                                        ? "before:content-[''] before:absolute before:w-[2px] before:h-5 before:bg-indigo-600 before:left-[-20px] before:top-2 text-indigo-600 font-semibold flex items-center gap-1"
                                        : " flex items-center gap-1"
                                }
                            >
                                <FaUsers />
                                Users
                            </Link>
                        </li>
                    )}
                    {role === "admin" && (
                        <li className="relative">
                            <Link
                                to="/add_user"
                                className={
                                    location.pathname === "/add_user"
                                        ? "before:content-[''] before:absolute before:w-[2px] before:h-5 before:bg-indigo-600 before:left-[-20px] before:top-2 text-indigo-600 font-semibold flex items-center gap-1"
                                        : " flex items-center gap-1"
                                }
                            >
                                <BsFillPersonPlusFill />
                                Add User
                            </Link>
                        </li>
                    )}
                    <li className="relative">
                        <Link
                            to="/products/all"
                            className={
                                location.pathname === "/products/all"
                                    ? "before:content-[''] before:absolute before:w-[2px] before:h-5 before:bg-indigo-600 before:left-[-20px] before:top-2 text-indigo-600 font-semibold flex items-center gap-1"
                                    : " flex items-center gap-1"
                            }
                        >
                            <AiTwotoneShop />
                            Products
                        </Link>
                    </li>
                    <li className="relative">
                        <Link
                            to="/add_product"
                            className={
                                location.pathname === "/add_product"
                                    ? "before:content-[''] before:absolute before:w-[2px] before:h-5 before:bg-indigo-600 before:left-[-20px] before:top-2 text-indigo-600 font-semibold flex items-center gap-1"
                                    : " flex items-center gap-1"
                            }
                        >
                            <BiPlus />
                            Post Product
                        </Link>
                    </li>
                    <li className="relative">
                        <Link
                            to="/messages"
                            className={
                                location.pathname === "/messages"
                                    ? "before:content-[''] before:absolute before:w-[2px] before:h-5 before:bg-indigo-600 before:left-[-20px] before:top-2 text-indigo-600 font-semibold flex items-center gap-1"
                                    : " flex items-center gap-1"
                            }
                        >
                            <RiMessage2Fill />
                            Messages
                        </Link>
                    </li>
                    <li className="relative">
                        <a href="@" className="flex items-center gap-1">
                            <MdOutlineAnalytics />
                            Analytics
                        </a>
                    </li>
                    <li className="relative">
                        <a href="@" className="flex items-center gap-1">
                            <GiPayMoney />
                            Payments
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
