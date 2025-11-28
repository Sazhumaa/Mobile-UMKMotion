export interface UMKMLocation {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  distance: number;
  address: string;
  phone: string;
  openHours: string;
  image: string;
  lat: number;
  lng: number;
  verified: boolean;
  description: string;
  isOpen: boolean;
  photos: string[];
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  description: string;
  category?: string;
  discount?: number;
  _altImage?: string;
}