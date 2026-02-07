import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Save, Loader2 } from 'lucide-react';

const CafeSettings = () => {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery({ 
    queryKey: ['settings'], 
    queryFn: () => api.get('/settings').then(res => res.data) 
  });

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const mutation = useMutation({
    mutationFn: (newSettings: any) => api.put('/settings', newSettings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      alert('Settings updated successfully!');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading || !formData) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Cafe Settings</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">General Information</h2>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cafe Name</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.contactEmail || ''}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              className="w-full p-2 border rounded"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="md:col-span-2 mt-4">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Opening Hours</h2>
          </div>
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
            <div key={day} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">{day}</label>
              <input
                className="w-full p-2 border rounded"
                placeholder="e.g. 08:00 - 20:00"
                value={formData.openingHours?.[day] || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  openingHours: { ...formData.openingHours, [day]: e.target.value }
                })}
              />
            </div>
          ))}

          <div className="md:col-span-2 mt-4">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Social Media</h2>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.socialMedia?.instagram || ''}
              onChange={(e) => setFormData({
                ...formData,
                socialMedia: { ...formData.socialMedia, instagram: e.target.value }
              })}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.socialMedia?.facebook || ''}
              onChange={(e) => setFormData({
                ...formData,
                socialMedia: { ...formData.socialMedia, facebook: e.target.value }
              })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-8 flex items-center px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" />
          {mutation.isPending ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default CafeSettings;
