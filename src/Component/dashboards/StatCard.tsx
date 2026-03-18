import React from "react";
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";
import {GiMoneyStack} from "react-icons/gi"
import { FaBoxOpen,FaTruckMoving } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import type { StatCard } from "../../Types/types";




const iconMap: Record<string, React.ReactNode> = {
  GiMoneyStack: <GiMoneyStack size={22} />,
  FaBoxOpen: <FaBoxOpen size={22} />,
  FaTruckMoving: <FaTruckMoving size={22} />,
  MdOutlinePendingActions: <MdOutlinePendingActions size={22} />,
};

interface StatCardProps {
  card: StatCard;
}

const StatCardComponent: React.FC<StatCardProps> = ({ card }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-gray-500 font-medium">{card.title}</span>
        <span className="text-gray-400">{iconMap[card.icon]}</span>
      </div>
      <div className="text-2xl font-semibold text-gray-900 mb-1">{card.value}</div>
      <div className={`flex items-center gap-1 text-xs ${card.changeType === "positive" ? "text-emerald-600" : card.changeType === "negative" ? "text-red-500" : "text-gray-500"}`}>
        {card.changeType === "positive" ? <RiArrowUpLine size={12} /> : card.changeType === "negative" ? <RiArrowDownLine size={12} /> : null}
        <span>{card.change}</span>
      </div>
    </div>
  );
};

export default StatCardComponent;