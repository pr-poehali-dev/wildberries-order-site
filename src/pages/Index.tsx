import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  barcode: string;
  status: 'waiting' | 'issued' | 'returned';
  createdAt: string;
  items: OrderItem[];
  totalPrice: number;
  returnReason?: string;
}

const Index = () => {
  const productNames = [
    'Футболка', 'Джинсы', 'Кроссовки', 'Платье', 'Куртка', 'Свитер', 'Рубашка', 'Юбка',
    'Шорты', 'Пальто', 'Кеды', 'Сумка', 'Рюкзак', 'Шапка', 'Шарф', 'Перчатки',
    'Носки', 'Белье', 'Пижама', 'Спортивный костюм', 'Блузка', 'Брюки', 'Ремень', 'Очки'
  ];

  const firstNames = ['Александр', 'Дмитрий', 'Иван', 'Сергей', 'Андрей', 'Алексей', 'Михаил', 'Владимир',
    'Анна', 'Мария', 'Елена', 'Ольга', 'Татьяна', 'Наталья', 'Екатерина', 'Ирина'];
  
  const lastNames = ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Соколов',
    'Иванова', 'Петрова', 'Сидорова', 'Смирнова', 'Кузнецова', 'Попова', 'Васильева', 'Соколова'];

  const generateRandomName = (): string => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateRandomItems = (): OrderItem[] => {
    const itemCount = Math.floor(Math.random() * 50) + 1;
    const items: OrderItem[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const price = Math.floor(Math.random() * 5000) + 500;
      
      items.push({
        name: randomProduct,
        quantity,
        price
      });
    }
    
    return items;
  };

  const calculateTotal = (items: OrderItem[]): number => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('wildberries_orders');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: '1',
        customerName: 'Иван Петров',
        barcode: '8B0301927',
        status: 'waiting' as const,
        createdAt: new Date().toISOString(),
        items: generateRandomItems(),
        totalPrice: 0,
      },
      {
        id: '2',
        customerName: 'Мария Сидорова',
        barcode: '8B0301928',
        status: 'waiting' as const,
        createdAt: new Date().toISOString(),
        items: generateRandomItems(),
        totalPrice: 0,
      },
    ].map(order => ({ ...order, totalPrice: calculateTotal(order.items) }));
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('wildberries_profile');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: 'Александр Иванов',
      position: 'Оператор ПВЗ',
      pvzNumber: 'ПВЗ #8279',
      address: 'Москва, ул. Ленина, 15',
    };
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('wildberries_profile', JSON.stringify(profileData));
  }, [profileData]);

  useEffect(() => {
    localStorage.setItem('wildberries_orders', JSON.stringify(orders));
  }, [orders]);

  const generateBarcode = () => {
    return '8B' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  };

  const createOrder = () => {
    const items = generateRandomItems();
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: generateRandomName(),
      barcode: generateBarcode(),
      status: 'waiting',
      createdAt: new Date().toISOString(),
      items,
      totalPrice: calculateTotal(items),
    };

    setOrders([newOrder, ...orders]);
    
    toast({
      title: 'Заказ создан',
      description: `${newOrder.customerName} • ${items.length} товаров на ${newOrder.totalPrice.toLocaleString('ru-RU')} ₽`,
    });
  };

  const issueOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'issued' as const } : order
    ));
    
    toast({
      title: 'Заказ выдан',
      description: 'Статус успешно обновлен',
    });
  };

  const returnOrder = () => {
    if (!selectedOrder || !returnReason) {
      toast({
        title: 'Ошибка',
        description: 'Выберите причину возврата',
        variant: 'destructive',
      });
      return;
    }

    setOrders(orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: 'returned' as const, returnReason } 
        : order
    ));
    
    setIsReturnDialogOpen(false);
    setIsDetailsOpen(false);
    setReturnReason('');
    
    toast({
      title: 'Возврат оформлен',
      description: `Причина: ${returnReason}`,
    });
  };

  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.barcode.includes(searchQuery)
  );

  const waitingOrders = filteredOrders.filter(o => o.status === 'waiting');
  const issuedOrders = filteredOrders.filter(o => o.status === 'issued');
  const returnedOrders = filteredOrders.filter(o => o.status === 'returned');

  const stats = {
    total: orders.length,
    waiting: orders.filter(o => o.status === 'waiting').length,
    issued: orders.filter(o => o.status === 'issued').length,
    returned: orders.filter(o => o.status === 'returned').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Package" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Wildberries ПВЗ
                </h1>
                <p className="text-sm text-muted-foreground">Система управления выдачей</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                onClick={createOrder}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Создать заказ
              </Button>
              
              <Button 
                onClick={() => setIsProfileOpen(true)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <Icon name="User" size={20} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ожидают выдачи</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">{stats.waiting}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Выдано сегодня</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{stats.issued}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Возвраты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{stats.returned}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl">Управление заказами</CardTitle>
              <div className="relative flex-1 md:max-w-md">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск по имени или штрих-коду..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="waiting" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="waiting" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
                  <Icon name="Clock" size={16} className="mr-2" />
                  Ожидают ({waitingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="issued" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Выданные ({issuedOrders.length})
                </TabsTrigger>
                <TabsTrigger value="returned" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
                  <Icon name="Undo2" size={16} className="mr-2" />
                  Возвраты ({returnedOrders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="waiting" className="space-y-4">
                {waitingOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Package" size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Нет заказов, ожидающих выдачи</p>
                  </div>
                ) : (
                  waitingOrders.map((order, index) => (
                    <Card 
                      key={order.id} 
                      className="hover:shadow-md transition-all hover:scale-[1.02] border-l-4 border-l-orange-500 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon name="User" className="text-orange-600" size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{order.customerName}</h3>
                              <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Icon name="Barcode" size={16} />
                                  <span className="font-mono">{order.barcode}</span>
                                </div>
                                <Badge variant="outline" className="border-orange-500 text-orange-600">
                                  <Icon name="Clock" size={12} className="mr-1" />
                                  Ожидает
                                </Badge>
                              </div>
                              <div className="mt-2 text-sm">
                                <span className="font-medium">{order.items.length} товаров</span>
                                <span className="mx-2">•</span>
                                <span className="font-bold text-primary">{order.totalPrice.toLocaleString('ru-RU')} ₽</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                              variant="outline"
                              className="border-primary text-primary hover:bg-primary/10"
                            >
                              <Icon name="Eye" size={16} className="mr-2" />
                              Состав
                            </Button>
                            <Button 
                              onClick={() => issueOrder(order.id)}
                              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
                            >
                              <Icon name="Check" size={16} className="mr-2" />
                              Выдать
                            </Button>
                            <Button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsReturnDialogOpen(true);
                              }}
                              variant="outline"
                              className="border-red-500 text-red-600 hover:bg-red-50"
                            >
                              <Icon name="Undo2" size={16} className="mr-2" />
                              Возврат
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="issued" className="space-y-4">
                {issuedOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="CheckCircle" size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Нет выданных заказов</p>
                  </div>
                ) : (
                  issuedOrders.map((order, index) => (
                    <Card 
                      key={order.id} 
                      className="hover:shadow-md transition-all hover:scale-[1.02] border-l-4 border-l-green-500 opacity-75 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="User" className="text-green-600" size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{order.customerName}</h3>
                            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="Barcode" size={16} />
                                <span className="font-mono">{order.barcode}</span>
                              </div>
                              <Badge variant="outline" className="border-green-500 text-green-600">
                                <Icon name="CheckCircle" size={12} className="mr-1" />
                                Выдан
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="font-medium">{order.items.length} товаров</span>
                              <span className="mx-2">•</span>
                              <span className="font-bold text-green-600">{order.totalPrice.toLocaleString('ru-RU')} ₽</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                              variant="outline"
                              size="sm"
                              className="border-green-500 text-green-600 hover:bg-green-50"
                            >
                              <Icon name="Eye" size={16} className="mr-2" />
                              Состав
                            </Button>
                            <Button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsReturnDialogOpen(true);
                              }}
                              variant="outline"
                              size="sm"
                              className="border-red-500 text-red-600 hover:bg-red-50"
                            >
                              <Icon name="Undo2" size={16} className="mr-2" />
                              Возврат
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="returned" className="space-y-4">
                {returnedOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Undo2" size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Нет возвращенных заказов</p>
                  </div>
                ) : (
                  returnedOrders.map((order, index) => (
                    <Card 
                      key={order.id} 
                      className="hover:shadow-md transition-all hover:scale-[1.02] border-l-4 border-l-red-500 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="User" className="text-red-600" size={24} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{order.customerName}</h3>
                            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Icon name="Barcode" size={16} />
                                <span className="font-mono">{order.barcode}</span>
                              </div>
                              <Badge variant="outline" className="border-red-500 text-red-600">
                                <Icon name="Undo2" size={12} className="mr-1" />
                                Возврат
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm">
                              <span className="font-medium">{order.items.length} товаров</span>
                              <span className="mx-2">•</span>
                              <span className="font-bold text-red-600">{order.totalPrice.toLocaleString('ru-RU')} ₽</span>
                            </div>
                            {order.returnReason && (
                              <div className="mt-2 text-sm bg-red-50 px-3 py-2 rounded-lg">
                                <span className="font-medium text-red-800">Причина: </span>
                                <span className="text-red-700">{order.returnReason}</span>
                              </div>
                            )}
                          </div>
                          <Button 
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDetailsOpen(true);
                            }}
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-600 hover:bg-red-50"
                          >
                            <Icon name="Eye" size={16} className="mr-2" />
                            Состав
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Состав заказа</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="User" className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedOrder.customerName}</h3>
                    <p className="text-sm text-muted-foreground font-mono">{selectedOrder.barcode}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={selectedOrder.status === 'waiting' 
                    ? 'border-orange-500 text-orange-600' 
                    : 'border-green-500 text-green-600'}
                >
                  {selectedOrder.status === 'waiting' ? 'Ожидает выдачи' : 'Выдан'}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="ShoppingBag" size={18} />
                  Товары ({selectedOrder.items.length})
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {selectedOrder.items.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} шт × {item.price.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                      <div className="font-semibold text-primary">
                        {(item.quantity * item.price).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Итого:</span>
                  <span className="font-bold text-2xl text-primary">
                    {selectedOrder.totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Оформление возврата</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="font-semibold">{selectedOrder.customerName}</p>
                <p className="text-sm text-muted-foreground font-mono">{selectedOrder.barcode}</p>
              </div>
              
              <div className="space-y-3">
                <Label className="text-base font-semibold">Причина возврата</Label>
                <RadioGroup value={returnReason} onValueChange={setReturnReason}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Не подошло" id="reason1" />
                    <Label htmlFor="reason1" className="cursor-pointer flex-1">Не подошло</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Брак" id="reason2" />
                    <Label htmlFor="reason2" className="cursor-pointer flex-1">Брак</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Передумал брать" id="reason3" />
                    <Label htmlFor="reason3" className="cursor-pointer flex-1">Передумал брать</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Не понравилось" id="reason4" />
                    <Label htmlFor="reason4" className="cursor-pointer flex-1">Не понравилось</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={returnOrder}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90"
                disabled={!returnReason}
              >
                <Icon name="Undo2" size={16} className="mr-2" />
                Оформить возврат
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Профиль сотрудника</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <Icon name="User" className="text-white" size={40} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl">{profileData.name}</h3>
                <p className="text-sm text-muted-foreground">{profileData.position}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="MapPin" size={18} className="text-primary" />
                  <span className="font-semibold text-sm">Пункт выдачи</span>
                </div>
                <p className="text-sm">{profileData.pvzNumber}</p>
                <p className="text-sm text-muted-foreground">{profileData.address}</p>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="BarChart" size={18} className="text-primary" />
                  <span className="font-semibold text-sm">Статистика сегодня</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-2xl font-bold text-primary">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Всего заказов</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-500">{stats.issued}</p>
                    <p className="text-xs text-muted-foreground">Выдано</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-500">{stats.waiting}</p>
                    <p className="text-xs text-muted-foreground">Ожидают</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-500">{stats.returned}</p>
                    <p className="text-xs text-muted-foreground">Возвраты</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Эффективность</p>
                    <p className="text-2xl font-bold text-primary">
                      {stats.total > 0 ? Math.round((stats.issued / stats.total) * 100) : 0}%
                    </p>
                  </div>
                  <Icon name="TrendingUp" size={40} className="text-primary opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;