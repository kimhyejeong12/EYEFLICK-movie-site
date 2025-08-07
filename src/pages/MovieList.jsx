import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

const MovieList = () => {
  const { category } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError('데이터를 불러오는 데 실패했어요 😥');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, page]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">인기 영화 리스트</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
            <p className="mt-2 text-center">{movie.title}</p>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className={`px-4 py-2 rounded ${
            page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
        >
          ◀ 이전
        </button>
        <button
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          다음 ▶
        </button>
      </div>
    </div>
  );
};

export default MovieList;
