import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import GalleryManagement from './pages/GalleryManagement';
import ContactMessages from './pages/ContactMessages';
import CafeSettings from './pages/CafeSettings';
import WebsiteControl from './pages/WebsiteControl';
import HomepageSettings from './pages/HomepageSettings';
import ProductsManager from './pages/ProductsManager';

const AdminIndex = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="control" element={<AdminLayout><WebsiteControl /></AdminLayout>} />
          <Route path="homepage" element={<AdminLayout><HomepageSettings /></AdminLayout>} />
          <Route path="dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="menu" element={<AdminLayout><MenuManagement /></AdminLayout>} />
          <Route path="products" element={<AdminLayout><ProductsManager /></AdminLayout>} />
          <Route path="gallery" element={<AdminLayout><GalleryManagement /></AdminLayout>} />
          <Route path="messages" element={<AdminLayout><ContactMessages /></AdminLayout>} />
          <Route path="settings" element={<AdminLayout><CafeSettings /></AdminLayout>} />
        </Route>

        <Route path="/" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminIndex;
