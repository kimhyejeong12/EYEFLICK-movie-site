import { useQuery } from "react-query";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { getMoviesByCategory } from "../../services/api/movieApi";
import { getImageUrl } from "../../utils/imageUtils";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../../components/common/Spinner";
import MovieGrid from "../../components/common/MovieGrid";
import MovieBanner from "../../components/common/MovieBanner";



const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // URL에서 카테고리 추출
  const categoryMatch = location.pathname.match(/\/movies\/(\w+)/);
  const category = categoryMatch ? categoryMatch[1] : 'now_playing';
  
  const { data, isLoading } = useQuery(
    ["movies", category],
    () => getMoviesByCategory(category)
  );
  
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const offset = 6;
  

  
  // URL에서 movieId 파라미터 추출
  const movieIdMatch = location.pathname.match(/\/movies\/(\d+)/);
  const bigMovieMatch = movieIdMatch ? { params: { movieId: movieIdMatch[1] } } : null;
  
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  
  const toggleLeaving = () => setLeaving((prev) => !prev);
  
  const onBoxClicked = (movieId) => {
    navigate(`/movie/${movieId}`);
  };
  
  const onOverlayClick = () => {
    if (category === 'now_playing') {
      navigate("/");
    } else {
      navigate(`/movies/${category}`);
    }
  };
  
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
    
  return (
    <div className="bg-black">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <MovieBanner 
            data={data}
            index={index}
            leaving={leaving}
            onIncreaseIndex={incraseIndex}
            onBoxClicked={onBoxClicked}
            onToggleLeaving={toggleLeaving}
            offset={offset}
          />
          
          {/* 영화 그리드 섹션 */}
          <MovieGrid category={category} />
          
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <motion.div
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed top-0 w-full h-full bg-black bg-opacity-50 opacity-0 z-50"
                />
                <motion.div
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                  className="absolute w-2/5 h-4/5 left-0 right-0 mx-auto rounded-2xl overflow-hidden bg-gray-800 z-50"
                >
                  {clickedMovie && (
                    <>
                      <div
                        className="w-full h-96 bg-cover bg-center"
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${getImageUrl(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <h3 className="text-white p-5 text-4xl relative -top-20">{clickedMovie.title}</h3>
                      <p className="p-5 relative -top-20 text-white">{clickedMovie.overview}</p>
                    </>
                  )}
                </motion.div>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Home;
