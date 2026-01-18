import Icon from '@/components/ui/icon';

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

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Icon 
      key={i} 
      name={i < Math.floor(rating) ? 'Star' : 'StarHalf'} 
      className={`w-4 h-4 ${i < rating ? 'fill-neon-gold text-neon-gold' : 'text-muted-foreground'}`}
    />
  ));
};
