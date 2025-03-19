
import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "@/components/shared/ProductCard";

// Mock product data
const mockProducts: Product[] = [
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
  {
    id: "4",
    name: "حليب طازج كامل الدسم",
    price: 22.75,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "ألبان",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "5",
    name: "خبز أبيض",
    price: 7.5,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "مخبوزات",
    rating: 4.4,
  },
  {
    id: "6",
    name: "عصير برتقال طبيعي",
    price: 18.9,
    originalPrice: 24.5,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "مشروبات",
    rating: 4.9,
    isOnSale: true,
  },
  {
    id: "7",
    name: "دجاج طازج",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "لحوم",
    rating: 4.6,
    isNew: true,
  },
  {
    id: "8",
    name: "أرز بسمتي",
    price: 29.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    category: "أساسيات",
    rating: 4.3,
    isOnSale: true,
  },
];

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  className?: string;
}

const FeaturedProducts = ({ 
  title = "منتجات مميزة", 
  subtitle,
  products = mockProducts,
  className = "",
}: FeaturedProductsProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    
    const { scrollWidth, clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth * 0.8;
    
    const newPosition = direction === "left" 
      ? Math.min(scrollPosition + scrollAmount, scrollWidth - clientWidth) 
      : Math.max(scrollPosition - scrollAmount, 0);
    
    carouselRef.current.scrollTo({
      left: direction === "left" ? newPosition : scrollWidth - newPosition,
      behavior: "smooth",
    });
    
    setScrollPosition(newPosition);
  };
  
  const handleScroll = () => {
    if (!carouselRef.current) return;
    setScrollPosition(carouselRef.current.scrollLeft);
  };

  const showLeftButton = scrollPosition < (carouselRef.current?.scrollWidth || 0) - (carouselRef.current?.clientWidth || 0);
  const showRightButton = scrollPosition > 0;

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={!showRightButton}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={!showLeftButton}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4"
        onScroll={handleScroll}
        dir="rtl"
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64 md:w-72">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
