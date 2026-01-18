import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from './types';
import { renderStars } from './StarRating';

type CatalogSectionProps = {
  products: Product[];
  categories: string[];
  flavors: string[];
  selectedCategory: string;
  selectedFlavor: string;
  setSelectedCategory: (category: string) => void;
  setSelectedFlavor: (flavor: string) => void;
  addToCart: (product: Product) => void;
};

const CatalogSection = ({
  products,
  categories,
  flavors,
  selectedCategory,
  selectedFlavor,
  setSelectedCategory,
  setSelectedFlavor,
  addToCart,
}: CatalogSectionProps) => {
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const flavorMatch = selectedFlavor === 'Все' || product.flavor === selectedFlavor;
    return categoryMatch && flavorMatch;
  });

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-black mb-6 glow-cyan text-primary">
              Paradise<span className="glow-magenta text-secondary">Vape</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Премиальные устройства и жидкости для истинных ценителей
            </p>
            <Button size="lg" className="bg-gradient-neon text-background font-bold hover:opacity-90 transition-opacity">
              <Icon name="Zap" className="mr-2 w-5 h-5" />
              Смотреть каталог
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Категория</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-primary text-primary-foreground border-glow-cyan' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Вкус</h3>
              <div className="flex flex-wrap gap-2">
                {flavors.map(flavor => (
                  <Button
                    key={flavor}
                    variant={selectedFlavor === flavor ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFlavor(flavor)}
                    className={selectedFlavor === flavor ? 'bg-secondary text-secondary-foreground border-glow-magenta' : ''}
                  >
                    {flavor}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in">
                <CardHeader>
                  {product.discount && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground glow-gold">
                      -{product.discount}%
                    </Badge>
                  )}
                  <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="Cigarette" className="w-16 h-16 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-foreground">{product.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    {renderStars(product.rating)}
                    <span className="ml-2 text-sm text-muted-foreground">({product.reviews})</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    <Badge variant="outline" className="text-xs">{product.flavor}</Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    {product.discount ? (
                      <>
                        <span className="text-2xl font-bold text-neon-gold glow-gold">
                          {Math.round(product.price * (1 - product.discount / 100))}₽
                        </span>
                        <span className="text-sm text-muted-foreground line-through">{product.price}₽</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-primary glow-cyan">{product.price}₽</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 border-glow-cyan" 
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingBag" className="mr-2 w-4 h-4" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CatalogSection;