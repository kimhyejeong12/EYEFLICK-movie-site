import SearchResultsList from './SearchResultsList';

function SearchResultsView({ keyword, movies, tvShows }) {
  const totalResults = (movies?.length || 0) + (tvShows?.length || 0);

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-white mb-2">"{keyword}" 검색 결과</h1>
          <p className="text-gray-400 mb-8">
            {totalResults}개의 결과를 찾았습니다 (영화: {movies.length}개, TV: {tvShows.length}개)
          </p>
        </div>

        {/* 검색 결과 없을 때 */}
        {totalResults === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">검색 결과가 없습니다</h2>
            <p className="text-gray-400">다른 키워드로 검색해보세요.</p>
          </div>
        ) : (
          /* 검색 결과 있을 때 */
          <div className="space-y-12">
            <SearchResultsList title="영화" items={movies} type="movie" />
            <SearchResultsList title="TV 프로그램" items={tvShows} type="tv" />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResultsView;

