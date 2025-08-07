import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home/Home';
import MovieDetail from './pages/Movie/MovieDetail';
import SearchResults from './pages/Search/SearchResults';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='movies/:category' element={<Home />} />
              <Route path="/movie/:movieId" element={<MovieDetail />} />
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
