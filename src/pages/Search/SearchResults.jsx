import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { searchMovies } from '../../services/api/movieApi';
import { searchTv } from '../../services/api/tvApi';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import MediaCard from '../../components/common/MediaCard';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { data: movieData, isLoading: movieLoading, error: movieError } = useQuery(
    ['searchMovies', keyword],
    () => searchMovies(keyword),
    {
      enabled: !!keyword,
      staleTime: 5 * 60 * 1000,
    }
  );

  const { data: tvData, isLoading: tvLoading, error: tvError } = useQuery(
    ['searchTv', keyword],
    () => searchTv(keyword),
    {
      enabled: !!keyword,
      staleTime: 5 * 60 * 1000,
    }
  );

  const isLoading = movieLoading || tvLoading;
  const error = movieError || tvError;

  // 키워드가 없을 때
  if (!keyword) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white mb-4">
              영화 & TV 프로그램 검색
            </h1>
            <p className="text-gray-400 mb-8">
              검색창에서 영화나 TV 프로그램 제목을 입력해주세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const movies = movieData?.results || [];
  const tvShows = tvData?.results || [];
  const totalResults = movies.length + tvShows.length;

  return (
    <ErrorBoundary 
      isLoading={isLoading} 
      error={error}
      errorMessage="검색 중 오류가 발생했습니다"
    >
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4">
          <div className="py-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              "{keyword}" 검색 결과
            </h1>
            <p className="text-gray-400 mb-8">
              {totalResults}개의 결과를 찾았습니다 (영화: {movies.length}개, TV: {tvShows.length}개)
            </p>
          </div>

          {totalResults === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-white mb-4">
                검색 결과가 없습니다
              </h2>
              <p className="text-gray-400">
                다른 키워드로 검색해보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* 영화 결과 */}
              {movies.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">영화 ({movies.length}개)</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {movies.map((movie) => (
                      <MediaCard key={`movie-${movie.id}`} item={movie} type="movie" />
                    ))}
                  </div>
                </div>
              )}

              {/* TV 프로그램 결과 */}
              {tvShows.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">TV 프로그램 ({tvShows.length}개)</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {tvShows.map((tv) => (
                      <MediaCard key={`tv-${tv.id}`} item={tv} type="tv" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default SearchResults;
