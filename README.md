# EYEFLICK - React Movie Site

React와 TMDB API를 활용한 영화 및 TV 프로그램 정보 사이트입니다.

## 주요 기능

- 홈 페이지 (인기 영화 + TV 프로그램)
- 영화/TV 프로그램 상세 페이지
- 통합 검색 (영화 + TV 프로그램)
- 리뷰 시스템
- 트레일러 섹션
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
git clone https://github.com/kimhyejeong12/EYEFLICK-movie-site.git
cd EYEFLICK-movie-site
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
- `/movie/:movieId` - 영화 상세 페이지
- `/tv/:tvId` - TV 프로그램 상세 페이지
- `/search` - 검색 결과 페이지

## 프로젝트 구조

```
src/
├── components/                 # 컴포넌트
│   ├── Banner/                # 배너 관련 컴포넌트
│   │   ├── HeroBanner.jsx     # 메인 히어로 배너
│   │   ├── MediaBanner.jsx    # 미디어 배너
│   │   ├── Slider.jsx         # 슬라이더
│   │   └── SliderItem.jsx     # 슬라이더 아이템
│   ├── common/                # 공통 컴포넌트
│   │   ├── MediaCard.jsx      # 미디어 카드
│   │   ├── MediaGrid.jsx      # 그리드 레이아웃
│   │   ├── Header.jsx         # 헤더
│   │   ├── Footer.jsx         # 푸터
│   │   ├── MediaModal.jsx     # 미디어 모달
│   │   └── ...
│   ├── Detail/                # 상세 페이지 컴포넌트
│   │   ├── DetailLayout.jsx   # 상세 페이지 레이아웃
│   │   ├── PrimaryDetails.jsx # 주요 정보
│   │   ├── TrailerSection.jsx # 트레일러 섹션
│   │   └── ...
│   ├── reviews/               # 리뷰 관련 컴포넌트
│   │   ├── ReviewCard.jsx     # 리뷰 카드
│   │   ├── ReviewsSection.jsx # 리뷰 섹션
│   │   └── ...
│   └── Search/                # 검색 관련 컴포넌트
│       ├── SearchBar.jsx      # 검색바
│       ├── SearchResultsList.jsx # 검색 결과 목록
│       └── SearchResultsView.jsx # 검색 결과 뷰
├── pages/                     # 페이지 컴포넌트
│   ├── Home/HomePage.jsx      # 홈 페이지
│   ├── Movie/MovieDetailPage.jsx # 영화 상세 페이지
│   ├── Search/SearchResultsPage.jsx # 검색 결과 페이지
│   └── Tv/TvDetailPage.jsx    # TV 상세 페이지
├── hooks/                     # 커스텀 훅
│   ├── useBannerLogic.js      # 배너 로직
│   ├── useMediaFeed.js        # 미디어 피드
│   ├── useReviews.js          # 리뷰 관련
│   └── useSearchResults.js    # 검색 결과
├── services/api/              # API 서비스
│   ├── apiClient.js           # API 클라이언트
│   ├── movieApi.js            # 영화 API
│   ├── reviewApi.js           # 리뷰 API
│   └── tvApi.js               # TV API
└── utils/                     # 유틸리티
    ├── animations.js          # 애니메이션
    ├── imageUtils.js          # 이미지 유틸리티
    └── mediaDataMapper.js     # 미디어 데이터 매퍼
```

## 개발자

[kimhyejeong12](https://github.com/kimhyejeong12)
