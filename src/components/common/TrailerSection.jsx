import { motion } from 'framer-motion';

const TrailerSection = ({ data, type = "movie" }) => {
  const videos = data?.videos?.results || [];
  return (
    <div className="max-w-6xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-5 text-white">예고편</h2>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {videos.slice(0, 2).map((video, index) => (
            <motion.div
              key={video.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                className="w-full h-64 md:h-80 rounded-lg shadow-2xl"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p className="text-white text-center mt-2 text-sm">{video.name}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mb-10 py-8">
          이 {type === "tv" ? "TV 프로그램" : "영화"}의 예고편을 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
};

export default TrailerSection;
