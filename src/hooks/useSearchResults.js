import { useQueries } from 'react-query';
import { searchMovies } from '../services/api/movieApi';
import { searchTv } from '../services/api/tvApi';

export function useSearchResults(keyword) {
  const baseOptions = {
    enabled: !!keyword,
    staleTime: 5 * 60 * 1000,
  };

  const results = useQueries([
    {
      queryKey: ['searchMovies', keyword],
      queryFn: () => searchMovies(keyword),
      ...baseOptions,
    },
    {
      queryKey: ['searchTv', keyword],
      queryFn: () => searchTv(keyword),
      ...baseOptions,
    },
  ]);

  const [movieResult, tvResult] = results;

  const movies = movieResult?.data?.results || [];
  const tvShows = tvResult?.data?.results || [];

  return {
    movies,
    tvShows,
    isLoading: movieResult?.isLoading || tvResult?.isLoading,
    error: movieResult?.error || tvResult?.error,
    totalResults: movies.length + tvShows.length,
  };
}

