import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type Product = {
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

type CartItem = Product & { quantity: number };

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('Все');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('catalog');

  const products: Product[] = [
    { id: 1, name: 'Cloud Master Pro', price: 3500, category: 'POD-системы', flavor: 'Фруктовый', rating: 4.8, reviews: 124, image: '/placeholder.svg', discount: 20 },
    { id: 2, name: 'Vape Elite X', price: 5200, category: 'Моды', flavor: 'Мятный', rating: 4.9, reviews: 89, image: '/placeholder.svg' },
    { id: 3, name: 'Paradise Mix 50ml', price: 800, category: 'Жидкости', flavor: 'Тропический', rating: 4.7, reviews: 256, image: '/placeholder.svg', discount: 15 },
    { id: 4, name: 'Nano Pod Lite', price: 2100, category: 'POD-системы', flavor: 'Ягодный', rating: 4.6, reviews: 167, image: '/placeholder.svg' },
    { id: 5, name: 'Berry Blast 30ml', price: 650, category: 'Жидкости', flavor: 'Ягодный', rating: 4.8, reviews: 312, image: '/placeholder.svg' },
    { id: 6, name: 'Ultra Mod 220W', price: 7800, category: 'Моды', flavor: 'Табачный', rating: 4.9, reviews: 45, image: '/placeholder.svg' },
  ];

  const categories = ['Все', 'POD-системы', 'Моды', 'Жидкости'];
  const flavors = ['Все', 'Фруктовый', 'Ягодный', 'Мятный', 'Тропический', 'Табачный'];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const flavorMatch = selectedFlavor === 'Все' || product.flavor === selectedFlavor;
    return categoryMatch && flavorMatch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
      return sum + price * item.quantity;
    }, 0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icon 
        key={i} 
        name={i < Math.floor(rating) ? 'Star' : 'StarHalf'} 
        className={`w-4 h-4 ${i < rating ? 'fill-neon-gold text-neon-gold' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-black glow-cyan text-primary">ParadiseVape</h1>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveSection('catalog')} className="text-foreground hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('about')} className="text-foreground hover:text-primary transition-colors">О нас</button>
              <button onClick={() => setActiveSection('discounts')} className="text-foreground hover:text-primary transition-colors">Скидки</button>
              <button onClick={() => setActiveSection('delivery')} className="text-foreground hover:text-primary transition-colors">Доставка</button>
              <button onClick={() => setActiveSection('reviews')} className="text-foreground hover:text-primary transition-colors">Отзывы</button>
              <button onClick={() => setActiveSection('contacts')} className="text-foreground hover:text-primary transition-colors">Контакты</button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative border-glow-cyan">
                  <Icon name="ShoppingCart" className="w-5 h-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-card border-l border-border overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-2xl glow-magenta text-secondary">Корзина</SheetTitle>
                  <SheetDescription>Товаров: {cart.reduce((sum, item) => sum + item.quantity, 0)}</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-3 bg-background rounded-lg border border-border">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.discount ? (
                                <>
                                  <span className="line-through mr-2">{item.price}₽</span>
                                  <span className="text-neon-gold">{Math.round(item.price * (1 - item.discount / 100))}₽</span>
                                </>
                              ) : (
                                <span>{item.price}₽</span>
                              )}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Icon name="Minus" className="w-3 h-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Icon name="Plus" className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="ml-auto text-destructive" onClick={() => removeFromCart(item.id)}>
                                <Icon name="Trash2" className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-border pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold text-foreground">Итого:</span>
                          <span className="text-2xl font-bold glow-gold text-accent">{Math.round(calculateTotal())}₽</span>
                        </div>
                        <Button className="w-full bg-gradient-neon text-background font-bold hover:opacity-90 transition-opacity">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {activeSection === 'catalog' && (
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
      )}

      {activeSection === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center glow-cyan text-primary">О нас</h2>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg">
                ParadiseVape — это не просто магазин вейпов. Это место, где встречаются технологии и страсть к качественному парению.
              </p>
              <p className="text-lg">
                Мы тщательно отбираем каждый продукт, чтобы предложить вам только лучшее оборудование и жидкости от проверенных производителей.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <Icon name="Award" className="w-12 h-12 mx-auto mb-4 text-neon-gold" />
                  <h3 className="font-bold text-foreground mb-2">Премиум качество</h3>
                  <p className="text-sm">Только оригинальные продукты</p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <Icon name="Truck" className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold text-foreground mb-2">Быстрая доставка</h3>
                  <p className="text-sm">По всей России за 1-3 дня</p>
                </div>
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <Icon name="Headphones" className="w-12 h-12 mx-auto mb-4 text-secondary" />
                  <h3 className="font-bold text-foreground mb-2">Поддержка 24/7</h3>
                  <p className="text-sm">Всегда рады помочь</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'discounts' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center glow-gold text-accent">Скидки и акции</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {products.filter(p => p.discount).map(product => (
                <Card key={product.id} className="bg-card border-border border-glow-gold">
                  <CardHeader>
                    <Badge className="w-fit bg-accent text-accent-foreground glow-gold">
                      Скидка {product.discount}%
                    </Badge>
                    <CardTitle className="text-foreground">{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-neon-gold glow-gold">
                        {Math.round(product.price * (1 - product.discount! / 100))}₽
                      </span>
                      <span className="text-lg text-muted-foreground line-through">{product.price}₽</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Экономия: {product.price - Math.round(product.price * (1 - product.discount! / 100))}₽</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-neon text-background font-bold" onClick={() => addToCart(product)}>
                      Купить со скидкой
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center glow-cyan text-primary">Доставка</h2>
            <div className="space-y-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Icon name="Package" className="w-5 h-5 text-primary" />
                    Курьерская доставка
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Доставка по Москве и Санкт-Петербургу — 1-2 дня, 300₽</p>
                  <p className="mt-2">Бесплатная доставка при заказе от 3000₽</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Icon name="MapPin" className="w-5 h-5 text-secondary" />
                    Пункты выдачи
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Более 5000 пунктов по всей России — 2-5 дней, от 200₽</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Icon name="Mail" className="w-5 h-5 text-accent" />
                    Почта России
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Доставка в любую точку России — 5-14 дней, от 250₽</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'reviews' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center glow-magenta text-secondary">Отзывы</h2>
            <div className="space-y-6">
              {[
                { name: 'Александр М.', rating: 5, text: 'Отличный магазин! Быстрая доставка, качественные товары. Покупаю здесь уже третий раз.', product: 'Cloud Master Pro' },
                { name: 'Екатерина Л.', rating: 5, text: 'Paradise Mix — лучшая жидкость что я пробовала! Вкус насыщенный, пар густой. Рекомендую!', product: 'Paradise Mix 50ml' },
                { name: 'Дмитрий К.', rating: 4, text: 'Vape Elite X работает отлично, батарея держит долго. Единственный минус — долго ждал доставку.', product: 'Vape Elite X' },
              ].map((review, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-foreground">{review.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <CardDescription>{review.product}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-8 text-center glow-cyan text-primary">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Свяжитесь с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-muted-foreground">info@paradisevape.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-semibold text-foreground">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Вейп, д. 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Вс: 10:00 - 22:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Мы в соцсетях</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Send" className="w-5 h-5 mr-2 text-primary" />
                    Telegram
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MessageCircle" className="w-5 h-5 mr-2 text-secondary" />
                    VK
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Instagram" className="w-5 h-5 mr-2 text-accent" />
                    Instagram
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-card border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold glow-cyan text-primary mb-2">ParadiseVape</h3>
            <p className="text-muted-foreground text-sm">© 2024 ParadiseVape. Все права защищены.</p>
            <p className="text-muted-foreground text-xs mt-2">18+ Только для совершеннолетних</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
