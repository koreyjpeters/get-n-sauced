
import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirebaseAuth } from '../../services/firebase';
import { dataService } from '../../services/dataService';
import { uploadImage } from '../../services/uploadService';
import { RestaurantInfo, MenuItem, MenuCategory, GalleryImage } from '../../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('settings');
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthReady(true);
      if (!user) navigate('/admin');
    });
    return () => unsub();
  }, [navigate]);

  const handleLogout = () => {
    signOut(getFirebaseAuth()).then(() => navigate('/admin'));
  };

  if (!authReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-bold">Loading…</p>
      </div>
    );
  }

  const navItems = [
    { id: 'settings', label: 'Restaurant', path: '/admin/dashboard', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { id: 'menu', label: 'Menu', path: '/admin/dashboard/menu', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'gallery', label: 'Gallery', path: '/admin/dashboard/gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'inbox', label: 'Inbox', path: '/admin/dashboard/inbox', icon: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-8 5-8-5' },
    { id: 'catering', label: 'Catering', path: '/admin/dashboard/catering', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: 'subscribers', label: 'Emails', path: '/admin/dashboard/subscribers', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex-shrink-0 flex flex-col">
        <div className="p-8 border-b border-white/5">
           <Link to="/" className="flex items-center gap-3">
              <span className="text-xl font-black font-playfair tracking-tight">Admin Portal</span>
           </Link>
        </div>
        <nav className="flex-grow py-6 px-4 space-y-2">
          {navItems.map(item => (
            <Link 
              key={item.id} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path ? 'bg-sauce-orange-500 text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/></svg>
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
           <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span className="font-bold text-sm">Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-auto p-10">
        <Routes>
          <Route path="/" element={<RestaurantSettings />} />
          <Route path="/menu" element={<MenuManager />} />
          <Route path="/gallery" element={<GalleryManager />} />
          <Route path="/inbox" element={<InboxManager />} />
          <Route path="/catering" element={<CateringManager />} />
          <Route path="/subscribers" element={<SubscriberManager />} />
        </Routes>
      </main>
    </div>
  );
};

// --- Sub-components for Admin Views ---

const RestaurantSettings = () => {
  const [info, setInfo] = useState<RestaurantInfo>(dataService.getRestaurantInfo());
  const handleSave = (e: React.FormEvent) => { e.preventDefault(); dataService.updateRestaurantInfo(info); alert('Saved!'); };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-black mb-10">Restaurant Settings</h2>
      <form onSubmit={handleSave} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Tagline</label>
            <input className="w-full bg-gray-50 rounded-xl px-5 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500" value={info.tagline} onChange={e => setInfo({...info, tagline: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Address</label>
            <input className="w-full bg-gray-50 rounded-xl px-5 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500" value={info.address} onChange={e => setInfo({...info, address: e.target.value})} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Phone</label>
            <input className="w-full bg-gray-50 rounded-xl px-5 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500" value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email</label>
            <input className="w-full bg-gray-50 rounded-xl px-5 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500" value={info.email} onChange={e => setInfo({...info, email: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Square Order URL</label>
          <input className="w-full bg-gray-50 rounded-xl px-5 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500" value={info.squareOrderUrl} onChange={e => setInfo({...info, squareOrderUrl: e.target.value})} />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" checked={info.deliveryEnabled} onChange={e => setInfo({...info, deliveryEnabled: e.target.checked})} className="w-5 h-5 accent-sauce-orange-500" />
          <span className="font-bold text-gray-700">Delivery Enabled</span>
        </div>
        <button type="submit" disabled={saving} className="bg-sauce-orange-500 text-white font-black px-10 py-4 rounded-xl shadow-lg hover:bg-sauce-orange-600 disabled:opacity-50">Save Changes</button>
      </form>
    </div>
  );
};

const MenuManager = () => {
  const [items, setItems] = useState<MenuItem[]>(dataService.getMenuItems());
  const categories = dataService.getMenuCategories();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem>>({});
  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const toggleAvailability = async (id: string) => {
    const newItems = items.map(i => i.id === id ? { ...i, available: !i.available } : i);
    setItems(newItems);
    await dataService.updateMenuItems(newItems);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      const newItems = items.filter(i => i.id !== id);
      setItems(newItems);
      await dataService.updateMenuItems(newItems);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setTagInput(item.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem({
      id: '', // Will generate
      name: '',
      description: '',
      price: 0,
      imageUrl: 'https://picsum.photos/seed/new/400/300',
      categoryId: categories[0]?.id || '1',
      tags: [],
      available: true,
      sortOrder: items.length
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setUploadError(null);
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'menu');
      setEditingItem({ ...editingItem, imageUrl: url });
    } catch (err) {
      console.error(err);
      setUploadError('Upload failed. Try again or use a URL.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process tags
    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    let newItems = [...items];

    if (editingItem.id) {
      // Update existing
      newItems = newItems.map(i => i.id === editingItem.id ? { ...editingItem, tags } as MenuItem : i);
    } else {
      // Create new
      const newItem = {
        ...editingItem,
        id: Date.now().toString(),
        tags
      } as MenuItem;
      newItems.push(newItem);
    }

    setItems(newItems);
    dataService.updateMenuItems(newItems);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black">Menu Items</h2>
        <button onClick={handleAddNew} className="bg-sauce-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-sauce-orange-600 transition-colors shadow-lg">+ Add Item</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-6 border border-gray-100 group hover:border-sauce-orange-200 transition-colors">
            <img src={item.imageUrl} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
            <div className="flex-grow">
              <h3 className="font-black text-lg">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-1">${Number(item.price).toFixed(2)}</p>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-md">{categories.find(c => c.id === item.categoryId)?.name || 'Unknown Category'}</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleAvailability(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
              >
                {item.available ? 'Available' : 'Sold Out'}
              </button>
              <button 
                onClick={() => handleEdit(item)}
                className="text-gray-400 hover:text-sauce-orange-500 p-2 rounded-full hover:bg-sauce-orange-50 transition-colors"
                title="Edit"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M15.172 2.172a2 2 0 012.828 0l.939.94a2 2 0 010 2.829l-10.828 10.829a2 2 0 01-1.127.57l-4.135.59 1.586-4.135a2 2 0 01.57-1.126l10.828-10.828z"/></svg>
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-black mb-6">{editingItem.id ? 'Edit Item' : 'New Item'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                  value={editingItem.name || ''}
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required 
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                    value={editingItem.price || ''}
                    onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-1">Category</label>
                  <select 
                    className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                    value={editingItem.categoryId}
                    onChange={e => setEditingItem({...editingItem, categoryId: e.target.value})}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Description</label>
                <textarea 
                  rows={3}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                  value={editingItem.description || ''}
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Item Image</label>
                <div className="flex flex-col gap-2">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploadingImage}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-sauce-orange-50 file:text-sauce-orange-700
                        hover:file:bg-sauce-orange-100 disabled:opacity-50
                      "
                    />
                    {uploadingImage && <p className="text-xs font-bold text-sauce-orange-600">Uploading…</p>}
                    {uploadError && <p className="text-xs font-bold text-red-500">{uploadError}</p>}
                    <div className="text-center text-xs text-gray-300 font-bold uppercase">- OR -</div>
                    <input 
                      type="text" 
                      placeholder="Paste Image URL"
                      className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                      value={editingItem.imageUrl || ''}
                      onChange={e => setEditingItem({...editingItem, imageUrl: e.target.value})}
                    />
                </div>
              </div>

              {editingItem.imageUrl && (
                  <div className="h-40 w-full rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                      <img src={editingItem.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Tags (comma separated)</label>
                <input 
                  type="text" 
                  placeholder="Spicy, Vegan, Popular"
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 accent-sauce-orange-500"
                  checked={editingItem.available}
                  onChange={e => setEditingItem({...editingItem, available: e.target.checked})}
                />
                <label className="font-bold text-gray-700">Available to Order</label>
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 bg-sauce-orange-500 text-white font-bold py-3 rounded-xl hover:bg-sauce-orange-600 shadow-lg transition-colors"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryManager = () => {
  const [gallery, setGallery] = useState<GalleryImage[]>(dataService.getGalleryImages());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    category: 'Food',
    alt: '',
    imageUrl: ''
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Remove this image?')) {
      const newGallery = gallery.filter(g => g.id !== id);
      setGallery(newGallery);
      await dataService.updateGallery(newGallery);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setUploadError(null);
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'gallery');
      setNewImage({ ...newImage, imageUrl: url });
    } catch (err) {
      console.error(err);
      setUploadError('Upload failed. Try again or use a URL.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage.imageUrl || !newImage.alt) return;
    const newItem: GalleryImage = {
      id: Date.now().toString(),
      category: newImage.category as GalleryImage['category'],
      imageUrl: newImage.imageUrl,
      alt: newImage.alt || '',
      sortOrder: gallery.length + 1,
    };
    const updatedGallery = [...gallery, newItem];
    setGallery(updatedGallery);
    await dataService.updateGallery(updatedGallery);
    setIsModalOpen(false);
    setNewImage({ category: 'Food', alt: '', imageUrl: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black">Gallery</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-sauce-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-sauce-orange-600 shadow-lg transition-colors"
        >
          + Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {gallery.map(img => (
          <div key={img.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-200">
            <img src={img.imageUrl} className="w-full h-full object-cover" alt={img.alt} />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button onClick={() => handleDelete(img.id)} className="bg-white text-red-500 p-2 rounded-full hover:bg-red-50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
            <div className="absolute bottom-2 left-2">
                <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">{img.category}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black mb-6">Upload Image</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Image Source</label>
                <div className="flex flex-col gap-2">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={uploadingImage}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-sauce-orange-50 file:text-sauce-orange-700
                        hover:file:bg-sauce-orange-100 disabled:opacity-50
                      "
                    />
                    {uploadingImage && <p className="text-xs font-bold text-sauce-orange-600">Uploading…</p>}
                    {uploadError && <p className="text-xs font-bold text-red-500">{uploadError}</p>}
                    <div className="text-center text-xs text-gray-300 font-bold uppercase">- OR -</div>
                    <input 
                      type="text" 
                      placeholder="Paste Image URL"
                      className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                      value={newImage.imageUrl || ''}
                      onChange={e => setNewImage({...newImage, imageUrl: e.target.value})}
                    />
                </div>
              </div>
              
              {newImage.imageUrl && (
                  <div className="h-40 w-full rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                      <img src={newImage.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                  </div>
              )}

              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Category</label>
                <select 
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                  value={newImage.category}
                  onChange={e => setNewImage({...newImage, category: e.target.value as any})}
                >
                  <option value="Food">Food</option>
                  <option value="Venue">Venue</option>
                  <option value="Catering-Events">Catering & Events</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-gray-400 mb-1">Alt Text (Description)</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Spicy Jerk Chicken Platter"
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-sauce-orange-500"
                  value={newImage.alt || ''}
                  onChange={e => setNewImage({...newImage, alt: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!newImage.imageUrl || !newImage.alt}
                  className="flex-1 bg-sauce-orange-500 text-white font-bold py-3 rounded-xl hover:bg-sauce-orange-600 shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const InboxManager = () => {
  const messages = dataService.getMessages();
  return (
    <div>
      <h2 className="text-3xl font-black mb-10">Contact Messages</h2>
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex justify-between mb-4">
               <div>
                  <h3 className="font-black text-xl">{m.name}</h3>
                  <p className="text-sm text-gray-400 font-bold">{m.email} • {new Date(m.createdAt).toLocaleDateString()}</p>
               </div>
               <span className="px-3 py-1 bg-sauce-orange-100 text-sauce-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest h-fit">{m.status}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-gray-400 font-bold text-center py-20 bg-white rounded-3xl border-2 border-dashed">No messages in your inbox.</p>}
      </div>
    </div>
  );
};

const CateringManager = () => {
  const catering = dataService.getCateringRequests();
  return (
    <div>
      <h2 className="text-3xl font-black mb-10">Catering Requests</h2>
      <div className="grid grid-cols-1 gap-6">
        {catering.map(r => (
          <div key={r.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black">{r.name}</h3>
                  <p className="text-sm text-gray-400 font-bold">{r.email} • {r.phone}</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">{r.status}</span>
                  <p className="text-xs font-black text-charcoal uppercase">Date: {new Date(r.eventDateTime).toLocaleString()}</p>
                </div>
             </div>
             <div className="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-gray-50">
                <div><p className="text-[10px] font-black text-gray-400 uppercase">Guests</p><p className="font-bold">{r.guestCount}</p></div>
                <div><p className="text-[10px] font-black text-gray-400 uppercase">Venue</p><p className="font-bold">{r.venueType}</p></div>
                <div><p className="text-[10px] font-black text-gray-400 uppercase">Fulfillment</p><p className="font-bold">{r.fulfillment}</p></div>
             </div>
             <p className="text-gray-600 italic">"{r.notes}"</p>
          </div>
        ))}
        {catering.length === 0 && <p className="text-gray-400 font-bold text-center py-20 bg-white rounded-3xl border-2 border-dashed">No catering requests yet.</p>}
      </div>
    </div>
  );
};

const SubscriberManager = () => {
  const subs = dataService.getSubscribers();
  const exportCsv = () => {
    const csv = 'Email,Date\n' + subs.map(s => `${s.email},${s.createdAt}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black">Email Subscribers ({subs.length})</h2>
        <button onClick={exportCsv} className="bg-charcoal text-white px-6 py-2 rounded-xl font-bold">Export CSV</button>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs font-black uppercase text-gray-400 tracking-widest">
            <tr><th className="px-8 py-4">Email</th><th className="px-8 py-4">Joined</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {subs.map(s => (
              <tr key={s.id} className="hover:bg-gray-50/50">
                <td className="px-8 py-4 font-bold text-charcoal">{s.email}</td>
                <td className="px-8 py-4 text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {subs.length === 0 && <p className="text-gray-400 font-bold text-center py-10">No subscribers yet.</p>}
      </div>
    </div>
  );
};

export default AdminDashboard;
