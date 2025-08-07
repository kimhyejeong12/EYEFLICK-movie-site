import { useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

const ReviewsSection = ({ movieId }) => {
  const [expandedReviews, setExpandedReviews] = useState(new Set());
  const [showAllReviews, setShowAllReviews] = useState(false);

  const fetchReviews = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=ko&page=1`
    );
    let data = await response.json();
    
    if (!data.results || data.results.length < 3) {
      response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en&page=1`
      );
      data = await response.json();
    }
    
    return data.results ? data.results.slice(0, 6) : [];
  };

  const { data: reviews = [], isLoading: loading, error } = useQuery(
    ['reviews', movieId],
    fetchReviews,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderEmptyState = (message) => (
    <div className="max-w-6xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-5 text-white">리뷰</h2>
      <div className="text-center text-gray-400 text-lg mb-10 py-8">
        {message}
      </div>
    </div>
  );

  if (loading) return renderEmptyState('리뷰를 불러오는 중...');
  if (error) return renderEmptyState('리뷰를 불러오는 데 실패했습니다.');
  if (!reviews || reviews.length === 0) return renderEmptyState('이 영화의 리뷰를 찾을 수 없습니다.');

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h2 className="text-3xl font-bold mb-5 text-white">리뷰</h2>
      <div className="grid gap-4 mb-10">
        {displayedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-20 hover:bg-opacity-15 hover:border-opacity-30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold text-xs">
                    {review.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{review.author}</h3>
                  <p className="text-gray-400 text-xs">{formatDate(review.created_at)}</p>
                </div>
              </div>
              {review.author_details.rating && (
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                  ⭐ {review.author_details.rating}/10
                </div>
              )}
            </div>
            
            <div className="text-gray-300 leading-relaxed text-sm">
              {expandedReviews.has(review.id) ? (
                <div>
                  <p className="whitespace-pre-wrap">{review.content}</p>
                  <button
                    onClick={() => toggleReviewExpansion(review.id)}
                    className="text-purple-400 hover:text-purple-300 mt-2 text-xs font-medium transition-colors"
                  >
                    접기
                  </button>
                </div>
              ) : (
                <div>
                  <p className="whitespace-pre-wrap">
                    {truncateText(review.content)}
                  </p>
                  {review.content.length > 200 && (
                    <button
                      onClick={() => toggleReviewExpansion(review.id)}
                      className="text-purple-400 hover:text-purple-300 mt-2 text-xs font-medium transition-colors"
                    >
                      더 보기
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {reviews.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-4"
          >
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg ${
                showAllReviews
                  ? 'bg-white bg-opacity-10 text-white hover:bg-opacity-20 border border-white border-opacity-20'
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
              }`}
            >
              {showAllReviews ? '접기' : '더보기'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
