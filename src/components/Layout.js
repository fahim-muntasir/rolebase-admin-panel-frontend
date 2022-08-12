import { useState } from "react";
import Sidebar from "./manubar/Sidebar";
import Topbar from "./manubar/Topbar";

export default function Layout({ children }) {
  const [showSideBar, setSideBar] = useState(false);

  const sideBarHandlear = () => {
    setSideBar((prevState) => !prevState);
  };

  return (
    <>
      <Topbar sideBarHandlear={sideBarHandlear} />
      <div className=" container mx-auto flex pt-10">
        <div
          className={
            showSideBar
              ? `md:flex-initial lg:flex-initial md:w-3/12 lg:w-2/12 fixed md:static lg:static left-0 right-0 top-0 bottom-0 bg-[#25252567] z-50 md:z-0 lg:z-0 md:bg-transparent lg:bg-transparent`
              : `md:flex-initial inline lg:flex-initial md:w-3/12 lg:w-2/12 md:static lg:static z-50 md:z-0 lg:z-0 md:bg-transparent lg:bg-transparent`
          }
        >
          <Sidebar
            showSideBar={showSideBar}
            sideBarHandlear={sideBarHandlear}
          />
        </div>
        <div className=" px-2 md:px-0 lg:px-0 w-full md:w-9/12 lg:w-10/12 scroll-smooth">
          {children}
        </div>
      </div>
    </>
  );
}
