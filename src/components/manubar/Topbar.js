import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FcBusinessman, FcInfo, FcSettings } from "react-icons/fc";
import { GrUserSettings } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UseContext } from "../context/ContextProvider";

export default function Topbar({ sideBarHandlear }) {
  const [showProfileMenu, setProfileMenu] = useState(false);

  const { isLogin, currentUser, logout } = UseContext();
  const navigate = useNavigate();

  const showProfileMenuHandlear = () => {
    setProfileMenu((prev) => !prev);
  };

  const userMenu = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (!userMenu.current.contains(event.target)) {
        setProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const logoutHandler = () => {
    logout((response) => {
      if (response.data.logout) {
        navigate("/", { replace: true });
      } else {
        alert("Somthing is wrong!");
      }
    });
  };

  return (
    <header className=" bg-gray-100 py-2 shadow-sm px-2 md:px-0 lg:px-0 fixed top-0 left-0 right-0 ">
      <div className="container mx-auto  flex justify-between">
        <div className="flex gap-2">
          <h1>E-Dashboard</h1>
          <button
            onClick={sideBarHandlear}
            className="block md:hidden lg:hidden text-xl"
          >
            <AiOutlineMenu />
          </button>
        </div>
        <div className="w-72 relative hidden md:block lg:block ">
          <AiOutlineSearch className=" absolute left-4 top-1/2 bottom-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 " />
          <input
            type="text"
            placeholder="Search..."
            className=" bg-white shadow-sm w-full text-sm py-[2px] pl-7 px-3 rounded-lg outline-none text-gray-600 "
          />
        </div>
        <div className="flex justify-end gap-4 text-2xl items-center">
          <div className="flex justify-end gap-1 items-center cursor-pointer">
            <FcInfo />
            <span className="text-sm">Help</span>
          </div>
          <MdNotifications className="cursor-pointer text-gray-500 hover:text-gray-600 " />
          <FcSettings className="cursor-pointer hover:rotate-12" />
          <div>
            {isLogin && currentUser.avatar && (
              <div ref={userMenu} className="relative">
                <img
                  onClick={showProfileMenuHandlear}
                  src={`http://localhost:5000/images/${currentUser.avatar}`}
                  alt="user"
                  className="w-6 h-6 rounded-full cursor-pointer"
                />
                {showProfileMenu && (
                  <div className=" absolute top-7 right-0 w-36 shadow-lg text-base bg-white ">
                    <ul>
                      <li>
                        <a
                          href="@"
                          className="flex justify-start gap-1 items-center py-2 px-3 hover:bg-gray-100"
                        >
                          <ImProfile /> Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="@"
                          className="flex justify-start gap-1 items-center py-2 px-3 hover:bg-gray-100"
                        >
                          <GrUserSettings /> Setting
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={logoutHandler}
                          className="flex justify-start gap-1 items-center py-2 px-3 hover:bg-gray-100 w-full"
                        >
                          <BiLogOut className=" text-red-600 " /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            {!isLogin && !currentUser.avatar && (
              <FcBusinessman className="cursor-pointer" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
