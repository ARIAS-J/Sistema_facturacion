import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import SideMenu from './components/SideMenu';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import ArticlesPage from './pages/ArticlesPage';
import SellersPage from './pages/SellersPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='dashboard-structure'>
          <SideMenu />
          <div className='dashboard-content'>
            <Routes>
              <Route path='/clientes' element={<ClientsPage />} />
              <Route path='/articulos' element={<ArticlesPage />} />
              <Route path='/vendedores' element={<SellersPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
