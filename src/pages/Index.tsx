import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
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
  issuedBy?: 'curator' | string;
}

interface Intern {
  id: string;
  name: string;
  surname: string;
  salary: number;
  createdAt: string;
  issuedOrders: number;
  returnedOrders: number;
  totalEarned: number;
  warns: InternWarn[];
}

interface InternWarn {
  id: string;
  reason: string;
  date: string;
  issuedBy: string;
}

const ANIMATION_CLASSES = [
  'animate-fade-in',
  'animate-slide-in-bottom',
  'animate-slide-in-top',
  'animate-slide-in-left',
  'animate-slide-in-right',
  'animate-bounce-in',
  'animate-zoom-in',
  'animate-flip-in',
  'animate-rotate-in',
  'animate-shake',
];

const getRandomAnimation = () => {
  return ANIMATION_CLASSES[Math.floor(Math.random() * ANIMATION_CLASSES.length)];
};

const Index = () => {
  const [cardAnimation, setCardAnimation] = useState('');
  const [buttonAnimation, setButtonAnimation] = useState('');
  const [headerAnimation, setHeaderAnimation] = useState('');

  useEffect(() => {
    setCardAnimation(getRandomAnimation());
    setButtonAnimation(getRandomAnimation());
    setHeaderAnimation(getRandomAnimation());
  }, []);

  const productNames = [
    'Футболка', 'Джинсы', 'Кроссовки', 'Платье', 'Куртка', 'Свитер', 'Рубашка', 'Юбка',
    'Шорты', 'Пальто', 'Кеды', 'Сумка', 'Рюкзак', 'Шапка', 'Шарф', 'Перчатки',
    'Носки', 'Белье', 'Пижама', 'Спортивный костюм', 'Блузка', 'Брюки', 'Ремень', 'Очки',
    'Костюм', 'Толстовка', 'Ветровка', 'Ботинки', 'Сапоги', 'Туфли', 'Сандалии', 'Сланцы',
    'Кардиган', 'Жилет', 'Бомбер', 'Парка', 'Дубленка', 'Смокинг', 'Бандана',
    'Кепка', 'Бейсболка', 'Платок', 'Галстук', 'Бабочка', 'Подтяжки', 'Кошелек', 'Портмоне',
    'Чемодан', 'Дорожная сумка', 'Барсетка', 'Клатч', 'Спортивная сумка', 'Зонт', 'Часы', 'Браслет',
    'Украшения', 'Серьги', 'Кольцо', 'Цепочка', 'Кулон', 'Брошь', 'Запонки', 'Зажим для галстука',
    'Спортивные штаны', 'Леггинсы', 'Тренч', 'Духи', 'Косметичка', 'Чехол для телефона', 'Повербанк',
    'Игрушка мягкая', 'Конструктор', 'Кукла', 'Машинка', 'Пазл', 'Настольная игра', 'Мяч',
    'Книга', 'Блокнот', 'Ручка', 'Карандаш', 'Маркер', 'Тетрадь', 'Пенал', 'Ластик',
    'Телефон', 'Наушники', 'Колонка', 'Умные часы', 'Фитнес-браслет', 'Планшет', 'Ноутбук',
    'Клавиатура', 'Мышь', 'Веб-камера', 'Микрофон', 'USB кабель', 'Адаптер', 'Карта памяти',
    'Посуда', 'Кружка', 'Тарелка', 'Набор столовых приборов', 'Термос', 'Бутылка для воды',
    'Постельное белье', 'Подушка', 'Одеяло', 'Плед', 'Полотенце', 'Коврик для ванной',
    'Лампа', 'Светильник', 'Гирлянда', 'Свеча', 'Ваза', 'Рамка для фото', 'Зеркало',
    'Косметика', 'Крем для рук', 'Шампунь', 'Гель для душа', 'Маска для лица', 'Помада',
    'Лак для ногтей', 'Тени', 'Тушь', 'Расческа', 'Фен', 'Электробритва', 'Триммер',
    'Посудомоечная губка', 'Средство для мытья посуды', 'Стиральный порошок', 'Освежитель воздуха',
    'Спортивный инвентарь', 'Гантели', 'Коврик для йоги', 'Скакалка', 'Эспандер', 'Бутылка спортивная',
    'Палатка', 'Спальный мешок', 'Рюкзак туристический', 'Термокружка', 'Фонарик', 'Компас',
    'Детская коляска', 'Автокресло', 'Соска', 'Бутылочка', 'Подгузники', 'Слинг',
    'Корм для животных', 'Игрушка для собак', 'Когтеточка', 'Миска', 'Поводок', 'Лоток',
    'Семена', 'Горшок для цветов', 'Удобрение', 'Лейка', 'Садовые перчатки', 'Секатор',
    'Инструменты', 'Отвертка', 'Молоток', 'Гаечный ключ', 'Плоскогубцы', 'Дрель', 'Шуруповерт',
    'Елочные игрушки', 'Новогодняя гирлянда', 'Маскарадный костюм', 'Воздушные шары', 'Подарочная упаковка',
    'Велосипед', 'Самокат', 'Скейтборд', 'Ролики', 'Защита для роликов', 'Шлем',
    'Гитара', 'Укулеле', 'Синтезатор', 'Микрофон караоке', 'Медиатор', 'Струны',
    'Картина', 'Постер', 'Наклейки', 'Магнит на холодильник', 'Брелок', 'Значок'
  ];

  const maleFirstNames = ['Александр', 'Дмитрий', 'Иван', 'Сергей', 'Андрей', 'Алексей', 'Михаил', 'Владимир'];
  const femaleFirstNames = ['Анна', 'Мария', 'Елена', 'Ольга', 'Татьяна', 'Наталья', 'Екатерина', 'Ирина'];
  
  const maleLastNames = ['Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Соколов'];
  const femaleLastNames = ['Иванова', 'Петрова', 'Сидорова', 'Смирнова', 'Кузнецова', 'Попова', 'Васильева', 'Соколова'];

  const generateRandomName = (): string => {
    const isMale = Math.random() > 0.5;
    const firstName = isMale 
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    const lastName = isMale
      ? maleLastNames[Math.floor(Math.random() * maleLastNames.length)]
      : femaleLastNames[Math.floor(Math.random() * femaleLastNames.length)];
    return `${firstName} ${lastName}`;
  };

  const generateRandomItems = (count?: number): OrderItem[] => {
    const itemCount = count || Math.floor(Math.random() * 10) + 1;
    const items: OrderItem[] = [];
    
    for (let i = 0; i < itemCount; i++) {
      const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const price = Math.floor(Math.random() * 1500) + 100;
      
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
    return [];
  });

  const [interns, setInterns] = useState<Intern[]>(() => {
    const saved = localStorage.getItem('wildberries_interns');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((intern: any) => ({
        ...intern,
        issuedOrders: intern.issuedOrders || 0,
        returnedOrders: intern.returnedOrders || 0,
        totalEarned: intern.totalEarned || 0,
        warns: intern.warns || []
      }));
    }
    return [];
  });

  const [curatorBalance, setCuratorBalance] = useState<number>(() => {
    const saved = localStorage.getItem('wildberries_curator_balance');
    return saved ? parseFloat(saved) : 0;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReturnDialogOpen, setIsReturnDialogOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInternsOpen, setIsInternsOpen] = useState(false);
  const [isAddingIntern, setIsAddingIntern] = useState(false);
  const [internName, setInternName] = useState('');
  const [internSurname, setInternSurname] = useState('');
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [isInternProfileOpen, setIsInternProfileOpen] = useState(false);
  const [isWarnDialogOpen, setIsWarnDialogOpen] = useState(false);
  const [warnReason, setWarnReason] = useState('');
  const [bulkOrderCount, setBulkOrderCount] = useState(1);
  const [isBulkOrderOpen, setIsBulkOrderOpen] = useState(false);
  const [isCuratorProfileOpen, setIsCuratorProfileOpen] = useState(false);
  const [isEditingIntern, setIsEditingIntern] = useState(false);
  const [editInternName, setEditInternName] = useState('');
  const [editInternSurname, setEditInternSurname] = useState('');
  
  const [isInternMode, setIsInternMode] = useState(false);
  const [internModeCode, setInternModeCode] = useState<string | null>(() => {
    const saved = localStorage.getItem('wildberries_intern_code');
    return saved || null;
  });
  const [isExitCodeDialogOpen, setIsExitCodeDialogOpen] = useState(false);
  const [exitCodeInput, setExitCodeInput] = useState('');
  const [isSetCodeDialogOpen, setIsSetCodeDialogOpen] = useState(false);
  const [newCodeInput, setNewCodeInput] = useState('');
  
  const [curatorName, setCuratorName] = useState<string>(() => {
    const saved = localStorage.getItem('wildberries_curator_name');
    return saved || 'Куратор';
  });
  const [isEditingCurator, setIsEditingCurator] = useState(false);
  const [editCuratorName, setEditCuratorName] = useState('');
  
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [shiftStartTime, setShiftStartTime] = useState<string | null>(null);

  const [appTheme, setAppTheme] = useState({
    primaryColor: '#8b5cf6',
    accentColor: '#a855f7'
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('wildberries_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('wildberries_interns', JSON.stringify(interns));
  }, [interns]);

  useEffect(() => {
    localStorage.setItem('wildberries_curator_balance', curatorBalance.toString());
  }, [curatorBalance]);

  useEffect(() => {
    if (internModeCode) {
      localStorage.setItem('wildberries_intern_code', internModeCode);
    }
  }, [internModeCode]);

  useEffect(() => {
    localStorage.setItem('wildberries_curator_name', curatorName);
  }, [curatorName]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', appTheme.primaryColor);
    document.documentElement.style.setProperty('--accent-color', appTheme.accentColor);
  }, [appTheme]);

  const createOrder = () => {
    const newOrder: Order = {
      id: Date.now().toString(),
      customerName: generateRandomName(),
      barcode: `WB${Math.floor(Math.random() * 900000000) + 100000000}`,
      status: 'waiting',
      createdAt: new Date().toISOString(),
      items: generateRandomItems(),
      totalPrice: 0
    };
    newOrder.totalPrice = calculateTotal(newOrder.items);
    
    setOrders([newOrder, ...orders]);
    toast({
      title: 'Заказ создан',
      description: `Штрих-код: ${newOrder.barcode}`,
    });
  };

  const createBulkOrders = () => {
    const newOrders: Order[] = [];
    for (let i = 0; i < bulkOrderCount; i++) {
      const order: Order = {
        id: (Date.now() + i).toString(),
        customerName: generateRandomName(),
        barcode: `WB${Math.floor(Math.random() * 900000000) + 100000000}`,
        status: 'waiting',
        createdAt: new Date().toISOString(),
        items: generateRandomItems(),
        totalPrice: 0
      };
      order.totalPrice = calculateTotal(order.items);
      newOrders.push(order);
    }
    
    setOrders([...newOrders, ...orders]);
    setIsBulkOrderOpen(false);
    toast({
      title: `Создано заказов: ${bulkOrderCount}`,
      description: `Все заказы добавлены в систему`,
    });
  };

  const issueOrder = (orderId: string, issuedBy: 'curator' | string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId && order.status === 'waiting') {
        const commission = order.totalPrice * 0.25;
        
        if (issuedBy === 'curator') {
          setCuratorBalance(prev => prev + commission);
        } else {
          const curatorCommission = order.totalPrice * 0.03;
          const internCommission = order.totalPrice * 0.10;
          
          setCuratorBalance(prev => prev + curatorCommission);
          setInterns(interns.map(intern => 
            intern.id === issuedBy 
              ? { 
                  ...intern, 
                  salary: intern.salary + internCommission,
                  issuedOrders: intern.issuedOrders + 1,
                  totalEarned: intern.totalEarned + internCommission
                }
              : intern
          ));
        }

        toast({
          title: 'Заказ выдан',
          description: `Начислено: ${issuedBy === 'curator' ? commission.toFixed(0) : (order.totalPrice * 0.10).toFixed(0)} ₽`,
        });
        
        return { ...order, status: 'issued' as const, issuedBy };
      }
      return order;
    }));
  };

  const returnOrder = (returnForIntern?: string) => {
    if (!selectedOrder || !returnReason.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Укажите причину возврата',
        variant: 'destructive',
      });
      return;
    }

    setOrders(orders.map(order => {
      if (order.id === selectedOrder.id) {
        const commission = order.totalPrice * 0.25;
        
        if (order.issuedBy === 'curator') {
          setCuratorBalance(prev => Math.max(0, prev - commission));
          if (returnForIntern) {
            const internBonus = order.totalPrice * 0.03;
            setInterns(interns.map(intern => 
              intern.id === returnForIntern
                ? { 
                    ...intern, 
                    salary: intern.salary + internBonus,
                    totalEarned: intern.totalEarned + internBonus
                  }
                : intern
            ));
          }
        } else if (order.issuedBy) {
          const curatorCommission = order.totalPrice * 0.03;
          const internCommission = order.totalPrice * 0.10;
          
          setCuratorBalance(prev => Math.max(0, prev - curatorCommission));
          setInterns(interns.map(intern => 
            intern.id === order.issuedBy 
              ? { 
                  ...intern, 
                  salary: Math.max(0, intern.salary - internCommission),
                  returnedOrders: intern.returnedOrders + 1
                }
              : intern
          ));
          
          if (returnForIntern && returnForIntern !== order.issuedBy) {
            const internBonus = order.totalPrice * 0.03;
            setInterns(prev => prev.map(intern => 
              intern.id === returnForIntern
                ? { 
                    ...intern, 
                    salary: intern.salary + internBonus,
                    totalEarned: intern.totalEarned + internBonus
                  }
                : intern
            ));
          }
        }

        toast({
          title: 'Возврат оформлен',
          description: returnReason,
          variant: 'destructive',
        });

        return {
          ...order,
          status: 'returned' as const,
          returnReason
        };
      }
      return order;
    }));

    setIsReturnDialogOpen(false);
    setReturnReason('');
    setSelectedOrder(null);
  };

  const addIntern = () => {
    if (!internName.trim() || !internSurname.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const newIntern: Intern = {
      id: Date.now().toString(),
      name: internName,
      surname: internSurname,
      salary: 0,
      createdAt: new Date().toISOString(),
      issuedOrders: 0,
      returnedOrders: 0,
      totalEarned: 0,
      warns: []
    };

    setInterns([...interns, newIntern]);
    setInternName('');
    setInternSurname('');
    setIsAddingIntern(false);
    
    toast({
      title: 'Стажёр зарегистрирован',
      description: `${newIntern.name} ${newIntern.surname}`,
    });
  };

  const removeIntern = (internId: string) => {
    setInterns(interns.filter(intern => intern.id !== internId));
    toast({
      title: 'Стажёр уволен',
      description: 'Данные удалены из системы',
    });
  };

  const updateInternInfo = () => {
    if (!selectedIntern || !editInternName.trim() || !editInternSurname.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    setInterns(interns.map(intern => 
      intern.id === selectedIntern.id 
        ? { ...intern, name: editInternName, surname: editInternSurname }
        : intern
    ));

    setSelectedIntern({
      ...selectedIntern,
      name: editInternName,
      surname: editInternSurname
    });

    setIsEditingIntern(false);
    toast({
      title: 'Данные обновлены',
      description: `${editInternName} ${editInternSurname}`,
    });
  };

  const withdrawInternSalary = (internId: string) => {
    setInterns(interns.map(intern => {
      if (intern.id === internId && intern.salary > 0) {
        const amount = intern.salary;
        toast({
          title: 'Выплата произведена',
          description: `Выплачено: ${amount.toLocaleString('ru-RU')} ₽`,
        });
        return { ...intern, salary: 0 };
      }
      return intern;
    }));
  };

  const withdrawCuratorBalance = () => {
    if (curatorBalance > 0) {
      const amount = curatorBalance;
      setCuratorBalance(0);
      toast({
        title: 'Выплата произведена',
        description: `Выплачено: ${amount.toLocaleString('ru-RU')} ₽`,
      });
    }
  };

  const enableInternMode = () => {
    if (!internModeCode) {
      setIsSetCodeDialogOpen(true);
    } else {
      setIsInternMode(true);
      toast({
        title: 'Режим стажёра активирован',
        description: 'Код для выхода сохранён',
      });
    }
  };

  const setInternCode = () => {
    if (newCodeInput.length === 6 && /^\d+$/.test(newCodeInput)) {
      setInternModeCode(newCodeInput);
      setIsInternMode(true);
      setIsSetCodeDialogOpen(false);
      setNewCodeInput('');
      toast({
        title: 'Код установлен',
        description: 'Режим стажёра активирован. Запомните код для выхода!',
        duration: 10000,
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Код должен состоять из 6 цифр',
        variant: 'destructive',
      });
    }
  };

  const disableInternMode = () => {
    if (exitCodeInput === internModeCode) {
      setIsInternMode(false);
      setExitCodeInput('');
      setIsExitCodeDialogOpen(false);
      toast({
        title: 'Режим куратора',
        description: 'Вы вернулись в режим куратора',
      });
    } else {
      toast({
        title: 'Неверный код',
        description: 'Попробуйте снова',
        variant: 'destructive',
      });
    }
  };

  const updateCuratorName = () => {
    if (!editCuratorName.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите имя',
        variant: 'destructive',
      });
      return;
    }
    setCuratorName(editCuratorName);
    setIsEditingCurator(false);
    toast({
      title: 'Профиль обновлен',
      description: editCuratorName,
    });
  };

  const startShift = () => {
    setIsShiftActive(true);
    setShiftStartTime(new Date().toISOString());
    toast({
      title: 'Смена начата',
      description: `${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`,
    });
  };

  const endShift = () => {
    setIsShiftActive(false);
    if (shiftStartTime) {
      const start = new Date(shiftStartTime);
      const end = new Date();
      const duration = Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
      toast({
        title: 'Смена завершена',
        description: `Длительность: ${duration} минут`,
      });
    }
    setShiftStartTime(null);
  };

  const addWarnToIntern = () => {
    if (!selectedIntern || !warnReason.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Укажите причину предупреждения',
        variant: 'destructive',
      });
      return;
    }

    const newWarn: InternWarn = {
      id: Date.now().toString(),
      reason: warnReason,
      date: new Date().toISOString(),
      issuedBy: 'Куратор'
    };

    setInterns(interns.map(intern => 
      intern.id === selectedIntern.id 
        ? { ...intern, warns: [...intern.warns, newWarn] }
        : intern
    ));

    setWarnReason('');
    setIsWarnDialogOpen(false);
    
    toast({
      title: 'Предупреждение выдано',
      description: `${selectedIntern.name} ${selectedIntern.surname}`,
      variant: 'destructive',
    });
  };

  const removeWarn = (internId: string, warnId: string) => {
    setInterns(interns.map(intern => 
      intern.id === internId 
        ? { ...intern, warns: intern.warns.filter(w => w.id !== warnId) }
        : intern
    ));
    
    toast({
      title: 'Предупреждение снято',
    });
  };

  const filteredOrders = orders.filter(order =>
    order.barcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const waitingOrders = filteredOrders.filter(order => order.status === 'waiting');
  const issuedOrders = filteredOrders.filter(order => order.status === 'issued');
  const returnedOrders = filteredOrders.filter(order => order.status === 'returned');

  const totalRevenue = orders
    .filter(order => order.status === 'issued')
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const getEfficiencyLevel = (intern: Intern) => {
    if (intern.issuedOrders === 0) return { level: 'Новичок', color: 'gray', progress: 0 };
    
    const efficiency = intern.returnedOrders === 0 
      ? 100 
      : ((intern.issuedOrders - intern.returnedOrders) / intern.issuedOrders) * 100;
    
    if (efficiency >= 95) return { level: 'Эксперт', color: 'purple', progress: 100 };
    if (efficiency >= 85) return { level: 'Профи', color: 'blue', progress: 85 };
    if (efficiency >= 70) return { level: 'Хорошо', color: 'green', progress: 70 };
    if (efficiency >= 50) return { level: 'Средне', color: 'yellow', progress: 50 };
    return { level: 'Нужно подтянуть', color: 'red', progress: 30 };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 animate-gradient p-4">
      <div className={`max-w-7xl mx-auto space-y-6 ${headerAnimation}`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-purple-200/50 animate-glow-pulse">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
              <Icon name="Package" size={40} className="text-purple-600" />
              ПВЗ Wildberries
            </h1>
            <p className="text-gray-600 mt-2">Система управления пунктом выдачи заказов</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {!isInternMode && (
              <>
                <Dialog open={isBulkOrderOpen} onOpenChange={setIsBulkOrderOpen}>
                  <DialogTrigger asChild>
                    <Button className={`bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 shadow-md hover:scale-110 transition-all duration-500 ${buttonAnimation}`}>
                      <Icon name="PackagePlus" size={18} className="mr-2" />
                      Создать заказы
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Массовое создание заказов</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-3">
                        <Label>Количество заказов: {bulkOrderCount}</Label>
                        <Slider
                          value={[bulkOrderCount]}
                          onValueChange={(value) => setBulkOrderCount(value[0])}
                          min={1}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>1 заказ</span>
                          <span>100 заказов</span>
                        </div>
                      </div>
                      <Button 
                        onClick={createBulkOrders}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600"
                      >
                        <Icon name="Zap" size={18} className="mr-2" />
                        Создать {bulkOrderCount} {bulkOrderCount === 1 ? 'заказ' : bulkOrderCount < 5 ? 'заказа' : 'заказов'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  onClick={() => setIsInternsOpen(true)}
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-500 relative"
                >
                  <Icon name="Users" size={18} className="mr-2" />
                  Стажёры
                  {interns.length > 0 && (
                    <Badge className="ml-2 bg-purple-600 text-white">{interns.length}</Badge>
                  )}
                </Button>

                <Button 
                  onClick={() => setIsCuratorProfileOpen(true)}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white hover:scale-110 transition-all duration-500"
                >
                  <Icon name="User" size={18} className="mr-2" />
                  Профиль
                </Button>

                {isShiftActive ? (
                  <Button 
                    onClick={endShift}
                    className="bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:scale-110 transition-all duration-500"
                  >
                    <Icon name="Clock" size={18} className="mr-2" />
                    Закончить смену
                  </Button>
                ) : (
                  <Button 
                    onClick={startShift}
                    className="bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 hover:scale-110 transition-all duration-500"
                  >
                    <Icon name="Play" size={18} className="mr-2" />
                    Начать смену
                  </Button>
                )}
              </>
            )}

            {isInternMode ? (
              <Button 
                onClick={() => setIsExitCodeDialogOpen(true)}
                className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 hover:scale-110 transition-all duration-500"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти из режима стажёра
              </Button>
            ) : (
              <>
                <Button 
                  onClick={enableInternMode}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 hover:scale-110 transition-all duration-500"
                >
                  <Icon name="UserCheck" size={18} className="mr-2" />
                  Режим стажёра
                </Button>
                
                <Button 
                  onClick={() => setIsSettingsOpen(true)}
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-500"
                >
                  <Icon name="Settings" size={18} className="mr-2" />
                  Настройки
                </Button>
              </>
            )}
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${cardAnimation}`}>
          <Card className="border-2 border-purple-200/50 hover:shadow-2xl transition-all duration-500 hover:scale-110 bg-gradient-to-br from-purple-100 via-purple-50 to-white animate-float overflow-hidden relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="Clock" size={16} />
                Ожидают выдачи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{waitingOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="CheckCircle" size={16} />
                Выдано
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{issuedOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-red-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="XCircle" size={16} />
                Возвраты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{returnedOrders.length}</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-purple-100 to-white cursor-pointer" onClick={withdrawCuratorBalance}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Icon name="Wallet" size={16} />
                Баланс куратора
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{curatorBalance.toLocaleString('ru-RU')} ₽</div>
              {curatorBalance > 0 && (
                <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                  <Icon name="MousePointerClick" size={12} />
                  Нажмите для вывода
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className={`border-2 border-purple-100 shadow-lg ${cardAnimation}`}>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="flex items-center gap-2">
                <Icon name="Search" size={20} />
                Поиск заказов
              </CardTitle>
              <Input
                placeholder="Поиск по штрих-коду или имени..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:w-96 border-purple-200 focus:border-purple-400 transition-all"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="waiting" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-purple-100">
                <TabsTrigger value="waiting" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <Icon name="Clock" size={16} className="mr-2" />
                  Ожидают ({waitingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="issued" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Выдано ({issuedOrders.length})
                </TabsTrigger>
                <TabsTrigger value="returned" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  <Icon name="XCircle" size={16} className="mr-2" />
                  Возвраты ({returnedOrders.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="waiting" className="space-y-3">
                {waitingOrders.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Icon name="PackageX" size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Нет заказов в ожидании</p>
                  </div>
                ) : (
                  waitingOrders.map((order) => (
                    <Card key={order.id} className="border-l-4 border-l-purple-600 hover:shadow-lg transition-all duration-300 animate-slide-in-left">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                  <Icon name="User" size={18} />
                                  {order.customerName}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Icon name="Barcode" size={14} />
                                  {order.barcode}
                                </p>
                              </div>
                              <Badge className="bg-purple-100 text-purple-700 border-purple-300">
                                <Icon name="Clock" size={12} className="mr-1" />
                                Ожидает
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="Package" size={14} />
                                {order.items.length} {order.items.length === 1 ? 'товар' : order.items.length < 5 ? 'товара' : 'товаров'}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-purple-600">
                                <Icon name="Coins" size={14} />
                                {order.totalPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                              variant="outline"
                              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-500"
                            >
                              <Icon name="Eye" size={16} className="mr-2" />
                              Состав
                            </Button>
                            
                            {isInternMode ? (
                              interns.length > 0 && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 shadow-md hover:scale-110 transition-all duration-500"
                                    >
                                      <Icon name="UserCheck" size={16} className="mr-2" />
                                      Выбрать стажёра
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Выдать заказ за стажёра</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-3">
                                      {interns.map(intern => (
                                        <div key={intern.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                          <div>
                                            <p className="font-medium">{intern.name} {intern.surname}</p>
                                            <p className="text-sm text-muted-foreground">Баланс: {intern.salary.toLocaleString('ru-RU')} ₽</p>
                                          </div>
                                          <div className="flex gap-2">
                                            <Button
                                              size="sm"
                                              onClick={() => {
                                                issueOrder(order.id, intern.id);
                                                const closeBtn = document.querySelector('[data-state="open"]')?.querySelector('button');
                                                if (closeBtn instanceof HTMLElement) closeBtn.click();
                                              }}
                                              className="bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600"
                                            >
                                              <Icon name="Check" size={14} className="mr-1" />
                                              Выдать
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )
                            ) : (
                              <>
                                <Button 
                                  onClick={() => issueOrder(order.id, 'curator')}
                                  className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 shadow-md hover:scale-110 transition-all duration-500"
                                >
                                  <Icon name="Check" size={16} className="mr-2" />
                                  Выдать
                                </Button>
                                {interns.length > 0 && (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button 
                                        variant="outline"
                                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-500"
                                      >
                                        <Icon name="Users" size={16} className="mr-2" />
                                        Стажёр
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Выдать заказ за стажёра</DialogTitle>
                                      </DialogHeader>
                                      <div className="space-y-3">
                                        {interns.map(intern => (
                                          <div key={intern.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                            <div>
                                              <p className="font-medium">{intern.name} {intern.surname}</p>
                                              <p className="text-sm text-muted-foreground">Баланс: {intern.salary.toLocaleString('ru-RU')} ₽</p>
                                            </div>
                                            <div className="flex gap-2">
                                              <Button
                                                size="sm"
                                                onClick={() => {
                                                  issueOrder(order.id, intern.id);
                                                  const closeBtn = document.querySelector('[data-state="open"]')?.querySelector('button');
                                                  if (closeBtn instanceof HTMLElement) closeBtn.click();
                                                }}
                                                className="bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600"
                                              >
                                                <Icon name="Check" size={14} className="mr-1" />
                                                Выдать
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}
                                <Button 
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setIsReturnDialogOpen(true);
                                  }}
                                  variant="outline"
                                  className="border-red-500 text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-500"
                                >
                                  <Icon name="Undo2" size={16} className="mr-2" />
                                  Возврат
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="issued" className="space-y-3">
                {issuedOrders.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Icon name="PackageCheck" size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Нет выданных заказов</p>
                  </div>
                ) : (
                  issuedOrders.map((order) => (
                    <Card key={order.id} className="border-l-4 border-l-green-600 hover:shadow-lg transition-all duration-300 animate-slide-in-right">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                  <Icon name="User" size={18} />
                                  {order.customerName}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Icon name="Barcode" size={14} />
                                  {order.barcode}
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-700 border-green-300">
                                <Icon name="CheckCircle" size={12} className="mr-1" />
                                Выдан
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="Package" size={14} />
                                {order.items.length} {order.items.length === 1 ? 'товар' : order.items.length < 5 ? 'товара' : 'товаров'}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-green-600">
                                <Icon name="Coins" size={14} />
                                {order.totalPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                              variant="outline"
                              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-500"
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
                              className="border-red-500 text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-500"
                            >
                              <Icon name="Undo2" size={16} className="mr-2" />
                              Возврат
                            </Button>
                            {interns.length > 0 && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline"
                                    className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white hover:scale-110 transition-all duration-500"
                                  >
                                    <Icon name="UserX" size={16} className="mr-2" />
                                    Возврат за стажёра
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Оформить возврат за стажёра</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                      <p className="text-sm text-orange-900">
                                        <Icon name="Info" size={14} className="inline mr-1" />
                                        Стажёр получит бонус 3% от стоимости заказа
                                      </p>
                                    </div>
                                    {interns.map(intern => (
                                      <div key={intern.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div>
                                          <p className="font-medium">{intern.name} {intern.surname}</p>
                                          <p className="text-sm text-muted-foreground">
                                            Бонус: +{(order.totalPrice * 0.03).toFixed(0)} ₽
                                          </p>
                                        </div>
                                        <Button
                                          size="sm"
                                          onClick={() => {
                                            setSelectedOrder(order);
                                            setIsReturnDialogOpen(true);
                                            const closeBtn = document.querySelector('[data-state="open"]')?.querySelector('button');
                                            if (closeBtn instanceof HTMLElement) closeBtn.click();
                                          }}
                                          className="bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600"
                                        >
                                          <Icon name="Undo2" size={14} className="mr-1" />
                                          Оформить
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="returned" className="space-y-3">
                {returnedOrders.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Icon name="PackageX" size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="text-lg">Нет возвращённых заказов</p>
                  </div>
                ) : (
                  returnedOrders.map((order) => (
                    <Card key={order.id} className="border-l-4 border-l-red-600 hover:shadow-lg transition-all duration-300 animate-bounce-in">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                  <Icon name="User" size={18} />
                                  {order.customerName}
                                </h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Icon name="Barcode" size={14} />
                                  {order.barcode}
                                </p>
                              </div>
                              <Badge className="bg-red-100 text-red-700 border-red-300">
                                <Icon name="XCircle" size={12} className="mr-1" />
                                Возврат
                              </Badge>
                            </div>
                            {order.returnReason && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                <Icon name="AlertCircle" size={14} className="inline mr-1" />
                                {order.returnReason}
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Icon name="Package" size={14} />
                                {order.items.length} {order.items.length === 1 ? 'товар' : order.items.length < 5 ? 'товара' : 'товаров'}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-red-600">
                                <Icon name="Coins" size={14} />
                                {order.totalPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                              variant="outline"
                              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:scale-110 transition-all duration-500"
                            >
                              <Icon name="Eye" size={16} className="mr-2" />
                              Состав
                            </Button>
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

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              Состав заказа
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Покупатель</p>
                  <p className="font-semibold">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Штрих-код</p>
                  <p className="font-semibold">{selectedOrder.barcode}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Icon name="ShoppingBag" size={18} />
                  Товары ({selectedOrder.items.length})
                </h3>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Количество: {item.quantity} шт.</p>
                      </div>
                      <p className="font-semibold text-purple-600">{(item.price * item.quantity).toLocaleString('ru-RU')} ₽</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span className="text-purple-600">{selectedOrder.totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isReturnDialogOpen} onOpenChange={setIsReturnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Undo2" size={20} />
              Оформление возврата
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="returnReason">Причина возврата</Label>
              <RadioGroup value={returnReason} onValueChange={setReturnReason}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="Не подошёл размер" id="size" />
                  <Label htmlFor="size" className="cursor-pointer flex-1">Не подошёл размер</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="Брак товара" id="defect" />
                  <Label htmlFor="defect" className="cursor-pointer flex-1">Брак товара</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="Не соответствует описанию" id="description" />
                  <Label htmlFor="description" className="cursor-pointer flex-1">Не соответствует описанию</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="Передумал" id="changed_mind" />
                  <Label htmlFor="changed_mind" className="cursor-pointer flex-1">Передумал</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={returnOrder}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-700 hover:to-red-600 hover:scale-110 transition-all duration-500"
              >
                <Icon name="Check" size={16} className="mr-2" />
                Оформить возврат
              </Button>
              <Button
                onClick={() => {
                  setIsReturnDialogOpen(false);
                  setReturnReason('');
                }}
                variant="outline"
                className="hover:scale-110 transition-all duration-500"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Настройки приложения
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="text-sm font-semibold flex items-center gap-2">
                  <Icon name="Palette" size={16} />
                  Основной цвет
                </Label>
                <div className="flex gap-3">
                  <input
                    id="primaryColor"
                    type="color"
                    value={appTheme.primaryColor}
                    onChange={(e) => setAppTheme({ ...appTheme, primaryColor: e.target.value })}
                    className="w-20 h-12 rounded-lg cursor-pointer border-2 border-muted hover:scale-110 transition-transform"
                  />
                  <div className="flex-1">
                    <Input
                      value={appTheme.primaryColor}
                      onChange={(e) => setAppTheme({ ...appTheme, primaryColor: e.target.value })}
                      className="font-mono"
                      placeholder="#8b5cf6"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Цвет кнопок и акцентов</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accentColor" className="text-sm font-semibold flex items-center gap-2">
                  <Icon name="Sparkles" size={16} />
                  Дополнительный цвет
                </Label>
                <div className="flex gap-3">
                  <input
                    id="accentColor"
                    type="color"
                    value={appTheme.accentColor}
                    onChange={(e) => setAppTheme({ ...appTheme, accentColor: e.target.value })}
                    className="w-20 h-12 rounded-lg cursor-pointer border-2 border-muted hover:scale-110 transition-transform"
                  />
                  <div className="flex-1">
                    <Input
                      value={appTheme.accentColor}
                      onChange={(e) => setAppTheme({ ...appTheme, accentColor: e.target.value })}
                      className="font-mono"
                      placeholder="#a855f7"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Цвет градиентов</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-muted">
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Icon name="Eye" size={16} />
                  Предпросмотр
                </p>
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-gradient-to-r text-white hover:scale-110 transition-all duration-500 animate-shimmer"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${appTheme.primaryColor}, ${appTheme.accentColor})`,
                      color: 'white'
                    }}
                  >
                    <Icon name="Sparkles" size={16} className="mr-2" />
                    Пример кнопки
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setAppTheme({ primaryColor: '#8b5cf6', accentColor: '#a855f7' });
                  toast({
                    title: 'Цвета сброшены',
                    description: 'Восстановлены стандартные цвета',
                  });
                }}
                variant="outline"
                className="flex-1 hover:scale-110 transition-all duration-500"
              >
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сбросить
              </Button>
              <Button 
                onClick={() => {
                  setIsSettingsOpen(false);
                  toast({
                    title: 'Настройки сохранены',
                    description: 'Изменения применены',
                  });
                }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 hover:scale-110 transition-all duration-500"
              >
                <Icon name="Check" size={16} className="mr-2" />
                Готово
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isInternsOpen} onOpenChange={setIsInternsOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Users" size={20} />
              Управление стажёрами
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {!isAddingIntern ? (
              <Button 
                onClick={() => setIsAddingIntern(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600 hover:scale-105 transition-all duration-500"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Добавить стажёра
              </Button>
            ) : (
              <Card className="p-4 border-2 border-purple-200 bg-purple-50/50">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="internName">Имя</Label>
                    <Input
                      id="internName"
                      value={internName}
                      onChange={(e) => setInternName(e.target.value)}
                      placeholder="Введите имя"
                    />
                  </div>
                  <div>
                    <Label htmlFor="internSurname">Фамилия</Label>
                    <Input
                      id="internSurname"
                      value={internSurname}
                      onChange={(e) => setInternSurname(e.target.value)}
                      placeholder="Введите фамилию"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={addIntern}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600"
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Зарегистрировать
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAddingIntern(false);
                        setInternName('');
                        setInternSurname('');
                      }}
                      variant="outline"
                    >
                      Отмена
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {interns.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Users" size={48} className="mx-auto mb-4 opacity-20" />
                <p>Нет зарегистрированных стажёров</p>
                <p className="text-sm mt-2">Добавьте первого стажёра для начала работы</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interns.map((intern) => {
                  const efficiency = getEfficiencyLevel(intern);
                  return (
                    <Card 
                      key={intern.id} 
                      className="p-4 hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-600 cursor-pointer"
                      onClick={() => {
                        setSelectedIntern(intern);
                        setIsInternProfileOpen(true);
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon name="User" className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{intern.name} {intern.surname}</h3>
                              <p className="text-xs text-muted-foreground">
                                С {new Date(intern.createdAt).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                          </div>
                          {intern.warns.length > 0 && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                              <Icon name="AlertTriangle" size={12} />
                              {intern.warns.length}
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Эффективность</span>
                            <Badge 
                              className={`
                                ${efficiency.color === 'purple' ? 'bg-purple-100 text-purple-700 border-purple-300' : ''}
                                ${efficiency.color === 'blue' ? 'bg-blue-100 text-blue-700 border-blue-300' : ''}
                                ${efficiency.color === 'green' ? 'bg-green-100 text-green-700 border-green-300' : ''}
                                ${efficiency.color === 'yellow' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : ''}
                                ${efficiency.color === 'red' ? 'bg-red-100 text-red-700 border-red-300' : ''}
                                ${efficiency.color === 'gray' ? 'bg-gray-100 text-gray-700 border-gray-300' : ''}
                              `}
                            >
                              {efficiency.level}
                            </Badge>
                          </div>
                          <Progress value={efficiency.progress} className="h-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-green-600">
                            <Icon name="CheckCircle" size={14} />
                            <span className="font-semibold">{intern.issuedOrders}</span>
                            <span className="text-muted-foreground">выдано</span>
                          </div>
                          <div className="flex items-center gap-1 text-red-600">
                            <Icon name="XCircle" size={14} />
                            <span className="font-semibold">{intern.returnedOrders}</span>
                            <span className="text-muted-foreground">возврат</span>
                          </div>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Icon name="Wallet" size={16} className="text-purple-600" />
                            <span className="font-bold text-purple-600">{intern.salary.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                            {intern.salary > 0 && (
                              <Button
                                size="sm"
                                onClick={() => withdrawInternSalary(intern.id)}
                                className="bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 h-8 px-3"
                              >
                                <Icon name="Banknote" size={14} />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIntern(intern);
                                setIsWarnDialogOpen(true);
                              }}
                              className="border-orange-500 text-orange-600 hover:bg-orange-50 h-8 px-3"
                            >
                              <Icon name="AlertTriangle" size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeIntern(intern.id);
                              }}
                              className="border-red-500 text-red-600 hover:bg-red-50 h-8 px-3"
                            >
                              <Icon name="UserMinus" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isInternProfileOpen} onOpenChange={setIsInternProfileOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="UserCircle" size={24} />
              Профиль стажёра
            </DialogTitle>
          </DialogHeader>
          
          {selectedIntern && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  {!isEditingIntern ? (
                    <>
                      <h2 className="text-2xl font-bold">{selectedIntern.name} {selectedIntern.surname}</h2>
                      <p className="text-sm text-muted-foreground">
                        Работает с {new Date(selectedIntern.createdAt).toLocaleDateString('ru-RU', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge className={`
                          ${getEfficiencyLevel(selectedIntern).color === 'purple' ? 'bg-purple-100 text-purple-700 border-purple-300' : ''}
                          ${getEfficiencyLevel(selectedIntern).color === 'blue' ? 'bg-blue-100 text-blue-700 border-blue-300' : ''}
                          ${getEfficiencyLevel(selectedIntern).color === 'green' ? 'bg-green-100 text-green-700 border-green-300' : ''}
                          ${getEfficiencyLevel(selectedIntern).color === 'yellow' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : ''}
                          ${getEfficiencyLevel(selectedIntern).color === 'red' ? 'bg-red-100 text-red-700 border-red-300' : ''}
                          ${getEfficiencyLevel(selectedIntern).color === 'gray' ? 'bg-gray-100 text-gray-700 border-gray-300' : ''}
                        `}>
                          {getEfficiencyLevel(selectedIntern).level}
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          value={editInternName}
                          onChange={(e) => setEditInternName(e.target.value)}
                          placeholder="Имя"
                          className="flex-1"
                        />
                        <Input
                          value={editInternSurname}
                          onChange={(e) => setEditInternSurname(e.target.value)}
                          placeholder="Фамилия"
                          className="flex-1"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={updateInternInfo}
                          className="bg-gradient-to-r from-green-600 to-green-500 text-white"
                        >
                          <Icon name="Check" size={14} className="mr-1" />
                          Сохранить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditingIntern(false)}
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {!isEditingIntern && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsEditingIntern(true);
                      setEditInternName(selectedIntern.name);
                      setEditInternSurname(selectedIntern.surname);
                    }}
                    className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-2 border-green-100 bg-gradient-to-br from-green-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Выдано заказов</p>
                      <p className="text-2xl font-bold text-green-600">{selectedIntern.issuedOrders}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-red-100 bg-gradient-to-br from-red-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon name="XCircle" className="text-red-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Возвратов</p>
                      <p className="text-2xl font-bold text-red-600">{selectedIntern.returnedOrders}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Icon name="Wallet" className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Текущий баланс</p>
                      <p className="text-2xl font-bold text-purple-600">{selectedIntern.salary.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon name="TrendingUp" className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Всего заработано</p>
                      <p className="text-2xl font-bold text-blue-600">{selectedIntern.totalEarned.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </div>
                </Card>
              </div>

              {selectedIntern.warns.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="AlertTriangle" size={18} className="text-orange-600" />
                    Предупреждения ({selectedIntern.warns.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedIntern.warns.map((warn) => (
                      <Card key={warn.id} className="p-3 border-l-4 border-l-orange-500 bg-orange-50/50">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-orange-900">{warn.reason}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(warn.date).toLocaleDateString('ru-RU', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })} • {warn.issuedBy}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeWarn(selectedIntern.id, warn.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setIsWarnDialogOpen(true);
                    setIsInternProfileOpen(false);
                  }}
                  variant="outline"
                  className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  <Icon name="AlertTriangle" size={16} className="mr-2" />
                  Выдать предупреждение
                </Button>
                {selectedIntern.salary > 0 && (
                  <Button
                    onClick={() => {
                      withdrawInternSalary(selectedIntern.id);
                      setIsInternProfileOpen(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600"
                  >
                    <Icon name="Banknote" size={16} className="mr-2" />
                    Выплатить {selectedIntern.salary.toLocaleString('ru-RU')} ₽
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isWarnDialogOpen} onOpenChange={setIsWarnDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="AlertTriangle" size={20} className="text-orange-600" />
              Выдать предупреждение
            </DialogTitle>
          </DialogHeader>
          {selectedIntern && (
            <div className="space-y-4">
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="font-medium">{selectedIntern.name} {selectedIntern.surname}</p>
                <p className="text-sm text-muted-foreground">Текущих предупреждений: {selectedIntern.warns.length}</p>
              </div>
              
              <div>
                <Label htmlFor="warnReason">Причина предупреждения</Label>
                <RadioGroup value={warnReason} onValueChange={setWarnReason}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Опоздание на смену" id="late" />
                    <Label htmlFor="late" className="cursor-pointer flex-1">Опоздание на смену</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Грубость с клиентом" id="rude" />
                    <Label htmlFor="rude" className="cursor-pointer flex-1">Грубость с клиентом</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Ошибка при выдаче заказа" id="mistake" />
                    <Label htmlFor="mistake" className="cursor-pointer flex-1">Ошибка при выдаче заказа</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Несоблюдение дресс-кода" id="dress" />
                    <Label htmlFor="dress" className="cursor-pointer flex-1">Несоблюдение дресс-кода</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <RadioGroupItem value="Нарушение правил ПВЗ" id="rules" />
                    <Label htmlFor="rules" className="cursor-pointer flex-1">Нарушение правил ПВЗ</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={addWarnToIntern}
                  variant="destructive"
                  className="flex-1"
                >
                  <Icon name="AlertTriangle" size={16} className="mr-2" />
                  Выдать предупреждение
                </Button>
                <Button
                  onClick={() => {
                    setIsWarnDialogOpen(false);
                    setWarnReason('');
                    setIsInternProfileOpen(true);
                  }}
                  variant="outline"
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCuratorProfileOpen} onOpenChange={setIsCuratorProfileOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="UserCircle" size={24} />
              Профиль куратора
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Crown" className="text-white" size={32} />
              </div>
              <div className="flex-1">
                {!isEditingCurator ? (
                  <>
                    <h2 className="text-2xl font-bold">{curatorName}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Главный менеджер пункта выдачи
                    </p>
                    <Badge className="mt-2 bg-purple-100 text-purple-700 border-purple-300">
                      Администратор
                    </Badge>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Input
                      value={editCuratorName}
                      onChange={(e) => setEditCuratorName(e.target.value)}
                      placeholder="Имя куратора"
                      className="text-lg font-bold"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={updateCuratorName}
                        className="bg-gradient-to-r from-green-600 to-green-500 text-white"
                      >
                        <Icon name="Check" size={14} className="mr-1" />
                        Сохранить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingCurator(false)}
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              {!isEditingCurator && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditingCurator(true);
                    setEditCuratorName(curatorName);
                  }}
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
                >
                  <Icon name="Edit" size={16} />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Icon name="Wallet" className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Текущий баланс</p>
                    <p className="text-2xl font-bold text-purple-600">{curatorBalance.toLocaleString('ru-RU')} ₽</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-2 border-green-100 bg-gradient-to-br from-green-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Всего заказов</p>
                    <p className="text-2xl font-bold text-green-600">{orders.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Icon name="Users" className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Стажёров</p>
                    <p className="text-2xl font-bold text-blue-600">{interns.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border-2 border-orange-100 bg-gradient-to-br from-orange-50 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon name="TrendingUp" className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Выдано заказов</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {orders.filter(o => o.status === 'issued').length}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {curatorBalance > 0 && (
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-900">Доступно к выводу</p>
                    <p className="text-sm text-green-700">Нажмите кнопку для вывода средств</p>
                  </div>
                  <Button
                    onClick={() => {
                      withdrawCuratorBalance();
                      setIsCuratorProfileOpen(false);
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-500 text-white hover:from-green-700 hover:to-emerald-600 hover:scale-110 transition-all duration-500"
                  >
                    <Icon name="Banknote" size={18} className="mr-2" />
                    Вывести {curatorBalance.toLocaleString('ru-RU')} ₽
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => setIsCuratorProfileOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isExitCodeDialogOpen} onOpenChange={setIsExitCodeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="Lock" size={24} />
              Выход из режима стажёра
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-xl">
              <p className="text-sm text-orange-900">
                Для выхода из режима стажёра введите код, который был показан при входе
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exitCode">Код выхода</Label>
              <Input
                id="exitCode"
                type="text"
                placeholder="Введите 6-значный код"
                value={exitCodeInput}
                onChange={(e) => setExitCodeInput(e.target.value)}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={disableInternMode}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white"
              >
                <Icon name="Unlock" size={16} className="mr-2" />
                Подтвердить
              </Button>
              <Button
                onClick={() => {
                  setIsExitCodeDialogOpen(false);
                  setExitCodeInput('');
                }}
                variant="outline"
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSetCodeDialogOpen} onOpenChange={setIsSetCodeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name="KeyRound" size={24} />
              Установка кода для режима стажёра
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <p className="text-sm text-blue-900 font-semibold mb-2">
                Установите постоянный код для выхода из режима стажёра
              </p>
              <p className="text-xs text-blue-700">
                Этот код будет сохранён навсегда и потребуется для выхода из режима стажёра. Запомните его!
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newCode">Придумайте 6-значный код</Label>
              <Input
                id="newCode"
                type="text"
                placeholder="Введите 6 цифр"
                value={newCodeInput}
                onChange={(e) => setNewCodeInput(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={setInternCode}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white"
              >
                <Icon name="Lock" size={16} className="mr-2" />
                Установить код
              </Button>
              <Button
                onClick={() => {
                  setIsSetCodeDialogOpen(false);
                  setNewCodeInput('');
                }}
                variant="outline"
                className="flex-1"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;