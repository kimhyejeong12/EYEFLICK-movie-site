import MediaCard from './MediaCard';

const RecommendationsSection = ({ data, type = "movie" }) => {
  const recommendations = data?.recommendations?.results || data?.similar?.results || [];

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">
        추천 {type === "tv" ? "TV 프로그램" : "영화"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.slice(0, 18).map((item) => (
          <MediaCard key={item.id} item={item} type={type} dimOnHover={false} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
