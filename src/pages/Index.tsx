
import HeroSection from "@/components/home/HeroSection";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import MainLayout from "@/components/layout/MainLayout";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/components/shared/ProductCard";

// Mock product data for recommendations
const recommendedProducts: Product[] = [
  {
    id: "9",
    name: "زبادي طبيعي",
    price: 12.5,
    image: "https://images.unsplash.com/photo-1571212515416-fca325e3e853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "ألبان",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "10",
    name: "عسل طبيعي",
    price: 45.99,
    originalPrice: 55.99,
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "أساسيات",
    rating: 4.9,
    isOnSale: true,
  },
  {
    id: "11",
    name: "مربى فراولة",
    price: 17.25,
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "أساسيات",
    rating: 4.2,
  },
  {
    id: "12",
    name: "زيت زيتون بكر",
    price: 65.75,
    originalPrice: 75.99,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "زيوت",
    rating: 4.8,
    isOnSale: true,
  },
  {
    id: "13",
    name: "شاي أخضر",
    price: 22.5,
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "مشروبات",
    rating: 4.4,
  },
  {
    id: "14",
    name: "معكرونة إيطالية",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "أساسيات",
    rating: 4.3,
  },
  {
    id: "15",
    name: "بن مطحون",
    price: 49.9,
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "مشروبات",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "16",
    name: "مكسرات مشكلة",
    price: 59.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "وجبات خفيفة",
    rating: 4.6,
    isOnSale: true,
  },
];

// Mock deals products
const dealsProducts: Product[] = [
  {
    id: "17",
    name: "مانجو طازج",
    price: 25.99,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "فواكه",
    rating: 4.8,
    isOnSale: true,
  },
  {
    id: "18",
    name: "سمك طازج",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "مأكولات بحرية",
    rating: 4.7,
    isOnSale: true,
  },
  {
    id: "19",
    name: "زبدة طبيعية",
    price: 15.75,
    originalPrice: 21.5,
    image: "https://images.unsplash.com/photo-1589985270958-bf087b520615?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "ألبان",
    rating: 4.3,
    isOnSale: true,
  },
  {
    id: "20",
    name: "شوكولاتة داكنة",
    price: 19.99,
    originalPrice: 29.99,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "حلويات",
    rating: 4.9,
    isOnSale: true,
  },
  {
    id: "21",
    name: "صابون طبيعي",
    price: 12.5,
    originalPrice: 17.99,
    image: "https://images.unsplash.com/photo-1607006483722-3e501457d406?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "منتجات العناية",
    rating: 4.5,
    isOnSale: true,
  },
  {
    id: "22",
    name: "عصير ليمون طازج",
    price: 14.5,
    originalPrice: 18.99,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "مشروبات",
    rating: 4.6,
    isOnSale: true,
  },
  {
    id: "23",
    name: "جبنة فيتا",
    price: 24.99,
    originalPrice: 32.5,
    image: "https://images.unsplash.com/photo-1626957341926-98752fc2ba90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "ألبان",
    rating: 4.4,
    isOnSale: true,
  },
  {
    id: "24",
    name: "شامبو طبيعي",
    price: 29.75,
    originalPrice: 39.99,
    image: "https://images.unsplash.com/photo-1608248597279-f99d09cedc2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "منتجات العناية",
    rating: 4.2,
    isOnSale: true,
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-10">
          {/* Categories */}
          <CategoryCarousel className="mb-16" />
          
          {/* Special Deals */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm font-medium">
                  عروض خاصة
                </div>
                <h2 className="text-2xl font-bold">خصومات اليوم</h2>
              </div>
              <Button
                variant="ghost"
                className="text-primary"
                asChild
              >
                <a href="/products?sale=true" className="flex items-center gap-1.5">
                  عرض الكل
                  <ChevronLeft className="h-4 w-4" />
                </a>
              </Button>
            </div>
            
            <FeaturedProducts 
              products={dealsProducts}
              title=""
            />
          </div>
          
          {/* Recommendations */}
          <FeaturedProducts 
            title="منتجات موصى بها"
            subtitle="منتجات مختارة خصيصاً لك"
            products={recommendedProducts}
            className="mb-16"
          />
          
          {/* Promo Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
              <div className="relative z-10">
                <span className="block text-blue-600 font-medium mb-2">منتجات صحية</span>
                <h3 className="text-2xl font-bold mb-4">منتجات عضوية 100%</h3>
                <p className="text-gray-700 mb-6">استمتع بأفضل المنتجات العضوية الطازجة مباشرة من المزرعة إلى منزلك.</p>
                <Button asChild>
                  <a href="/products?organic=true">تسوق الآن</a>
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 w-1/2 opacity-30">
                <img 
                  src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="منتجات عضوية"
                  className="transform scale-125"
                />
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 p-6 md:p-8">
              <div className="relative z-10">
                <span className="block text-orange-600 font-medium mb-2">عرض محدود</span>
                <h3 className="text-2xl font-bold mb-4">احصل على خصم 20%</h3>
                <p className="text-gray-700 mb-6">استخدم كود "BAGALA20" واحصل على خصم 20% على طلبك الأول.</p>
                <Button variant="outline" className="bg-white" asChild>
                  <a href="/products">استفد من العرض</a>
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 w-1/2 opacity-30">
                <img 
                  src="https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="خصم خاص"
                  className="transform scale-125"
                />
              </div>
            </div>
          </div>
          
          {/* App Features */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-10">لماذا تتسوق معنا؟</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 rounded-xl bg-blue-50">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">منتجات طازجة 100%</h3>
                <p className="text-gray-600">نضمن لكم أفضل المنتجات الطازجة يومياً</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-green-50">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">توصيل سريع</h3>
                <p className="text-gray-600">توصيل خلال ساعتين لجميع الطلبات</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-purple-50">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-purple-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">دفع آمن</h3>
                <p className="text-gray-600">طرق دفع متعددة وآمنة 100%</p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-orange-50">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-orange-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">تسوق سهل</h3>
                <p className="text-gray-600">واجهة سهلة الاستخدام وتصفح بسيط</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
