const TableSkeleton = () => {
  return (
    <div className="card p-6 space-y-3 animate-pulse">
      <div className="h-4 bg-soft rounded w-1/3"></div>
      <div className="h-4 bg-soft rounded w-2/3"></div>
      <div className="h-4 bg-soft rounded w-1/2"></div>
      <div className="h-4 bg-soft rounded w-3/4"></div>
    </div>
  );
};

export default TableSkeleton;
