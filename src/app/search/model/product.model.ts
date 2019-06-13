
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
  review: Likes;
}
export interface Review {
  dateTime: Date;
  rating: number;
  comment: string;
  review: Likes;
}
export interface Deal {
  dateTime: Date;
  link: string;
  price: number;
  store: string;
  review: Likes;
}
export interface Likes {
  liked: string[];
  unliked: string[];
}


