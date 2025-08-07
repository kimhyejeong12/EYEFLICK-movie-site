const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-purple-400 rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }} />
      </div>
      <p className="mt-4 text-gray-400 text-sm animate-pulse">로딩 중...</p>
    </div>
  );
};

export default Spinner;
