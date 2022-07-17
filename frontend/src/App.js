import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import ArticlesPage from './pages/ArticlesPage';
import SellersPage from './pages/SellersPage';
import PresentationPage from './pages/PresentationPage';
import { ConfigProvider } from '@arco-design/web-react';
import esES from '@arco-design/web-react/es/locale/es-ES';
import LoginPage from './pages/LoginPage';
import { Private } from './components/Private';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={esES} >
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Private component={<PresentationPage />} />} />
            <Route path='/clientes' element={<Private component={<ClientsPage />} />} />
            <Route path='/articulos' element={<Private component={<ArticlesPage />} />} />
            <Route path='/vendedores' element={<Private component={<SellersPage />} />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
