import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const res1 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko`);
        const res2 = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=ko`);
        const movieData = await res1.json();
        const creditData = await res2.json();

        setMovie(movieData);
        setCredits(creditData.cast.slice(0, 10));
      } catch {
        setError('영화 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg w-full md:w-1/3"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2 text-gray-300">{movie.overview}</p>
          <p className="mt-4">평점: {movie.vote_average}</p>
          <p>개봉일: {movie.release_date}</p>
          <p>러닝타임: {movie.runtime}분</p>
        </div>
      </div>

      <h2 className="text-xl mt-8 font-bold">감독/출연</h2>
      <div className="flex gap-4 mt-4 overflow-x-auto">
        {credits.map(person => (
          <div key={person.id} className="text-center">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : 'https://via.placeholder.com/100'
              }
              alt={person.name}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p className="text-sm mt-1">{person.name}</p>
            <p className="text-xs text-gray-400">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
