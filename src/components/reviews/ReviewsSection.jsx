import { useState } from "react";
import { motion } from "framer-motion";
import { useReviews } from "../../hooks/useReviews";
import ReviewCard from "./ReviewCard";

const ReviewsSection = ({ data, type = "movie" }) => {
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [showAllReviews, setShowAllReviews] = useState(false);

  const itemId = data?.id;
  const existingReviews = data?.reviews?.results || [];

  const { reviews: fetchedReviews = [], isLoading, error } = useReviews({
    itemId,
    type,
    existingReviews,
  });

  const finalReviews = existingReviews.length > 0 ? existingReviews : fetchedReviews;
  const displayedReviews = showAllReviews ? finalReviews : finalReviews.slice(0, 2);

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto p-10">
        <h2 className="text-3xl font-bold mb-5 text-white">리뷰</h2>
        <div className="text-center text-gray-400 text-lg mb-10 py-8">리뷰를 불러오는 중...</div>
      </div>
    );
  if (error)
    return (
      <div className="max-w-6xl mx-auto p-10">
        <h2 className="text-3xl font-bold mb-5 text-white">리뷰</h2>
        <div className="text-center text-gray-400 text-lg mb-10 py-8">리뷰를 불러오는 데 실패했습니다.</div>
      </div>
    );
  if (!finalReviews || finalReviews.length === 0) {
    const message = `이 ${type === "tv" ? "TV 프로그램" : "영화"}의 리뷰를 찾을 수 없습니다.`;
    return (
      <div className="max-w-6xl mx-auto p-10">
        <h2 className="text-3xl font-bold mb-5 text-white">리뷰</h2>
        <div className="text-center text-gray-400 text-lg mb-10 py-8">{message}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-5 text-white">리뷰 ({finalReviews.length}개)</h2>

      <div className="grid gap-4 mb-10">
        {displayedReviews.map((review, index) => (
          <ReviewCard
            key={review.id}
            review={review}
            index={index}
            isExpanded={expandedReviews.has(review.id)}
            onToggle={() => toggleReviewExpansion(review.id)}
          />
        ))}
      </div>

      {finalReviews.length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-4"
        >
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
              showAllReviews
                ? "bg-white bg-opacity-10 text-white hover:bg-opacity-20 border border-white border-opacity-20"
                : "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
            }`}
          >
            {showAllReviews ? "접기" : "더보기"}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ReviewsSection;

