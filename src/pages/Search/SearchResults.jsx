import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { searchMovies } from '../../services/api/movieApi';
import { getImageUrl } from '../../utils/imageUtils';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data: searchData, isLoading, error } = useQuery(
    ['search', keyword],
    () => searchMovies(keyword),
    {
      enabled: !!keyword,
      staleTime: 5 * 60 * 1000, // 5분
    }
  );

  // 키워드가 없을 때 (검색 페이지에 직접 접근한 경우)
  if (!keyword) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white mb-4">
              영화 검색
            </h1>
            <p className="text-gray-400 mb-8">
              검색창에서 영화 제목을 입력해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="flex justify-center items-center h-96">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4">
          <div className="text-white text-center py-20">
            <h2 className="text-2xl font-bold mb-4">검색 중 오류가 발생했습니다</h2>
            <p className="text-gray-400">잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  const movies = searchData?.results || [];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            "{keyword}" 검색 결과
          </h1>
          <p className="text-gray-400 mb-8">
            {movies.length}개의 영화를 찾았습니다
          </p>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">
              검색 결과가 없습니다
            </h2>
            <p className="text-gray-400">
              다른 키워드로 검색해보세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105"
              >
                <div className="aspect-[2/3] relative">
                  <img
                    src={getImageUrl(movie.poster_path, 'w500')}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                      <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                        {movie.title}
                      </h3>
                      <p className="text-gray-300 text-xs">
                        {movie.release_date?.split('-')[0] || 'N/A'}
                      </p>
                      <div className="flex items-center justify-center mt-2">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-white text-xs ml-1">
                          {movie.vote_average?.toFixed(1) || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
