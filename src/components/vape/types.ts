export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  flavor: string;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
};

export type CartItem = Product & { quantity: number };
