import React from "react";
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";
import { highlights, teamMembers } from "../../Data/mockdata";

const ProfessionalsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 flex flex-col gap-4">
      {/* Professionals count */}
      <div>
        <div className="text-2xl font-semibold text-gray-900">432</div>
        <div className="text-xs text-gray-400 mt-0.5">Rating's By Users</div>
      </div>

      {/* Today's Heroes */}
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Today's Heroes</p>
        <div className="flex  -space-x-2">
          {teamMembers.map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              title={m.name}
              className="w-10 h-10 rounded-full border-2 border-white object-cover"
            />
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-medium">
            +8
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-1">
        <p className="text-xs font-semibold text-gray-700 mb-2 ">Highlights</p>
        <div className="flex flex-col gap-3">
          {highlights.map((h) => (
            <div key={h.id} className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{h.label}</span>
              <div className={`flex items-center gap-1 text-xs font-medium ${h.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                {h.trend === "up" ? <RiArrowUpLine size={10} /> : <RiArrowDownLine size={11} />}
                <span>{h.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsCard;