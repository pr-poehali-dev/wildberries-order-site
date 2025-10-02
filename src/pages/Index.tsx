import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customerName: string;
  barcode: string;
  status: 'waiting' | 'issued';
  createdAt: string;
}

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'Иван Петров',
      barcode: '8B0301927',
      status: 'waiting',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      customerName: 'Мария Сидорова',
      barcode: '8B0301928',
      status: 'waiting',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [newOrderName, setNewOrderName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const generateBarcode = () => {
    return '8B' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  };

  const createOrder = () => {
    if (!newOrderName.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите имя получателя',
        variant: 'destructive',
      });
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: newOrderName,
      barcode: generateBarcode(),
      status: 'waiting',
      createdAt: new Date().toISOString(),
    };

    setOrders([newOrder, ...orders]);
    setNewOrderName('');
    setIsDialogOpen(false);
    
    toast({
      title: 'Заказ создан',
      description: `Штрих-код: ${newOrder.barcode}`,
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

  const filteredOrders = orders.filter(order => 
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.barcode.includes(searchQuery)
  );

  const waitingOrders = filteredOrders.filter(o => o.status === 'waiting');
  const issuedOrders = filteredOrders.filter(o => o.status === 'issued');

  const stats = {
    total: orders.length,
    waiting: orders.filter(o => o.status === 'waiting').length,
    issued: orders.filter(o => o.status === 'issued').length,
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

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать заказ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xl">Новый заказ</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Имя получателя</Label>
                    <Input
                      id="customerName"
                      placeholder="Введите имя"
                      value={newOrderName}
                      onChange={(e) => setNewOrderName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && createOrder()}
                    />
                  </div>
                  <Button onClick={createOrder} className="w-full bg-gradient-to-r from-primary to-secondary">
                    Создать заказ
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="waiting" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
                  <Icon name="Clock" size={16} className="mr-2" />
                  Ожидают ({waitingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="issued" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary">
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Выданные ({issuedOrders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="waiting" className="space-y-4">
                {waitingOrders.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="Package" size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Нет заказов, ожидающих выдачи</p>
                  </div>
                ) : (
                  waitingOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-500">
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
                            </div>
                          </div>
                          <Button 
                            onClick={() => issueOrder(order.id)}
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
                          >
                            <Icon name="Check" size={16} className="mr-2" />
                            Выдать
                          </Button>
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
                  issuedOrders.map((order) => (
                    <Card key={order.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500 opacity-75">
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
                          </div>
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
    </div>
  );
};

export default Index;
