import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import GalleryManagement from './pages/GalleryManagement';
import ContactMessages from './pages/ContactMessages';
import CafeSettings from './pages/CafeSettings';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
              <Route path="/menu" element={<AdminLayout><MenuManagement /></AdminLayout>} />
              <Route path="/gallery" element={<AdminLayout><GalleryManagement /></AdminLayout>} />
              <Route path="/messages" element={<AdminLayout><ContactMessages /></AdminLayout>} />
              <Route path="/settings" element={<AdminLayout><CafeSettings /></AdminLayout>} />
            </Route>

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
