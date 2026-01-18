import { useState } from 'react';
import Header from '@/components/vape/Header';
import CatalogSection from '@/components/vape/CatalogSection';
import InfoSections from '@/components/vape/InfoSections';
import { Product, CartItem } from '@/components/vape/types';

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

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cart={cart}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        calculateTotal={calculateTotal}
      />

      {activeSection === 'catalog' && (
        <CatalogSection
          products={products}
          categories={categories}
          flavors={flavors}
          selectedCategory={selectedCategory}
          selectedFlavor={selectedFlavor}
          setSelectedCategory={setSelectedCategory}
          setSelectedFlavor={setSelectedFlavor}
          addToCart={addToCart}
        />
      )}

      <InfoSections 
        activeSection={activeSection}
        products={products}
        addToCart={addToCart}
      />

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
