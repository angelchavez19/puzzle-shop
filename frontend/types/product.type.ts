export interface ProductI {
  _id: string;
  name: string;
  slug: string;
  description: Description;
  price: number;
  stock: number;
  tags: string[];
  category: Category;
  images: Image[];
}

export interface Category {
  _id: string;
  name: string;
}

export interface Description {
  longDescription: string;
}

export interface Image {
  _id: string;
  publicId: string;
  url: string;
  alt: string;
}
