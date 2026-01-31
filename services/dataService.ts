import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore';
import { getDb } from './firebase';
import type {
  RestaurantInfo,
  MenuItem,
  MenuCategory,
  GalleryImage,
  ContactMessage,
  CateringRequest,
  EmailSubscriber,
} from '../types';

// Firestore paths
const CONFIG_COLLECTION = 'config';
const RESTAURANT_DOC = 'restaurant';
const COL_CATEGORIES = 'menuCategories';
const COL_ITEMS = 'menuItems';
const COL_GALLERY = 'gallery';
const COL_SUBSCRIBERS = 'subscribers';
const COL_MESSAGES = 'contactMessages';
const COL_CATERING = 'cateringRequests';

// Default data (used when Firestore is empty and for initial cache)
export const defaultRestaurantInfo: RestaurantInfo = {
  name: "Get'n Sauced",
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

const defaultCategories: MenuCategory[] = [
  { id: 'bites', name: 'Bites', sortOrder: 0, enabled: true },
  { id: '1', name: 'Caribbean', sortOrder: 1, enabled: true },
  { id: '2', name: 'Soul Food', sortOrder: 2, enabled: true },
  { id: '3', name: 'Vegan', sortOrder: 3, enabled: true },
];

const defaultItems: MenuItem[] = [
  { id: 'b1', categoryId: 'bites', name: 'Chicken Dumplings', description: 'Kung Pao (Spicy) or Teriyaki (Sweet) Chicken Dumplings, Pan-Fried served Side Sauced.', price: 8.00, imageUrl: 'https://picsum.photos/seed/dumpling/400/300', tags: ['Spicy', 'Sweet'], available: true, sortOrder: 1 },
  { id: 'b2', categoryId: 'bites', name: 'Garlic Bread Bruschetta', description: 'Savory Garlic Bread & Fresh Tomato Bruschetta w/ Basil, Red Onion, Balsamic Glaze.', price: 12.00, imageUrl: 'https://picsum.photos/seed/bruschetta/400/300', tags: ['Vegetarian'], available: true, sortOrder: 2 },
  { id: 'b3', categoryId: 'bites', name: 'Pulled Chicken Sliders', description: 'Pulled Chicken Meat Simmered in Savory Carolina Gold BBQ Sauce Served w/ Pickled Slaw on a Brioche Bun.', price: 13.00, imageUrl: 'https://picsum.photos/seed/sliders/400/300', tags: ['BBQ', 'Chicken'], available: true, sortOrder: 3 },
  { id: 'b4', categoryId: 'bites', name: 'Wangs-A-Trois', description: 'Wings Deep Fried & Sauced Up in Sweet Chili, Garlic Buffalo & Lemon Pepper. Sweet, Spicy, Tangy.', price: 12.00, imageUrl: 'https://picsum.photos/seed/wings/400/300', tags: ['Spicy', 'Wings'], available: true, sortOrder: 4 },
  { id: 'b5', categoryId: 'bites', name: 'Chopped Cheese', description: 'Ground Beef w/ Cheeses, Peppers & Onions on 6" Hero Bread. Your Choice of Mayo and/or Ketchup. w/ Shredded Romaine. A N.Y.C. Classic.', price: 12.00, imageUrl: 'https://picsum.photos/seed/choppedcheese/400/300', tags: ['NYC Classic', 'Beef'], available: true, sortOrder: 5 },
];

const defaultGallery: GalleryImage[] = [
  { id: 'g1', category: 'Food', imageUrl: 'https://picsum.photos/seed/g1/600/600', alt: 'Delicious Jerk Chicken', sortOrder: 1 },
  { id: 'g2', category: 'Venue', imageUrl: 'https://picsum.photos/seed/g2/600/600', alt: 'Our Interior', sortOrder: 2 },
  { id: 'g3', category: 'Catering-Events', imageUrl: 'https://picsum.photos/seed/g3/600/600', alt: 'Catering Event', sortOrder: 3 },
];

// In-memory cache (populated by init())
type Cache = {
  info: RestaurantInfo;
  categories: MenuCategory[];
  items: MenuItem[];
  gallery: GalleryImage[];
  subscribers: EmailSubscriber[];
  messages: ContactMessage[];
  catering: CateringRequest[];
};

let cache: Cache | null = null;
let initPromise: Promise<void> | null = null;

function getCache(): Cache {
  if (!cache) {
    cache = {
      info: defaultRestaurantInfo,
      categories: defaultCategories,
      items: defaultItems,
      gallery: defaultGallery,
      subscribers: [],
      messages: [],
      catering: [],
    };
  }
  return cache;
}

async function seedFirestore(db: ReturnType<typeof getDb>) {
  const c = getCache();
  await setDoc(doc(db, CONFIG_RESTAURANT), c.info);
  for (const cat of c.categories) {
    await setDoc(doc(db, COL_CATEGORIES, cat.id), cat);
  }
  for (const item of c.items) {
    await setDoc(doc(db, COL_ITEMS, item.id), item);
  }
  for (const img of c.gallery) {
    await setDoc(doc(db, COL_GALLERY, img.id), img);
  }
}

/** Load all data from Firestore into cache. Call once on app mount. Seeds defaults if empty. */
export async function initDataService(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const db = getDb();
    const restaurantSnap = await getDoc(doc(db, CONFIG_COLLECTION, RESTAURANT_DOC));
    if (!restaurantSnap.exists()) {
      await seedFirestore(db);
      return;
    }
    const info = restaurantSnap.data() as RestaurantInfo;
    const [categoriesSnap, itemsSnap, gallerySnap, subsSnap, messagesSnap, cateringSnap] = await Promise.all([
      getDocs(collection(db, COL_CATEGORIES)),
      getDocs(collection(db, COL_ITEMS)),
      getDocs(collection(db, COL_GALLERY)),
      getDocs(collection(db, COL_SUBSCRIBERS)),
      getDocs(query(collection(db, COL_MESSAGES), orderBy('createdAt', 'desc'))),
      getDocs(query(collection(db, COL_CATERING), orderBy('createdAt', 'desc'))),
    ]);
    const toArray = <T>(snap: { docs: { id: string; data: () => DocumentData }[] }, toItem: (id: string, d: DocumentData) => T): T[] =>
      snap.docs.map((d) => toItem(d.id, d.data()));
    const categories = toArray(categoriesSnap, (id, d) => ({ ...d, id } as MenuCategory)).sort((a, b) => a.sortOrder - b.sortOrder);
    const items = toArray(itemsSnap, (id, d) => ({ ...d, id } as MenuItem)).sort((a, b) => a.sortOrder - b.sortOrder);
    const gallery = toArray(gallerySnap, (id, d) => ({ ...d, id } as GalleryImage)).sort((a, b) => a.sortOrder - b.sortOrder);
    const subscribers = toArray(subsSnap, (id, d) => ({ ...d, id, createdAt: (d.createdAt?.toDate?.() ?? new Date(d.createdAt)).toISOString() } as EmailSubscriber));
    const messages = toArray(messagesSnap, (id, d) => ({ ...d, id, createdAt: (d.createdAt?.toDate?.() ?? new Date(d.createdAt)).toISOString() } as ContactMessage));
    const catering = toArray(cateringSnap, (id, d) => ({ ...d, id, createdAt: (d.createdAt?.toDate?.() ?? new Date(d.createdAt)).toISOString() } as CateringRequest));
    cache = { info, categories, items, gallery, subscribers, messages, catering };
  })();
  return initPromise;
}

