# EYEFLICK - React Movie Site

React와 TMDB API를 활용한 영화 및 TV 프로그램 정보 사이트입니다.

## 주요 기능

- 홈 페이지 (인기 영화 + TV 프로그램)
- 영화/TV 프로그램 상세 페이지
- 통합 검색 (영화 + TV 프로그램)
- 반응형 디자인
- 애니메이션 효과

## 기술 스택

- React 18.2.0
- React Router DOM 7.4.1
- Tailwind CSS 3.4.1
- Framer Motion 12.23.12
- React Query 3.39.3
- Vite 4.0.0

## 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/kimhyejeong12/react-movie-site.git
cd react-movie-site
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env` 파일을 생성하고 TMDB API 키를 추가하세요:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

4. 개발 서버 실행
```bash
npm run dev
```

## 라우팅

- `/` - 홈 페이지
- `/movies/:category` - 영화 목록 (popular, top_rated, now_playing)
- `/movie/:movieId` - 영화 상세 페이지
- `/tv/:category` - TV 프로그램 목록 (popular, top_rated)
- `/tv-detail/:tvId` - TV 프로그램 상세 페이지
- `/search` - 검색 결과 페이지

## 프로젝트 구조

```
src/
├── components/common/          # 공통 컴포넌트
│   ├── MediaCard.jsx          # 미디어 카드
│   ├── MediaBanner.jsx        # 메인 배너
│   ├── MediaGrid.jsx          # 그리드 레이아웃
│   ├── Header.jsx             # 헤더
│   └── ...
├── pages/                     # 페이지 컴포넌트
│   ├── Home/Home.jsx
│   ├── Movie/MovieDetail.jsx
│   ├── Search/SearchResults.jsx
│   └── Tv/TvDetail.jsx
├── hooks/                     # 커스텀 훅
├── services/api/              # API 서비스
└── utils/                     # 유틸리티
```

## 개발자

[kimhyejeong12](https://github.com/kimhyejeong12)
