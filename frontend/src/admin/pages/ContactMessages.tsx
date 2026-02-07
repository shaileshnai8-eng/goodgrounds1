import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Trash2, CheckCircle, Clock, Mail, User, Loader2 } from 'lucide-react';

const ContactMessages = () => {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({ 
    queryKey: ['messages'], 
    queryFn: () => api.get('/messages').then(res => res.data) 
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/messages/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => api.put(`/messages/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Messages</h1>
      
      <div className="space-y-4">
        {messages?.map((msg: any) => (
          <div 
            key={msg._id} 
            className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${msg.isRead ? 'border-gray-200' : 'border-blue-500'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="flex items-center text-sm font-medium text-gray-900">
                    <User className="w-4 h-4 mr-1 text-gray-400" />
                    {msg.name}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Mail className="w-4 h-4 mr-1 text-gray-400" />
                    {msg.email}
                  </span>
                  <span className="flex items-center text-xs text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">{msg.subject || 'No Subject'}</h3>
              </div>
              <div className="flex space-x-2">
                {!msg.isRead && (
                  <button 
                    onClick={() => markReadMutation.mutate(msg._id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                    title="Mark as read"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                <button 
                  onClick={() => { if(window.confirm('Delete message?')) deleteMutation.mutate(msg._id) }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
          </div>
        ))}

        {messages?.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No messages found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
