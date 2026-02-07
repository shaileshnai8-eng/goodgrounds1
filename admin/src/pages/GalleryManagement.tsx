import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Plus, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';

const GalleryManagement = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const { data: images, isLoading } = useQuery({ 
    queryKey: ['gallery'], 
    queryFn: () => api.get('/gallery').then(res => res.data) 
  });

  const addMutation = useMutation({
    mutationFn: (formData: FormData) => api.post('/gallery', formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      setIsAdding(false);
      setCaption('');
      setImage(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/gallery/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);
    addMutation.mutate(formData);
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gallery Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          {isAdding ? 'Cancel' : 'Add Image'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
              <input
                type="file"
                className="w-full p-2 border rounded"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Caption (Optional)</label>
              <input
                placeholder="Image caption"
                className="w-full p-2 border rounded"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={addMutation.isPending}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {addMutation.isPending ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images?.map((img: any) => (
          <div key={img._id} className="relative group rounded-lg overflow-hidden bg-gray-200 aspect-square">
            <img 
              src={img.image.url} 
              alt={img.caption} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
              <button
                onClick={() => { if(window.confirm('Delete this image?')) deleteMutation.mutate(img._id) }}
                className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-xs truncate">
                    {img.caption}
                </div>
            )}
          </div>
        ))}
        {images?.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-400">
                <ImageIcon className="w-12 h-12 mb-2" />
                <p>No images in gallery yet</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManagement;
