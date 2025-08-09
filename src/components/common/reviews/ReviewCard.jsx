import { motion } from "framer-motion";
import AuthorInfo from "./AuthorInfo";

const truncateText = (text, maxLength = 200) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const ReviewCard = ({ review, index, isExpanded, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-20"
    >
      <div className="flex items-start justify-between mb-4">
        <AuthorInfo author={review.author} date={review.created_at} rating={review.author_details?.rating} />
      </div>
      <div className="text-gray-300 leading-relaxed text-sm">
        <p className="whitespace-pre-wrap">{isExpanded ? review.content : truncateText(review.content)}</p>
        {review.content?.length > 200 && (
          <button onClick={onToggle} className="text-purple-400 hover:text-purple-300 mt-2 text-xs">
            {isExpanded ? "접기" : "더 보기"}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewCard;

