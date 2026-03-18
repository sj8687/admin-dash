import React from "react";
import { useLocation } from "react-router-dom";

const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  const name = location.pathname.replace("/", "").replace(/-/g, " ");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 capitalize">{name || "Page"}</h2>
      <p className="text-sm text-gray-500 mt-2">This page is under construction. Check back soon!</p>
    </div>
  );
};

export default PlaceholderPage;