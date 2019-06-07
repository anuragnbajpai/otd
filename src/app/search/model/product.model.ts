
export interface Product {
  active: boolean;
  avgRating: number;
  brand: string;
  category: string;
  country: string;
  currency: string;
  dateTime: Date;
  description: string;
  features: Feature[];
  id: string;
  picture: string;
  ranking: number;
  title: string;
  images: Image[];
  reviews: Review[];
  deals: Deal[];
  isCompare: boolean;
  isSelected: boolean;
}

export interface Feature {
  key: string;
  value: string;
}
export interface Image {
  dateTime: Date;
  link: string;
  description: string;
}
export interface Review {
  dateTime: Date;
  rating: number;
  comment: string;
}
export interface Deal {
  dateTime: Date;
  link: string;
  price: number;
  store: string;
}


