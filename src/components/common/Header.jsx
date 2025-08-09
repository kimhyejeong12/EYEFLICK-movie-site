import { useLocation, useNavigate } from "react-router-dom";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";
import NavButton from "./NavButton";
import EyeIcon from "./EyeIcon";
import SearchBar from "./Search/SearchBar";

const navItems = [
  { label: '홈', path: '/' },
  { label: '인기 영화', path: '/movies/popular' },
  { label: '평점 높은', path: '/movies/top_rated' },
  { label: '상영 중', path: '/movies/now_playing' },
  { label: '인기 TV', path: '/tv/popular' },
  { label: '평점 높은 TV', path: '/tv/top_rated' }
];

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
    
    return () => unsubscribe();
  }, [scrollY, navAnimation]);
  
  return (
    <motion.nav 
      className="flex justify-between items-center fixed w-full top-0 text-sm py-5 px-16 text-white z-50"
      variants={{
        top: { backgroundColor: "rgba(0, 0, 0, 0)" },
        scroll: { backgroundColor: "rgba(0, 0, 0, 1)" }
      }}
      animate={navAnimation}
      initial="top"
    >
      <div className="flex items-center">
        <motion.div
          className="mr-12 flex items-center gap-2 cursor-pointer"
          variants={{
            normal: { opacity: 1 },
            active: { 
              opacity: [0.5, 1, 0.5],
              transition: { repeat: Infinity, duration: 2 }
            }
          }}
          whileHover="active"
          animate="normal"
          onClick={() => navigate('/')}
        >
          <EyeIcon />
          <span className="text-2xl font-bold text-purple-600">EYEFLICK</span>
        </motion.div>
        
        <ul className="flex items-center gap-5">
          {navItems.map(({ label, path }) => (
            <NavButton key={path} label={label} path={path} />
          ))}
        </ul>
      </div>
      
      <SearchBar />
    </motion.nav>
  );
}

export default Header;
