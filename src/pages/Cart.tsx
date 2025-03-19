
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingCart,
  CreditCard,
  Truck,
  ShieldCheck
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedImage from "@/components/shared/AnimatedImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Mock cart items
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "تفاح أخضر طازج",
    price: 15.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "فواكه",
    quantity: 2,
  },
  {
    id: "4",
    name: "حليب طازج كامل الدسم",
    price: 22.75,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "ألبان",
    quantity: 1,
  },
  {
    id: "6",
    name: "عصير برتقال طبيعي",
    price: 18.9,
    originalPrice: 24.5,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "مشروبات",
    quantity: 1,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Shipping cost
  const shippingCost = subtotal >= 200 ? 0 : 15;
  
  // Calculate total
  const total = subtotal + shippingCost - discount;
  
  // Handle quantity change
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  // Handle remove item
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "تمت إزالة المنتج",
      description: "تم إزالة المنتج من سلة التسوق الخاصة بك.",
    });
  };
  
  // Handle apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) return;
    
    setIsApplyingPromo(true);
    
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === "BAGALA20") {
        const newDiscount = Math.round(subtotal * 0.2);
        setDiscount(newDiscount);
        
        toast({
          title: "تم تطبيق الخصم",
          description: `تم تطبيق رمز الخصم BAGALA20 بنجاح، وفرت ${newDiscount} ريال.`,
        });
      } else {
        toast({
          title: "رمز غير صالح",
          description: "الرمز الترويجي الذي أدخلته غير صالح أو منتهي الصلاحية.",
          variant: "destructive",
        });
      }
      
      setIsApplyingPromo(false);
    }, 1000);
  };
  
  // Handle checkout
  const handleCheckout = () => {
    toast({
      title: "تم الانتقال إلى الدفع",
      description: "سيتم توجيهك إلى صفحة الدفع لإتمام طلبك.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
            الرئيسية
          </Link>
          <span className="text-muted-foreground text-sm">/</span>
          <span className="font-medium text-sm">سلة التسوق</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">سلة التسوق</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">سلة التسوق فارغة</h2>
            <p className="text-muted-foreground mb-8">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. تصفح منتجاتنا وأضف ما تحتاجه.
            </p>
            <Button size="lg" asChild>
              <Link to="/products">تصفح المنتجات</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                      المنتجات ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                    </h2>
                    <Link
                      to="/products"
                      className="text-primary flex items-center gap-1.5 text-sm hover:underline"
                    >
                      <ArrowRight className="h-4 w-4" />
                      مواصلة التسوق
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex py-4 border-b border-border last:border-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Link to={`/product/${item.id}`}>
                            <AnimatedImage 
                              src={item.image} 
                              alt={item.name}
                              aspectRatio="square"
                            />
                          </Link>
                        </div>
                        
                        <div className="flex-grow mr-4">
                          <div className="flex justify-between">
                            <Link 
                              to={`/product/${item.id}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground h-6 w-6"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.category}
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border border-border rounded-lg overflow-hidden">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-none h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <div className="w-8 text-center text-sm">
                                {item.quantity}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-none h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold">
                                {(item.price * item.quantity).toFixed(2)} ريال
                              </div>
                              {item.originalPrice && (
                                <div className="text-sm text-muted-foreground line-through">
                                  {(item.originalPrice * item.quantity).toFixed(2)} ريال
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden sticky top-20">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">ملخص الطلب</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المجموع الفرعي</span>
                      <span>{subtotal.toFixed(2)} ريال</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الشحن</span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">مجاني</span>
                      ) : (
                        <span>{shippingCost.toFixed(2)} ريال</span>
                      )}
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>الخصم</span>
                        <span>- {discount.toFixed(2)} ريال</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-bold">
                      <span>الإجمالي</span>
                      <span>{total.toFixed(2)} ريال</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <div className="mb-4">
                      <label htmlFor="promo-code" className="text-sm font-medium block mb-2">
                        رمز ترويجي
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="promo-code"
                          placeholder="أدخل الرمز"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="h-10"
                        />
                        <Button 
                          onClick={applyPromoCode} 
                          disabled={isApplyingPromo || !promoCode.trim()}
                          className="whitespace-nowrap"
                        >
                          {isApplyingPromo ? "جاري التطبيق..." : "تطبيق"}
                        </Button>
                      </div>
                      {discount > 0 && (
                        <p className="text-green-600 text-sm mt-2">
                          تم تطبيق الخصم: BAGALA20 (20%)
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="w-full mb-4"
                    onClick={handleCheckout}
                  >
                    متابعة الدفع
                  </Button>
                  
                  <div className="text-xs text-muted-foreground">
                    بالضغط على "متابعة الدفع"، فإنك توافق على 
                    <Link to="/terms" className="text-primary hover:underline mx-1">
                      الشروط والأحكام
                    </Link>
                    و
                    <Link to="/privacy" className="text-primary hover:underline mr-1">
                      سياسة الخصوصية
                    </Link>
                    الخاصة بنا.
                  </div>
                </div>
                
                <div className="border-t border-border p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">دفع آمن 100%</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">توصيل سريع خلال 24 ساعة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm">ضمان جودة المنتج</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
