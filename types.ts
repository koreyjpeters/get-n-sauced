
export enum CategoryType {
  CARIBBEAN = 'Caribbean',
  SOUL_FOOD = 'Soul Food',
  VEGAN = 'Vegan'
}

export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  youtube?: string;
  yelp?: string;
  googleBusiness?: string;
}

export interface OperatingHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: OperatingHours;
  socials: SocialLinks;
  logoUrl: string;
  squareOrderUrl: string;
  deliveryEnabled: boolean;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  available: boolean;
  sortOrder: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  sortOrder: number;
  enabled: boolean;
}

export interface GalleryImage {
  id: string;
  category: 'Food' | 'Venue' | 'Catering-Events';
  imageUrl: string;
  alt: string;
  sortOrder: number;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'New' | 'In Progress' | 'Responded';
  createdAt: string;
}

export interface CateringRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDateTime: string;
  guestCount: number;
  venueType: 'Event Space Upstairs' | 'Offsite';
  fulfillment: 'Pickup' | 'Delivery';
  notes: string;
  status: 'New' | 'In Progress' | 'Responded';
  createdAt: string;
}
