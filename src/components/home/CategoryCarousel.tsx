
import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedImage from "@/components/shared/AnimatedImage";

// Mock category data
const categories = [
  {
    id: "fruits",
    name: "فواكه",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-orange-50",
  },
  {
    id: "vegetables",
    name: "خضروات",
    image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-green-50",
  },
  {
    id: "dairy",
    name: "منتجات الألبان",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-blue-50",
  },
  {
    id: "bakery",
    name: "المخبوزات",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-amber-50",
  },
  {
    id: "meat",
    name: "لحوم",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-red-50",
  },
  {
    id: "beverages",
    name: "مشروبات",
    image: "https://images.unsplash.com/photo-1596803244618-8dbd8f427125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-cyan-50",
  },
  {
    id: "frozen",
    name: "مجمدات",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-indigo-50",
  },
  {
    id: "snacks",
    name: "وجبات خفيفة",
    image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    color: "bg-yellow-50",
  },
];

interface CategoryCarouselProps {
  className?: string;
}

const CategoryCarousel = ({ className = "" }: CategoryCarouselProps) => {
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
        <h2 className="text-2xl font-bold">تصفح حسب الفئة</h2>
        
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
        {categories.map((category) => (
          <a 
            key={category.id}
            href={`/products?category=${category.id}`}
            className="block flex-shrink-0 w-40 sm:w-48 transition-all-medium hover:scale-[1.03]"
          >
            <div className={`rounded-2xl overflow-hidden ${category.color}`}>
              <div className="h-40 sm:h-48">
                <AnimatedImage
                  src={category.image}
                  alt={category.name}
                  fill
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryCarousel;
