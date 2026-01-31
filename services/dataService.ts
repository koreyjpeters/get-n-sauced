
import { RestaurantInfo, MenuItem, MenuCategory, GalleryImage, ContactMessage, CateringRequest, EmailSubscriber } from '../types';

// Initial Mock Data
const initialInfo: RestaurantInfo = {
  name: "Get’n Sauced",
  tagline: "Café, Catering & Mobile Food Srvcs.",
  address: "29 Elm Ave, Mount Vernon, NY 10550",
  phone: "929.462.7172",
  email: "hello@getnsauced.com",
  hours: {
    monday: "11:00 AM - 9:00 PM",
    tuesday: "11:00 AM - 9:00 PM",
    wednesday: "11:00 AM - 9:00 PM",
    thursday: "11:00 AM - 10:00 PM",
    friday: "11:00 AM - 11:00 PM",
    saturday: "12:00 PM - 11:00 PM",
    sunday: "12:00 PM - 8:00 PM",
  },
  socials: {
    instagram: "https://instagram.com/getnsauced",
    tiktok: "https://tiktok.com/@getnsauced",
    facebook: "https://facebook.com/getnsauced",
  },
  logoUrl: "https://picsum.photos/200/200",
  squareOrderUrl: "https://order.square.site/getnsauced",
  deliveryEnabled: true,
};

const initialCategories: MenuCategory[] = [
  { id: 'bites', name: 'Bites', sortOrder: 0, enabled: true },
  { id: '1', name: 'Caribbean', sortOrder: 1, enabled: true },
  { id: '2', name: 'Soul Food', sortOrder: 2, enabled: true },
  { id: '3', name: 'Vegan', sortOrder: 3, enabled: true },
];

const initialItems: MenuItem[] = [
  { 
    id: 'b1', 
    categoryId: 'bites', 
    name: 'Chicken Dumplings', 
    description: 'Kung Pao (Spicy) or Teriyaki (Sweet) Chicken Dumplings, Pan-Fried served Side Sauced.', 
    price: 8.00, 
    imageUrl: 'https://picsum.photos/seed/dumpling/400/300', 
    tags: ['Spicy', 'Sweet'], 
    available: true, 
    sortOrder: 1 
  },
  { 
    id: 'b2', 
    categoryId: 'bites', 
    name: 'Garlic Bread Bruschetta', 
    description: 'Savory Garlic Bread & Fresh Tomato Bruschetta w/ Basil, Red Onion, Balsamic Glaze.', 
    price: 12.00, 
    imageUrl: 'https://picsum.photos/seed/bruschetta/400/300', 
    tags: ['Vegetarian'], 
    available: true, 
    sortOrder: 2 
  },
  { 
    id: 'b3', 
    categoryId: 'bites', 
    name: 'Pulled Chicken Sliders', 
    description: 'Pulled Chicken Meat Simmered in Savory Carolina Gold BBQ Sauce Served w/ Pickled Slaw on a Brioche Bun.', 
    price: 13.00, 
    imageUrl: 'https://picsum.photos/seed/sliders/400/300', 
    tags: ['BBQ', 'Chicken'], 
    available: true, 
    sortOrder: 3 
  },
  { 
    id: 'b4', 
    categoryId: 'bites', 
    name: 'Wangs-A-Trois', 
    description: 'Wings Deep Fried & Sauced Up in Sweet Chili, Garlic Buffalo & Lemon Pepper. Sweet, Spicy, Tangy.', 
    price: 12.00, 
    imageUrl: 'https://picsum.photos/seed/wings/400/300', 
    tags: ['Spicy', 'Wings'], 
    available: true, 
    sortOrder: 4 
  },
  { 
    id: 'b5', 
    categoryId: 'bites', 
    name: 'Chopped Cheese', 
    description: 'Ground Beef w/ Cheeses, Peppers & Onions on 6" Hero Bread. Your Choice of Mayo and/or Ketchup. w/ Shredded Romaine. A N.Y.C. Classic.', 
    price: 12.00, 
    imageUrl: 'https://picsum.photos/seed/choppedcheese/400/300', 
    tags: ['NYC Classic', 'Beef'], 
    available: true, 
    sortOrder: 5 
  }
];

const initialGallery: GalleryImage[] = [
  { id: 'g1', category: 'Food', imageUrl: 'https://picsum.photos/seed/g1/600/600', alt: 'Delicious Jerk Chicken', sortOrder: 1 },
  { id: 'g2', category: 'Venue', imageUrl: 'https://picsum.photos/seed/g2/600/600', alt: 'Our Interior', sortOrder: 2 },
  { id: 'g3', category: 'Catering-Events', imageUrl: 'https://picsum.photos/seed/g3/600/600', alt: 'Catering Event', sortOrder: 3 },
];

class DataService {
  private storageKey = 'getnsauced_db_v1';
  private db: {
    info: RestaurantInfo;
    categories: MenuCategory[];
    items: MenuItem[];
    gallery: GalleryImage[];
    subscribers: EmailSubscriber[];
    messages: ContactMessage[];
    catering: CateringRequest[];
  };

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.db = JSON.parse(saved);
      // Optional: Refresh init data if it's vastly different or for dev purposes, 
      // but for persistent storage simulation we usually trust localstorage.
      // For this demo, we'll force update info/menu if it looks like the old default.
      // A simple check: if tagline is the old one, update it.
      if (this.db.info.tagline === "Bold Caribbean Flavors & Comfort Soul Food") {
          this.db.info = initialInfo;
          this.db.categories = initialCategories;
          this.db.items = initialItems;
          this.save();
      }
    } else {
      this.db = {
        info: initialInfo,
        categories: initialCategories,
        items: initialItems,
        gallery: initialGallery,
        subscribers: [],
        messages: [],
        catering: [],
      };
      this.save();
    }
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.db));
  }

  // Public Getters
  getRestaurantInfo(): RestaurantInfo { return this.db.info; }
  getMenuCategories(): MenuCategory[] { return this.db.categories.sort((a,b) => a.sortOrder - b.sortOrder); }
  getMenuItems(): MenuItem[] { return this.db.items.sort((a,b) => a.sortOrder - b.sortOrder); }
  getGalleryImages(): GalleryImage[] { return this.db.gallery.sort((a,b) => a.sortOrder - b.sortOrder); }
  getSubscribers(): EmailSubscriber[] { return this.db.subscribers; }
  getMessages(): ContactMessage[] { return this.db.messages; }
  getCateringRequests(): CateringRequest[] { return this.db.catering; }

  // Admin Setters
  updateRestaurantInfo(info: RestaurantInfo) { this.db.info = info; this.save(); }
  
  updateMenuCategories(cats: MenuCategory[]) { this.db.categories = cats; this.save(); }
  updateMenuItems(items: MenuItem[]) { this.db.items = items; this.save(); }
  updateGallery(gallery: GalleryImage[]) { this.db.gallery = gallery; this.save(); }

  // Public Creations
  subscribeEmail(email: string) {
    if (this.db.subscribers.find(s => s.email === email)) return;
    this.db.subscribers.push({
      id: Math.random().toString(36).substr(2, 9),
      email,
      createdAt: new Date().toISOString()
    });
    this.save();
  }

  submitMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) {
    this.db.messages.unshift({
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      createdAt: new Date().toISOString()
    });
    this.save();
  }

  submitCatering(req: Omit<CateringRequest, 'id' | 'createdAt' | 'status'>) {
    this.db.catering.unshift({
      ...req,
      id: Math.random().toString(36).substr(2, 9),
      status: 'New',
      createdAt: new Date().toISOString()
    });
    this.save();
  }
}

export const dataService = new DataService();
