import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Loader2, Save, ExternalLink } from 'lucide-react';

const HomepageSettings = () => {
  const queryClient = useQueryClient();
  const { data: content, isLoading } = useQuery({
    queryKey: ['homepage'],
    queryFn: () => api.get('/homepage').then((res) => res.data),
  });

  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (content) {
      setFormData({
        tagline: content.tagline || '',
        titlePart1: content.titlePart1 || '',
        titlePart2: content.titlePart2 || '',
        description: content.description || '',
        button1Text: content.button1Text || '',
        button1Link: content.button1Link || '',
        button2Text: content.button2Text || '',
        button2Link: content.button2Link || '',
        videoUrl: content.videoUrl || '',
        heroBgType: content.heroBgType || 'image',
        heroBgUrl: content.heroBgUrl || '',
      });
    }
  }, [content]);

  const mutation = useMutation({
    mutationFn: (payload: any) => api.put('/homepage', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homepage'] });
      alert('Homepage content updated successfully!');
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  if (isLoading || !formData) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Homepage Settings</h1>
          <p className="text-gray-500 mt-2">
            Update the hero content shown on the homepage without touching the layout.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Preview Homepage
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Hero Content</h2>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Tagline</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title Part 1 (gold)</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.titlePart1}
              onChange={(e) => setFormData({ ...formData, titlePart1: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title Part 2 (white)</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.titlePart2}
              onChange={(e) => setFormData({ ...formData, titlePart2: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500">Tip: use a "|" to split the title into two lines.</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Button 1 Text</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.button1Text}
              onChange={(e) => setFormData({ ...formData, button1Text: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Button 1 Link</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.button1Link}
              onChange={(e) => setFormData({ ...formData, button1Link: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Button 2 Text</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.button2Text}
              onChange={(e) => setFormData({ ...formData, button2Text: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Button 2 Link</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.button2Link}
              onChange={(e) => setFormData({ ...formData, button2Link: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Video URL</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Hero Background Type</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.heroBgType}
              onChange={(e) => setFormData({ ...formData, heroBgType: e.target.value })}
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Hero Background URL</label>
            <input
              className="w-full p-2 border rounded"
              value={formData.heroBgUrl}
              onChange={(e) => setFormData({ ...formData, heroBgUrl: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-8 flex items-center px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" />
          {mutation.isPending ? 'Saving...' : 'Save Homepage Content'}
        </button>
      </form>
    </div>
  );
};

export default HomepageSettings;
