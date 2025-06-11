import { createBrowserRouter } from 'react-router-dom';
import TireListPage from './pages/TireListPage';
import TireDetailPage from './pages/TireDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TireListPage />
  },
  {
    path: '/tire/:id',
    element: <TireDetailPage />
  }
]);

export default router; 