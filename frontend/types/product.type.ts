export interface ProductI {
  _id: string;
  name: string;
  slug: string;
  description: DescriptionI;
  price: number;
  stock: number;
  images: string[];
  tags: string[];
  category: CategoryI;
}

export interface CategoryI {
  _id: string;
  name: string;
}

export interface DescriptionI {
  longDescription: string;
}
