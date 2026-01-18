import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CartItem } from './types';

type HeaderProps = {
  cart: CartItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  calculateTotal: () => number;
};

const Header = ({ cart, activeSection, setActiveSection, updateQuantity, removeFromCart, calculateTotal }: HeaderProps) => {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 
            onClick={() => setActiveSection('catalog')} 
            className="text-3xl font-black glow-cyan text-primary cursor-pointer hover:opacity-80 transition-opacity"
          >
            ParadiseVape
          </h1>
          <nav className="hidden md:flex items-center gap-6">
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
  );
};

export default Header;