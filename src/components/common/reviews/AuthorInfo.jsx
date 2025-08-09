const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AuthorInfo = ({ author, date, rating }) => (
  <div className="flex items-center gap-3">
    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
      <span className="text-white font-semibold text-xs">{author?.charAt(0)?.toUpperCase()}</span>
    </div>
    <div>
      <h3 className="text-white font-semibold text-sm">{author}</h3>
      <p className="text-gray-400 text-xs">{formatDate(date)}</p>
    </div>
    {rating && (
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs">
        ⭐ {rating}/10
      </div>
    )}
  </div>
);

export default AuthorInfo;

