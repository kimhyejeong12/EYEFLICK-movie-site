import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center space-y-4">
        {/* 프로젝트 정보 */}
        <div className="space-y-2">
          <h3 className="text-white text-lg font-semibold">EYEFLICK</h3>
          <p className="text-sm text-gray-400">
            개인 프로젝트 - React & TMDB API를 활용한 영화 정보 사이트
          </p>
        </div>

        {/* 링크 섹션 */}
        <div className="flex justify-center items-center gap-8 text-sm">
          <a
            href="https://github.com/kimhyejeong12/react-movie-site"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
          </a>
          <span className="text-gray-300">TMDB API</span>
        </div>

        {/* 크레딧 정보 */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
          <p>영화 데이터 제공: The Movie Database (TMDB)</p>
        </div>

        {/* 저작권 정보 */}
        <div className="border-t border-gray-800 pt-4">
          <p className="text-xs text-gray-500">
            © {currentYear} EYEFLICK. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
