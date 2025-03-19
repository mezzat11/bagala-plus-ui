
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedImage from "./AnimatedImage";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  isOnSale?: boolean;
  isFavorite?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: "default" | "horizontal" | "minimal";
}

const ProductCard = ({ 
  product, 
  className = "",
  variant = "default" 
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تمت إضافة ${product.name} إلى سلة التسوق الخاصة بك.`,
    });
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة",
      description: isFavorite 
        ? `تمت إزالة ${product.name} من قائمة المفضلة.`
        : `تمت إضافة ${product.name} إلى قائمة المفضلة.`,
    });
  };
  
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
  
  // Horizontal variant (for search results, etc.)
  if (variant === "horizontal") {
    return (
      <Link 
        to={`/product/${product.id}`} 
        className={`block group relative bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-all-medium ${className}`}
      >
        <div className="flex">
          <div className="w-1/3 relative">
            <AnimatedImage 
              src={product.image} 
              alt={product.name}
              aspectRatio="square"
            />
            {discount && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 right-2 font-bold"
              >
                {discount}
              </Badge>
            )}
            {product.isNew && (
              <Badge 
                className="absolute top-2 left-2 bg-green-500 hover:bg-green-600"
              >
                جديد
              </Badge>
            )}
          </div>
          <div className="w-2/3 p-4">
            <div className="flex justify-between mb-1">
              <span className="text-xs text-muted-foreground">{product.category}</span>
              <div className="flex items-center">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-xs">{product.rating}</span>
              </div>
            </div>
            <h3 className="font-medium mb-2 group-hover:text-primary transition-all-fast">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="font-bold">{product.price} ريال</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice} ريال
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Button 
                size="sm" 
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 ml-2" />
                إضافة للسلة
              </Button>
              <Button
                size="icon"
                variant="outline"
                className={`rounded-full ${isFavorite ? 'text-red-500 border-red-200 hover:text-red-600' : ''}`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Minimal variant (for recommendations, etc.)
  if (variant === "minimal") {
    return (
      <Link 
        to={`/product/${product.id}`} 
        className={`block group bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-all-medium ${className}`}
      >
        <div className="relative">
          <AnimatedImage 
            src={product.image} 
            alt={product.name}
            aspectRatio="square"
          />
          {discount && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 right-2 font-bold"
            >
              {discount}
            </Badge>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-all-fast">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-1">
            <span className="font-bold text-sm">{product.price} ريال</span>
            <div className="flex items-center">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 ml-1" />
              <span className="text-xs">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
  
  // Default variant
  return (
    <Link 
      to={`/product/${product.id}`} 
      className={`block group relative bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-all-medium ${className}`}
    >
      <div className="relative">
        <AnimatedImage 
          src={product.image} 
          alt={product.name}
          aspectRatio="square"
        />
        
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 left-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white ${
            isFavorite ? 'text-red-500 hover:text-red-600' : ''
          }`}
          onClick={handleToggleFavorite}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
        </Button>
        
        {discount && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 right-2 font-bold"
          >
            {discount}
          </Badge>
        )}
        
        {product.isNew && (
          <Badge 
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600"
          >
            جديد
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between mb-1">
          <span className="text-xs text-muted-foreground">{product.category}</span>
          <div className="flex items-center">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 ml-1" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-medium mb-2 line-clamp-1 group-hover:text-primary transition-all-fast">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold">{product.price} ريال</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {product.originalPrice} ريال
            </span>
          )}
        </div>
        
        <Button 
          className="w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4 ml-2" />
          إضافة للسلة
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
