import { useSearchParams } from 'react-router-dom';
import { useSearchResults } from '../../hooks/useSearchResults';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import SearchResultsView from '../../components/common/Search/SearchResultsView';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const { movies, tvShows, isLoading, error } = useSearchResults(keyword);

  if (!keyword) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white mb-4">영화 & TV 프로그램 검색</h1>
            <p className="text-gray-400 mb-8">검색창에서 영화나 TV 프로그램 제목을 입력해주세요.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary 
      isLoading={isLoading} 
      error={error}
      errorMessage="검색 중 오류가 발생했습니다"
    >
      <SearchResultsView keyword={keyword} movies={movies} tvShows={tvShows} />
    </ErrorBoundary>
  );
}

export default SearchResultsPage;

