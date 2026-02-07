import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Coffee, MessageSquare, Image as ImageIcon, Users } from 'lucide-react';

const Dashboard = () => {
  const { data: menuItems } = useQuery({ queryKey: ['menu'], queryFn: () => api.get('/menu').then(res => res.data) });
  const { data: messages } = useQuery({ queryKey: ['messages'], queryFn: () => api.get('/messages').then(res => res.data) });
  const { data: gallery } = useQuery({ queryKey: ['gallery'], queryFn: () => api.get('/gallery').then(res => res.data) });

  const stats = [
    { label: 'Total Menu Items', value: menuItems?.length || 0, icon: Coffee, color: 'bg-blue-500' },
    { label: 'Unread Messages', value: messages?.filter((m: any) => !m.isRead).length || 0, icon: MessageSquare, color: 'bg-green-500' },
    { label: 'Gallery Images', value: gallery?.length || 0, icon: ImageIcon, color: 'bg-purple-500' },
    { label: 'Total Messages', value: messages?.length || 0, icon: Users, color: 'bg-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg mr-4 text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
