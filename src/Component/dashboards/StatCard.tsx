import React from "react";
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";
import {GiMoneyStack} from "react-icons/gi"
import { FaBoxOpen,FaTruckMoving } from "react-icons/fa";
import { MdOutlinePendingActions,MdOutlineDirectionsBike,MdOutlineAirplanemodeInactive } from "react-icons/md";
import {HiUserGroup} from "react-icons/hi";
import { RiUserLocationLine } from "react-icons/ri";
import { SiSessionize } from "react-icons/si";
import { GiDuration } from "react-icons/gi";
import { GiRugbyConversion } from "react-icons/gi";

import type { StatCard } from "../../Types/types";



const iconMap: Record<string, React.ReactNode> = {
  GiMoneyStack: <GiMoneyStack size={22} />,
  FaBoxOpen: <FaBoxOpen size={22} />,
  FaTruckMoving: <FaTruckMoving size={22} />,
  MdOutlinePendingActions: <MdOutlinePendingActions size={22} />,
  MdOutlineDirectionsBike: <MdOutlineDirectionsBike size={22} />,
  MdOutlineAirplanemodeInactive: <MdOutlineAirplanemodeInactive size={22} />,
  HiUserGroup: <HiUserGroup size={22} />,
  RiUserLocationLine: <RiUserLocationLine size={22} />,
  SiSessionize: <SiSessionize size={22} />,
  GiDuration: <GiDuration size={27} />,
  GiRugbyConversion: <GiRugbyConversion size={22} />,
};

interface StatCardProps {
  card: StatCard;
}

const StatCardComponent: React.FC<StatCardProps> = ({ card }) => {
  return (
    <div className="bg-white dark:bg-[#09090b] dark:border-[#1d1d21] rounded-xl p-5 border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm dark:text-gray-400  text-gray-500 font-medium">{card.title}</span>
        <span className="text-green-700 dark:text-green-200">{iconMap[card.icon]}</span>
      </div>
      <div className="text-2xl dark:text-gray-300 font-semibold text-gray-900 mb-1">{card.value}</div>
      <div className={`flex items-center gap-1 text-xs ${card.changeType === "positive" ? "text-emerald-600" : card.changeType === "negative" ? "text-red-500" : "text-gray-500"}`}>
        {card.changeType === "positive" ? <RiArrowUpLine size={12} /> : card.changeType === "negative" ? <RiArrowDownLine size={12} /> : null}
        <span>{card.change}</span>
      </div>
    </div>
  );
};

export default StatCardComponent;