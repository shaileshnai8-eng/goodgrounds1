import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe,
  Coffee, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: Globe, label: 'Control Center', path: '/admin/control' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Coffee, label: 'Menu Management', path: '/admin/menu' },
    { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-6 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                  isActive ? 'bg-gray-100 border-r-4 border-blue-500 text-blue-600' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t mt-auto">
          <button
            onClick={logout}
            className="flex items-center text-red-600 hover:text-red-700 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
