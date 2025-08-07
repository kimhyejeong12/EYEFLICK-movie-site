import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RecommendationsSection = ({ recommendations }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-white">추천 영화</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommendations.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleMovieClick(movie.id)}
            className="cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="text-sm font-semibold mb-1 line-clamp-2">{movie.title}</h3>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</span>
                  <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
