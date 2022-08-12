import React from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { BsArrowLeftRight, BsFillFileBreakFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GoArrowSmallUp } from "react-icons/go";
import DashboardCard from "../Elements/DashboardCard";
import Layout from "../Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="pt-6 block md:block lg:flex  lg:justify-between lg:flex-wrap">
        <DashboardCard
          mainIcon={<FaUsers />}
          secondaryIcon={<BsArrowLeftRight />}
          title="Total Users"
          amount="300"
          borderColor="border-lime-400"
          iconBgColor="bg-lime-400"
          secondaryIconColor="text-lime-400"
        />
        <DashboardCard
          mainIcon={<BsFillFileBreakFill />}
          secondaryIcon={<GoArrowSmallUp />}
          title="Today Orders"
          amount="125"
          borderColor="border-indigo-400"
          iconBgColor="bg-indigo-400"
          secondaryIconColor="text-indigo-400"
        />
        <DashboardCard
          mainIcon={<AiOutlineNotification />}
          secondaryIcon={<GoArrowSmallUp />}
          title="Notification"
          amount="7"
          borderColor="border-sky-400"
          iconBgColor="bg-sky-400"
          secondaryIconColor="text-sky-400"
        />
      </div>
    </Layout>
  );
}
