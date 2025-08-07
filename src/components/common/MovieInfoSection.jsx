import { motion } from 'framer-motion';

const MovieInfoSection = ({ movie, credits }) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-shrink-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full max-w-64 rounded-lg shadow-2xl"
          />
        </div>
        
        <div className="flex-1 text-white">
          <h1 className="text-4xl font-bold mb-4 text-white">{movie.title}</h1>
          <p className="text-base leading-relaxed text-gray-300 mb-6 line-clamp-4">{movie.overview}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white bg-opacity-10 p-3 rounded-lg backdrop-blur-sm">
              <div className="text-xs text-gray-400 mb-1">평점</div>
              <div className="text-sm font-semibold text-white">⭐ {movie.vote_average}/10</div>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg backdrop-blur-sm">
              <div className="text-xs text-gray-400 mb-1">개봉일</div>
              <div className="text-sm font-semibold text-white">{movie.release_date}</div>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg backdrop-blur-sm">
              <div className="text-xs text-gray-400 mb-1">러닝타임</div>
              <div className="text-sm font-semibold text-white">{movie.runtime}분</div>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg backdrop-blur-sm">
              <div className="text-xs text-gray-400 mb-1">장르</div>
              <div className="text-sm font-semibold text-white">
                {movie.genres?.map(genre => genre.name).join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-white">감독/출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.slice(0, 6).map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300"
            >
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : 'https://via.placeholder.com/100'
                }
                alt={person.name}
                className="w-16 h-16 rounded-full mx-auto mb-2 object-cover border-2 border-white border-opacity-20"
              />
              <p className="text-xs font-semibold text-white mb-1">{person.name}</p>
              <p className="text-xs text-gray-400 truncate">{person.character}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfoSection;
