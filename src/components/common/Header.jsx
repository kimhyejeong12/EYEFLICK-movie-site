import { useLocation, useNavigate } from "react-router-dom";
import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavButton from "./NavButton";

const navItems = [
  { label: '홈', path: '/' },
  { label: '인기 영화', path: '/movies/popular' },
  { label: '개봉 예정', path: '/movies/upcoming' },
  { label: '평점 높은', path: '/movies/top_rated' },
  { label: '상영 중', path: '/movies/now_playing' }
];

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  
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
  
  const { register, handleSubmit } = useForm();
  
  const onValid = (data) => {
    if (data.keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(data.keyword.trim())}`);
      setSearchOpen(false);
      inputAnimation.start({ scaleX: 0 });
    }
  };
  
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
          className="mr-12 text-2xl font-bold text-purple-600 cursor-pointer"
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
          EYEFLICK
        </motion.div>
        
        <ul className="flex items-center gap-5">
          {navItems.map(({ label, path }) => (
            <NavButton key={path} label={label} path={path} />
          ))}
        </ul>
      </div>
      
      <div className="flex items-center">
        <form onSubmit={handleSubmit(onValid)} className="text-white flex items-center relative">
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <motion.input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="영화 제목을 검색하세요..."
            className="absolute right-0 py-2 px-3 pl-10 z-[-1] text-white text-base bg-black bg-opacity-80 border border-white rounded-md transform origin-right backdrop-blur-sm focus:outline-none focus:border-purple-400"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchOpen(false);
                inputAnimation.start({ scaleX: 0 });
              }
            }}
          />
        </form>
      </div>
    </motion.nav>
  );
}

export default Header;
