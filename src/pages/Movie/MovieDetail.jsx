import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import TrailerSection from '../../components/common/TrailerSection';
import MovieInfoSection from '../../components/common/MovieInfoSection';
import RecommendationsSection from '../../components/common/RecommendationsSection';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  const { movieId } = useParams();

  const fetchMovieData = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko`);
    return res.json();
  };

  const fetchCredits = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`);
    const data = await res.json();
    return data.cast.slice(0, 10);
  };

  const fetchVideos = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=ko`);
    const data = await res.json();
    let trailers = data.results.filter(video => video.type === 'Trailer');
    
    const koreanTrailers = trailers.filter(video => video.iso_639_1 === 'ko');
    if (koreanTrailers.length > 0) {
      return koreanTrailers;
    }
    
    const englishTrailers = trailers.filter(video => video.iso_639_1 === 'en');
    if (englishTrailers.length > 0) {
      return englishTrailers;
    }
    
    return trailers;
  };

  const fetchRecommendations = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=ko`);
    const data = await res.json();
    return data.results.slice(0, 12);
  };

  const { data: movie, isLoading: movieLoading, error: movieError } = useQuery(
    ['movie', movieId],
    fetchMovieData
  );

  const { data: credits, isLoading: creditsLoading } = useQuery(
    ['credits', movieId],
    fetchCredits
  );

  const { data: videos, isLoading: videosLoading } = useQuery(
    ['videos', movieId],
    fetchVideos
  );

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery(
    ['recommendations', movieId],
    fetchRecommendations
  );

  const isLoading = movieLoading || creditsLoading || videosLoading || recommendationsLoading;
  const error = movieError;

  if (isLoading) return (
    <div className="bg-black min-h-screen pt-20">
      <div className="h-20vh flex justify-center items-center text-white text-2xl" style={{ height: '20vh' }}>
        Loading...
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-black min-h-screen pt-20">
      <div className="text-center text-purple-400 text-xl p-10">
        영화 정보를 불러오는 데 실패했습니다.
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen pt-20">
      <TrailerSection videos={videos} />
      <MovieInfoSection movie={movie} credits={credits} />
      <RecommendationsSection recommendations={recommendations} />
    </div>
  );
};

export default MovieDetail;
