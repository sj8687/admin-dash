const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border-gray-500 rounded-[9px] shadow-sm p-6 flex justify-between items-start animate-pulse">
      
      <div className="space-y-3 w-full">
        
        <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/3"></div>

        <div className="h-8 bg-gray-300 dark:bg-gray-500 rounded w-1/4"></div>

        <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded w-1/2"></div>
      </div>

      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-500 rounded-full"></div>
    </div>
  );
};

export default SkeletonCard;