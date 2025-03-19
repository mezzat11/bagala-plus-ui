
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/shared/SearchBar";

// Mock hero images
const heroImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
    title: "تسوق أفضل المنتجات الطازجة",
    description: "مع بقالة بلس+، احصل على أفضل الفواكه والخضروات الطازجة مباشرة إلى منزلك",
    ctaText: "تسوق الآن",
    ctaLink: "/products",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
    title: "خصومات حصرية على المنتجات العضوية",
    description: "استمتع بخصومات تصل إلى 30% على جميع المنتجات العضوية هذا الأسبوع",
    ctaText: "اكتشف العروض",
    ctaLink: "/products?sale=true",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80",
    title: "منتجات متنوعة لجميع احتياجاتك",
    description: "اختر من بين آلاف المنتجات عالية الجودة واحصل على توصيل سريع",
    ctaText: "تصفح المنتجات",
    ctaLink: "/products",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  const goToPrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToNextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative overflow-hidden h-[500px] md:h-[550px] lg:h-[600px]">
      {/* Hero Slides */}
      <div className="absolute inset-0">
        {heroImages.map((hero, index) => (
          <div
            key={hero.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${hero.image})`,
                transition: "transform 6s ease-in-out",
                transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>
      
      {/* Hero Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-xl space-y-6 text-right animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {heroImages[currentSlide].title}
          </h1>
          <p className="text-lg text-white/90">
            {heroImages[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="text-base"
              asChild
            >
              <a href={heroImages[currentSlide].ctaLink}>
                {heroImages[currentSlide].ctaText}
              </a>
            </Button>
            
            <div className="relative z-10 sm:w-80">
              <SearchBar 
                placeholder="ابحث عن منتجات..."
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full h-10 w-10"
        onClick={goToPrevSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      <Button
        size="icon"
        variant="ghost"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full h-10 w-10"
        onClick={goToNextSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
