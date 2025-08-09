import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const inputAnimation = useAnimation();
  
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
  
  const { register, handleSubmit } = useForm();
  
  const onValid = (data) => {
    if (data.keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(data.keyword.trim())}`);
      setSearchOpen(false);
      inputAnimation.start({ scaleX: 0 });
    }
  };
  
  return (
    <div className="flex items-center">
      <form onSubmit={handleSubmit(onValid)} className="text-white flex items-center relative">
        <motion.svg
          onClick={toggleSearch}
          animate={{ x: searchOpen ? -205 : 0 }}
          transition={{ type: "linear" }}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 px-20 cursor-pointer"
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
          placeholder="찾고 싶은 콘텐츠를 검색하세요"
          className="absolute right-0 py-2 pl-10 z-[-1] text-white text-base bg-black bg-opacity-80 border border-white rounded-md transform origin-right backdrop-blur-sm focus:outline-none focus:border-purple-400 w-80"
        />
      </form>
    </div>
  );
}

export default SearchBar; 

