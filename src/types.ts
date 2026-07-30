export type MenuCategory = 
  | 'All' 
  | 'Burgers' 
  | 'Ethiopian Fusion' 
  | 'Pizza' 
  | 'Wraps & Sandwiches' 
  | 'Pasta' 
  | 'Breakfast' 
  | 'Drinks & Shakes';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // In ETB (Ethiopian Birr)
  category: MenuCategory;
  image: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isNew?: boolean;
  isAvailable?: boolean;
  tags?: string[];
  options?: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOption?: string;
  specialInstructions?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  favoriteDish: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Atmosphere' | 'Food' | 'Kitchen' | 'Neon' | 'Exterior';
  image: string;
  caption: string;
  instagramLink?: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  country: string;
  plusCode?: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  hours: string;
  quote: string;
}
