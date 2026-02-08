import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Globe,
  Coffee,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ArrowUpRight,
  LayoutDashboard,
  Home,
  Package,
} from 'lucide-react';

const WebsiteControl = () => {
  const { data: menuItems } = useQuery({
    queryKey: ['menu'],
    queryFn: () => api.get('/menu').then((res) => res.data),
  });

  const { data: messages } = useQuery({
    queryKey: ['messages'],
    queryFn: () => api.get('/messages').then((res) => res.data),
  });

  const { data: gallery } = useQuery({
    queryKey: ['gallery'],
    queryFn: () => api.get('/gallery').then((res) => res.data),
  });

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: () => api.get('/settings').then((res) => res.data),
  });

  const unreadMessages = messages?.filter((message: any) => !message.isRead) || [];

  const quickActions = [
    {
      label: 'Dashboard Overview',
      description: 'Review performance and activity at a glance.',
      icon: LayoutDashboard,
      to: '/admin/dashboard',
    },
    {
      label: 'Homepage Settings',
      description: 'Edit hero copy, buttons, and background content.',
      icon: Home,
      to: '/admin/homepage',
    },
    {
      label: 'Menu Management',
      description: 'Add, update, or remove coffee items and pricing.',
      icon: Coffee,
      to: '/admin/menu',
    },
    {
      label: 'Products Manager',
      description: 'Manage product cards shown on the homepage.',
      icon: Package,
      to: '/admin/products',
    },
    {
      label: 'Gallery',
      description: 'Refresh the homepage gallery with new visuals.',
      icon: ImageIcon,
      to: '/admin/gallery',
    },
    {
      label: 'Messages',
      description: 'Respond to inquiries from the contact form.',
      icon: MessageSquare,
      to: '/admin/messages',
    },
    {
      label: 'Cafe Settings',
      description: 'Update contact info, hours, and socials.',
      icon: Settings,
      to: '/admin/settings',
    },
  ];

  const stats = [
    { label: 'Menu Items', value: menuItems?.length || 0 },
    { label: 'Gallery Photos', value: gallery?.length || 0 },
    { label: 'Unread Messages', value: unreadMessages.length },
    { label: 'Total Messages', value: messages?.length || 0 },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Website Control</p>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">Control Center</h1>
          <p className="text-gray-500 mt-3 max-w-2xl">
            Manage the core parts of your website in one place. Jump to any section,
            review quick stats, and keep the storefront polished.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Globe className="w-5 h-5" />
          View Live Website
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.to}
                  className="border border-gray-100 rounded-lg p-4 hover:border-blue-200 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="font-semibold text-gray-800">{action.label}</span>
                  </div>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Cafe Snapshot</h2>
            <p className="text-sm text-gray-500 mt-2">
              Keep these details fresh to ensure customers can reach you.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-400">Cafe Name</p>
              <p className="text-gray-800 font-semibold">{settings?.name || 'Not set yet'}</p>
            </div>
            <div>
              <p className="text-gray-400">Contact Email</p>
              <p className="text-gray-800">{settings?.contactEmail || 'Not set yet'}</p>
            </div>
            <div>
              <p className="text-gray-400">Address</p>
              <p className="text-gray-800">{settings?.address || 'Not set yet'}</p>
            </div>
            <div>
              <p className="text-gray-400">Last Updated</p>
              <p className="text-gray-800">
                {settings?.updatedAt ? new Date(settings.updatedAt).toLocaleString() : 'No updates yet'}
              </p>
            </div>
          </div>
          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold"
          >
            Edit cafe settings
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteControl;
