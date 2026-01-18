import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from './types';
import { renderStars } from './StarRating';

type InfoSectionsProps = {
  activeSection: string;
  products: Product[];
  addToCart: (product: Product) => void;
};

const InfoSections = ({ activeSection, products, addToCart }: InfoSectionsProps) => {
  return (
    <>
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
    </>
  );
};

export default InfoSections;