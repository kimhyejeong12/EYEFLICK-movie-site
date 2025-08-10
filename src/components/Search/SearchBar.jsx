import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      return;
    }
    setIsSearchOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
      setIsSearchOpen(false); 
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) {
      setKeyword("");
    }
  }, [isSearchOpen]);

  return (
    <div ref={searchContainerRef} className="flex items-center">
      <svg
        onClick={handleIconClick}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 cursor-pointer text-white"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </svg>

      {isSearchOpen && (
        <form onSubmit={handleSearch} className="ml-2">
          <input
            ref={inputRef}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="search"
            placeholder="콘텐츠를 검색하세요"
            className="w-60 rounded-md border border-white bg-black bg-opacity-80 py-1.5 pl-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            autoComplete="off"
          />
        </form>
      )}
    </div>
  );
}

export default SearchBar;