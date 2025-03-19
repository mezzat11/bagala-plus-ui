
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowRight, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Star, 
  Heart, 
  Share,
  ChevronLeft
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedImage from "@/components/shared/AnimatedImage";
import ProductCard, { Product } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { useToast } from "@/hooks/use-toast";

// Mock product data (same as in the other components)
const allProducts: Product[] = [
  {
    id: "1",
    name: "تفاح أخضر طازج",
    price: 15.99,
    originalPrice: 19.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "فواكه",
    rating: 4.8,
    isOnSale: true,
  },
  {
    id: "2",
    name: "موز أصفر",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "فواكه",
    rating: 4.5,
  },
  {
    id: "3",
    name: "طماطم طازجة",
    price: 8.99,
    originalPrice: 10.99,
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "خضروات",
    rating: 4.2,
    isOnSale: true,
  },
  // Add more...
];

// Mock reviews
const reviews = [
  {
    id: 1,
    user: "أحمد محمد",
    rating: 5,
    date: "2023-05-15",
    comment: "منتج ممتاز، طازج وذو جودة عالية. سأشتريه مرة أخرى بالتأكيد.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    user: "سارة علي",
    rating: 4,
    date: "2023-05-10",
    comment: "المنتج جيد، لكن التغليف كان يمكن أن يكون أفضل.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    user: "محمد عبدالله",
    rating: 5,
    date: "2023-05-02",
    comment: "منتج رائع وطازج، وصل بسرعة كبيرة. أوصي به بشدة.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Find the product from mock data
  const product = allProducts.find(p => p.id === id) || allProducts[0];
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  
  // Mock product images
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1561136594-7f68413baa99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  ];
  
  // Similar products
  const similarProducts = allProducts.filter(p => 
    p.id !== product.id && p.category === product.category
  ).slice(0, 4);
  
  // Handle changing quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${quantity} ${product.name} إلى سلة التسوق الخاصة بك.`,
    });
  };
  
  // Handle toggle favorite
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة",
      description: isFavorite 
        ? `تمت إزالة ${product.name} من قائمة المفضلة.`
        : `تمت إضافة ${product.name} إلى قائمة المفضلة.`,
    });
  };
  
  // Render discount badge
  const renderDiscountPercentage = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      const discountPercentage = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
      return `${discountPercentage}%-`;
    }
    return null;
  };
  
  const discount = renderDiscountPercentage();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            الرئيسية
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
            المنتجات
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to={`/products?category=${product.category}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">{product.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-border">
              {discount && (
                <Badge 
                  variant="destructive" 
                  className="absolute top-4 right-4 font-bold z-10"
                >
                  {discount}
                </Badge>
              )}
              
              {product.isNew && (
                <Badge 
                  className="absolute top-4 left-4 bg-green-500 hover:bg-green-600 z-10"
                >
                  جديد
                </Badge>
              )}
              
              <AnimatedImage 
                src={productImages[activeImage]} 
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-contain p-4"
              />
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative rounded-lg overflow-hidden border-2 ${
                    activeImage === index 
                      ? 'border-primary' 
                      : 'border-border'
                  } transition-all-fast w-20 h-20 flex-shrink-0`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - صورة ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <span className="text-sm text-muted-foreground mb-1 block">
              {product.category}
            </span>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-sm">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({reviews.length} تقييمات)
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">{product.price} ريال</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {product.originalPrice} ريال
                  </span>
                )}
                {discount && (
                  <Badge variant="destructive" className="font-bold">
                    {discount}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                شامل الضريبة
              </p>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">الوصف</h3>
              <p className="text-muted-foreground">
                {product.name} طازج وعالي الجودة. يتم اختياره بعناية من أفضل المزارع لضمان أعلى جودة. مثالي للاستخدام اليومي في الوجبات الصحية.
              </p>
            </div>
            
            <div className="flex items-center gap-6 mb-6">
              <h3 className="font-semibold">الكمية</h3>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-10 w-10"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-10 text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-10 w-10"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                size="lg" 
                className="flex-grow"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="ml-2 h-5 w-5" />
                إضافة إلى السلة
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full ${
                  isFavorite ? 'text-red-500 border-red-200 hover:text-red-600' : ''
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500' : ''}`} />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <Share className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg">
              <p className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                متوفر في المخزون - يمكن التوصيل خلال 24 ساعة
              </p>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">تفاصيل المنتج</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              <TabsTrigger value="shipping">الشحن والإرجاع</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-6 border rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-4">تفاصيل المنتج</h3>
              <p className="mb-4 text-muted-foreground">
                {product.name} منتج طازج وعالي الجودة يتم اختياره بعناية من أفضل المزارع.
              </p>
              
              <h4 className="font-semibold mt-6 mb-2">المميزات</h4>
              <ul className="list-disc mr-6 text-muted-foreground space-y-1">
                <li>طازج وعالي الجودة</li>
                <li>غني بالفيتامينات والمعادن</li>
                <li>خالي من المواد الحافظة</li>
                <li>مناسب للنظام الغذائي الصحي</li>
              </ul>
              
              <h4 className="font-semibold mt-6 mb-2">المعلومات الغذائية</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 border-l font-medium">السعرات الحرارية</td>
                      <td className="p-2">52 سعر حراري</td>
                    </tr>
                    <tr className="border-b bg-muted/50">
                      <td className="p-2 border-l font-medium">البروتين</td>
                      <td className="p-2">0.3 جرام</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 border-l font-medium">الكربوهيدرات</td>
                      <td className="p-2">14 جرام</td>
                    </tr>
                    <tr className="border-b bg-muted/50">
                      <td className="p-2 border-l font-medium">الدهون</td>
                      <td className="p-2">0.2 جرام</td>
                    </tr>
                    <tr>
                      <td className="p-2 border-l font-medium">الألياف</td>
                      <td className="p-2">2.4 جرام</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6 border rounded-lg mt-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">التقييمات والمراجعات</h3>
                <Button>كتابة مراجعة</Button>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400' : ''}`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{product.rating} من 5</span>
                  <span className="text-muted-foreground">({reviews.length} تقييم)</span>
                </div>
                
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(r => r.rating === rating).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    
                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center w-24">
                          <span className="ml-1">{rating}</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={review.avatar} 
                          alt={review.user} 
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium">{review.user}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${
                                  i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-2">{review.comment}</p>
                  </div>
                ))}
                
                {reviews.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">لا توجد مراجعات بعد.</p>
                    <Button>كن أول من يراجع هذا المنتج</Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="p-6 border rounded-lg mt-4">
              <h3 className="text-xl font-semibold mb-4">معلومات الشحن والإرجاع</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">سياسة الشحن</h4>
                  <p className="text-muted-foreground">
                    نحن نوفر خدمة توصيل سريعة لجميع الطلبات. يتم شحن الطلبات في نفس اليوم إذا تم تقديمها قبل الساعة 2 مساءً. يستغرق التوصيل عادة من 24 إلى 48 ساعة حسب موقعك.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">رسوم التوصيل</h4>
                  <p className="text-muted-foreground">
                    التوصيل مجاني للطلبات التي تزيد قيمتها عن 200 ريال. تطبق رسوم توصيل قدرها 15 ريال على الطلبات الأقل من ذلك.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">سياسة الإرجاع</h4>
                  <p className="text-muted-foreground">
                    يمكن إرجاع المنتجات في غضون 7 أيام من تاريخ الاستلام إذا كانت غير مستخدمة وفي حالتها الأصلية. لا يمكن إرجاع المنتجات القابلة للتلف بعد التسليم ما لم تكن تالفة أو منتهية الصلاحية.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">كيفية طلب الإرجاع</h4>
                  <p className="text-muted-foreground">
                    لطلب إرجاع، يرجى الاتصال بخدمة العملاء على الرقم 8001234567 أو إرسال بريد إلكتروني إلى returns@bagalaplus.com خلال 48 ساعة من استلام الطلب.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Similar Products */}
        <div className="mb-16">
          <FeaturedProducts 
            title="منتجات مشابهة"
            subtitle="قد تعجبك هذه المنتجات أيضاً"
            products={similarProducts}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetails;
