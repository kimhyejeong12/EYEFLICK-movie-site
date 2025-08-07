import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/common/Header';
import Home from './pages/Home/Home';
import MovieDetail from './pages/Movie/MovieDetail';
import SearchResults from './pages/Search/SearchResults';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='movies/:category' element={<Home />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
