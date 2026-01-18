import Icon from '@/components/ui/icon';

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, i) => (
    <Icon 
      key={i} 
      name={i < Math.floor(rating) ? 'Star' : 'StarHalf'} 
      className={`w-4 h-4 ${i < rating ? 'fill-neon-gold text-neon-gold' : 'text-muted-foreground'}`}
    />
  ));
};
