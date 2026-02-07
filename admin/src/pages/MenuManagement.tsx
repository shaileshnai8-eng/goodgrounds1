import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Plus, Trash2, Edit2, Loader2 } from 'lucide-react';

const MenuManagement = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'Drinks' });
  const [image, setImage] = useState<File | null>(null);

  const { data: menuItems, isLoading } = useQuery({ 
    queryKey: ['menu'], 
    queryFn: () => api.get('/menu').then(res => res.data) 
  });

  const addMutation = useMutation({
    mutationFn: (formData: FormData) => api.post('/menu', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      setIsAdding(false);
      setNewItem({ name: '', description: '', price: '', category: 'Drinks' });
      setImage(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/menu/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('description', newItem.description);
    formData.append('price', newItem.price);
    formData.append('category', newItem.category);
    if (image) formData.append('image', image);
    addMutation.mutate(formData);
  };

  if (isLoading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          {isAdding ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              className="p-2 border rounded"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              required
            />
            <input
              placeholder="Price"
              type="number"
              className="p-2 border rounded"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              required
            />
            <select
              className="p-2 border rounded"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            >
              <option value="Drinks">Drinks</option>
              <option value="Snacks">Snacks</option>
            </select>
            <input
              type="file"
              className="p-2 border rounded"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            <textarea
              placeholder="Description"
              className="p-2 border rounded md:col-span-2"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={addMutation.isPending}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {addMutation.isPending ? 'Saving...' : 'Save Item'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems?.map((item: any) => (
          <div key={item._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {item.image && (
              <img src={item.image.url} alt={item.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <span className="text-green-600 font-bold">${item.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 bg-gray-100 text-xs rounded uppercase">{item.category}</span>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 className="w-4 h-4" /></button>
                  <button 
                    onClick={() => { if(window.confirm('Are you sure?')) deleteMutation.mutate(item._id) }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuManagement;
