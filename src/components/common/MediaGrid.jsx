import { useState } from "react";
import { useQuery } from "react-query";
import { getMoviesByCategory } from "../../services/api/movieApi";
import { getTvByCategory } from "../../services/api/tvApi";
import ErrorBoundary from "./ErrorBoundary";
import MediaCard from "./MediaCard";

const MediaGrid = ({ category, title, page = 1, onPageChange, type = "movie", showPagination = true }) => {
  const [currentPage, setCurrentPage] = useState(page);
  
  const movieCategoryTitles = {
    'popular': '인기 영화',
    'top_rated': '평점 높은 영화',
    'now_playing': '현재 상영 중'
  };
  
  const tvCategoryTitles = {
    'popular': '인기 TV 프로그램',
    'top_rated': '평점 높은 TV 프로그램'
  };
  
  const categoryTitles = type === "tv" ? tvCategoryTitles : movieCategoryTitles;
  
  const { data, isLoading, error } = useQuery(
    [type, category, currentPage],
    () => type === "tv" ? getTvByCategory(category, currentPage) : getMoviesByCategory(category, currentPage),
    {
      keepPreviousData: true,
    }
  );
  
  const items = data?.results || [];
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };
  
  return (
    <ErrorBoundary isLoading={isLoading} error={error}>
      <div className="relative z-10 bg-black pt-20 pb-20">
        <div className="px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            {title || categoryTitles[category] || (type === "tv" ? 'TV 프로그램' : '영화')} 모음
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {items.slice(0, 18).map(item => (
              <MediaCard key={item.id} item={item} type={type} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {showPagination && (
            <div className="flex justify-center items-center mt-12 gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 1 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105'
                }`}
              >
                이전
              </button>
              
              <div className="px-4 py-2 bg-gray-800 rounded-lg text-white font-medium">
                {currentPage}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                다음
              </button>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MediaGrid;
