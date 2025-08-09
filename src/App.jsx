import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/Home/HomePage';
import MovieDetailPage from './pages/Movie/MovieDetailPage';
import SearchResultsPage from './pages/Search/SearchResultsPage';
import TvDetailPage from './pages/Tv/TvDetailPage';

const queryClient = new QueryClient();

// 경로 변경 시 상단으로 스크롤하는 컴포넌트
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/:type/:category' element={<HomePage />} />
              <Route path="/movie/:movieId" element={<MovieDetailPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/tv-detail/:tvId" element={<TvDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
