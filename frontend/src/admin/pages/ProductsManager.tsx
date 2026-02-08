import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Plus, Trash2, Edit2, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';

const emptyForm = {
  name: '',
  price: '',
  category: '',
  imageUrl: '',
  isActive: true,
  sortOrder: 0,
};

const ProductsManager = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then((res) => res.data),
  });

  useEffect(() => {
    if (!showForm && editingId) {
      setEditingId(null);
      setFormData(emptyForm);
      setImageFile(null);
    }
  }, [showForm, editingId]);

  const saveMutation = useMutation({
    mutationFn: ({ id, payload }: { id?: string; payload: FormData }) => {
      if (id) {
        return api.put(`/products/${id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      return api.post('/products', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      setImageFile(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      api.put(`/products/${id}`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('price', formData.price);
    payload.append('category', formData.category);
    payload.append('sortOrder', String(formData.sortOrder ?? 0));
    payload.append('isActive', String(formData.isActive));

    if (imageFile) {
      payload.append('image', imageFile);
    }

    if (formData.imageUrl) {
      payload.append('imageUrl', formData.imageUrl);
    }

    saveMutation.mutate({ id: editingId || undefined, payload });
  };

  const handleEdit = (product: any) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || '',
      price: product.price ?? '',
      category: product.category || '',
      imageUrl: product.imageUrl || '',
      isActive: product.isActive ?? true,
      sortOrder: product.sortOrder ?? 0,
    });
    setImageFile(null);
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products Manager</h1>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          {showForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name"
              className="p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              placeholder="Price"
              type="number"
              className="p-2 border rounded"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <input
              placeholder="Category"
              className="p-2 border rounded"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <input
              placeholder="Sort Order"
              type="number"
              className="p-2 border rounded"
              value={formData.sortOrder}
              onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
            />
            <input
              placeholder="Image URL (optional if uploading)"
              className="p-2 border rounded md:col-span-2"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
            <input
              type="file"
              className="p-2 border rounded md:col-span-2"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              Active
            </label>
          </div>
          <button
            type="submit"
            disabled={saveMutation.isPending}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {saveMutation.isPending
              ? 'Saving...'
              : editingId
              ? 'Update Product'
              : 'Save Product'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product: any) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <span className="text-green-600 font-bold">${product.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-4">
                {product.category} · Sort {product.sortOrder ?? 0}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() =>
                    toggleMutation.mutate({ id: product._id, isActive: !product.isActive })
                  }
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  {product.isActive ? (
                    <ToggleRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                  )}
                  {product.isActive ? 'Active' : 'Inactive'}
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure?')) {
                        deleteMutation.mutate(product._id);
                      }
                    }}
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

export default ProductsManager;
