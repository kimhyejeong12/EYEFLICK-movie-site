# Movie Site

영화 정보를 제공하는 React 웹 애플리케이션입니다.

## 기능

- 홈 페이지
- 영화 목록 페이지 (카테고리별)
- 영화 상세 페이지
- 반응형 디자인
- 로딩 스피너
- 페이지네이션

## 기술 스택

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- TMDB API

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
`.env` 파일을 생성하고 TMDB API 키를 추가하세요:
```
VITE_TMDB_API_KEY=your_api_key_here
```

3. 개발 서버 실행:
```bash
npm run dev
```

4. 빌드:
```bash
npm run build
```

## 라우트

- `/` - 홈 페이지
- `/movies/:category` - 영화 목록 (popular, upcoming, top_rated, now_playing)
- `/movie/:movieId` - 영화 상세 페이지

## 프로젝트 구조

```
src/
├── components/
│   ├── MovieCard.jsx
│   ├── Navbar.jsx
│   └── Spinner.jsx
├── layout/
│   └── Layout.jsx
├── pages/
│   ├── Home.jsx
│   ├── MovieList.jsx
│   └── MovieDetail.jsx
├── App.jsx
├── main.jsx
└── index.css
```
