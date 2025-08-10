import { motion } from "framer-motion";

const PrimaryDetails = ({ media, variants }) => (
  <div className="flex flex-col lg:flex-row gap-8">
    <div className="lg:w-1/3">
      <motion.img
        variants={variants?.scaleIn}
        src={media.posterUrl}
        alt={media.title}
        className="w-full rounded-lg shadow-2xl"
      />
    </div>

    <div className="lg:w-2/3">
      <motion.h1 variants={variants?.fadeInUp} className="text-4xl lg:text-6xl font-bold text-white mb-4">
        {media.title}
      </motion.h1>

      <motion.div variants={variants?.fadeInUp} className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
        {media.releaseYear && <span>{media.releaseYear}</span>}
        {media.runtime && <span>{media.runtime}</span>}
        {media.voteAverage && <span className="flex items-center">⭐ {media.voteAverage}</span>}
        {media.status && <span className={`px-2 py-1 rounded text-sm ${media.statusColor}`}>{media.status}</span>}
      </motion.div>

      <motion.p variants={variants?.fadeInUp} className="text-gray-300 text-lg leading-relaxed mb-6">
        {media.overview}
      </motion.p>

      {media.genres?.length > 0 && (
        <motion.div variants={variants?.fadeInUp} className="flex flex-wrap gap-2 mb-6">
          {media.genres.map((genre) => (
            <span key={genre.id} className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
              {genre.name}
            </span>
          ))}
        </motion.div>
      )}

      {media.credits?.length > 0 && (
        <motion.div variants={variants?.fadeInUp} className="mb-6">
          <h3 className="text-white font-semibold mb-2">제작진</h3>
          <div className="flex flex-wrap gap-2">
            {media.credits.map((credit) => (
              <span key={credit.id} className="text-gray-300">
                {credit.name} {credit.job && `(${credit.job})`}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

export default PrimaryDetails;

