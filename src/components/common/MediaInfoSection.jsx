import { motion } from 'framer-motion';
import { getImageUrl } from '../../utils/imageUtils';

const MediaInfoSection = ({ data }) => {
  const crew = data?.credits?.crew || [];
  const cast = data?.credits?.cast || [];

  const director = crew.find((person) => person.job === 'Director');
  const credits = director ? [director, ...cast] : cast;

  if (credits.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-white">감독/출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {credits.slice(0, 6).map((person, index) => {
            const role = person.character || person.job;

            return (
              <motion.div
                key={person.credit_id || person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src={getImageUrl(person.profile_path, 'w185')}
                  alt={person.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 object-cover border-2 border-white border-opacity-20"
                />
                <p className="text-xs font-semibold text-white mb-1">
                  {person.name}
                </p>
                {role && (
                  <p className="text-xs text-gray-400 truncate">{role}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MediaInfoSection;
