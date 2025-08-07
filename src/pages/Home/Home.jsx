import { useLocation } from "react-router-dom";
import MediaHome from "../../components/common/MediaHome";

const Home = () => {
  const location = useLocation();
  
  // URL에 따라 타입 결정
  const isTvRoute = location.pathname.startsWith('/tv');
  const type = isTvRoute ? "tv" : "movie";
  
  return <MediaHome type={type} />;
};

export default Home;
