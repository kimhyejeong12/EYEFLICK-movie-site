import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home/Home';
import MovieDetail from './pages/Movie/MovieDetail';
import SearchResults from './pages/Search/SearchResults';
import TvDetail from './pages/Tv/TvDetail';

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
              <Route path='/' element={<Home />} />
              <Route path='movies/:category' element={<Home />} />
              <Route path="/movie/:movieId" element={<MovieDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/tv/:category" element={<Home />} />
              <Route path="/tv-detail/:tvId" element={<TvDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
