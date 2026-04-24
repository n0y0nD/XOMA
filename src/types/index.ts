export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Editor {
  _id: string;
  name: string;
  role: string;
  rate: number;
  rating: number;
  reviewCount: number;
  available: boolean;
  skills: string[];
  bio: string;
  avatarUrl?: string;
  portfolioUrls?: string[];
  createdAt: string;
  reviews?: Review[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  editorId?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
