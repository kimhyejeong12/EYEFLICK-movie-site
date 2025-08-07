import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getMoviesByCategory } from "../../services/api/movieApi";
import { getImageUrl } from "../../utils/imageUtils";
import Spinner from "./Spinner";

const MovieGrid = ({ category, title, page = 1, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(page);
  
  // 카테고리별 제목 매핑
  const categoryTitles = {
    'popular': '인기 영화',
    'top_rated': '평점 높은 영화',
    'upcoming': '개봉 예정 영화',
    'now_playing': '현재 상영 중'
  };
  
  const { data, isLoading, error } = useQuery(
    ["movies", category, currentPage],
    () => getMoviesByCategory(category, currentPage),
    {
      keepPreviousData: true,
    }
  );
  
  const movies = data?.results || [];
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };
  
  return (
    <div className="relative z-10 bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-32 pb-20">
      <div className="px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          {title || categoryTitles[category] || '영화'} 모음
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-xl mb-4">데이터를 불러오는 데 실패했어요 😥</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
            >
              다시 시도
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.map(movie => (
                <div key={movie.id} className="group">
                  <Link to={`/movie/${movie.id}`}>
                    <div className="relative overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
                      <img
                        src={getImageUrl(movie.poster_path, "w500")}
                        alt={movie.title}
                        className="w-full h-auto"
                      />
                      
                      {/* 호버 오버레이 */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-4">
                        <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                            {movie.title}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-gray-300">
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default MovieGrid;