// ——— Sync getters (from cache) ———
export function getRestaurantInfo(): RestaurantInfo {
  return getCache().info;
}
export function getMenuCategories(): MenuCategory[] {
  return [...getCache().categories].sort((a, b) => a.sortOrder - b.sortOrder);
}
export function getMenuItems(): MenuItem[] {
  return [...getCache().items].sort((a, b) => a.sortOrder - b.sortOrder);
}
export function getGalleryImages(): GalleryImage[] {
  return [...getCache().gallery].sort((a, b) => a.sortOrder - b.sortOrder);
}
export function getSubscribers(): EmailSubscriber[] {
  return getCache().subscribers;
}
export function getMessages(): ContactMessage[] {
  return getCache().messages;
}
export function getCateringRequests(): CateringRequest[] {
  return getCache().catering;
}

// ——— Async admin setters (write to Firestore + cache) ———
export async function updateRestaurantInfo(info: RestaurantInfo): Promise<void> {
  const db = getDb();
  await setDoc(doc(db, CONFIG_COLLECTION, RESTAURANT_DOC), info);
  getCache().info = info;
}

export async function updateMenuCategories(cats: MenuCategory[]): Promise<void> {
  const db = getDb();
  const batch = cats.map((c) => setDoc(doc(db, COL_CATEGORIES, c.id), c));
  await Promise.all(batch);
  getCache().categories = cats;
}

export async function updateMenuItems(items: MenuItem[]): Promise<void> {
  const db = getDb();
  const batch = items.map((i) => setDoc(doc(db, COL_ITEMS, i.id), i));
  await Promise.all(batch);
  getCache().items = items;
}

export async function updateGallery(gallery: GalleryImage[]): Promise<void> {
  const db = getDb();
  const batch = gallery.map((g) => setDoc(doc(db, COL_GALLERY, g.id), g));
  await Promise.all(batch);
  getCache().gallery = gallery;
}

// ——— Async public writes ———
export async function subscribeEmail(email: string): Promise<void> {
  const c = getCache();
  if (c.subscribers.some((s) => s.email === email)) return;
  const db = getDb();
  const ref = await addDoc(collection(db, COL_SUBSCRIBERS), {
    email,
    createdAt: serverTimestamp(),
  });
  const createdAt = new Date().toISOString();
  c.subscribers.push({ id: ref.id, email, createdAt });
}

export async function submitMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<void> {
  const db = getDb();
  const ref = await addDoc(collection(db, COL_MESSAGES), {
    ...msg,
    status: 'New',
    createdAt: serverTimestamp(),
  });
  getCache().messages.unshift({
    ...msg,
    id: ref.id,
    status: 'New',
    createdAt: new Date().toISOString(),
  });
}

export async function submitCatering(req: Omit<CateringRequest, 'id' | 'createdAt' | 'status'>): Promise<void> {
  const db = getDb();
  const ref = await addDoc(collection(db, COL_CATERING), {
    ...req,
    status: 'New',
    createdAt: serverTimestamp(),
  });
  getCache().catering.unshift({
    ...req,
    id: ref.id,
    status: 'New',
    createdAt: new Date().toISOString(),
  });
}

// Single export for backward compatibility (sync getters + async methods on same object)
export const dataService = {
  getRestaurantInfo,
  getMenuCategories,
  getMenuItems,
  getGalleryImages,
  getSubscribers,
  getMessages,
  getCateringRequests,
  updateRestaurantInfo,
  updateMenuCategories,
  updateMenuItems,
  updateGallery,
  subscribeEmail,
  submitMessage,
  submitCatering,
  init: initDataService,
};
