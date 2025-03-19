
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Grid,
  List,
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Search,
  X 
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard, { Product } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";

// Mock products (combine all products from Index.tsx)
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
  // Add more mock products here to simulate a larger catalog
];

// Available categories
const categories = [
  { id: "all", name: "جميع الفئات" },
  { id: "fruits", name: "فواكه" },
  { id: "vegetables", name: "خضروات" },
  { id: "dairy", name: "ألبان" },
  { id: "meat", name: "لحوم" },
  { id: "bakery", name: "مخبوزات" },
  { id: "beverages", name: "مشروبات" },
  { id: "essentials", name: "أساسيات" },
  { id: "oils", name: "زيوت" },
];

const sortOptions = [
  { value: "newest", label: "الأحدث" },
  { value: "priceAsc", label: "السعر: من الأقل إلى الأعلى" },
  { value: "priceDesc", label: "السعر: من الأعلى إلى الأقل" },
  { value: "rating", label: "الأعلى تقييماً" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("newest");
  const [showSale, setShowSale] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Initialize filters from URL parameters
  useEffect(() => {
    const category = searchParams.get("category");
    const sale = searchParams.get("sale");
    const query = searchParams.get("query");
    
    if (category) {
      setSelectedCategories([category]);
    }
    
    if (sale === "true") {
      setShowSale(true);
    }
    
    if (query) {
      setSearchQuery(query);
    }
    
    // Apply filters
    applyFilters();
  }, [searchParams]);

  // Apply all filters
  const applyFilters = () => {
    let result = [...allProducts];
    
    // Filter by categories
    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      result = result.filter(product => 
        selectedCategories.some(cat => product.category.toLowerCase().includes(cat.toLowerCase()))
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter sale items
    if (showSale) {
      result = result.filter(product => product.isOnSale);
    }
    
    // Filter new items
    if (showNew) {
      result = result.filter(product => product.isNew);
    }
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (selectedSort) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // newest
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }
    
    setFilteredProducts(result);
  };

  // Handle filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange, showSale, showNew, selectedSort, searchQuery]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setShowSale(false);
    setShowNew(false);
    setSearchQuery("");
    setSelectedSort("newest");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">تصفح المنتجات</h1>
          <p className="text-muted-foreground">اكتشف مجموعة واسعة من المنتجات عالية الجودة</p>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن منتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 h-11 rounded-xl w-full"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            {/* Sort Dropdown */}
            <Select
              value={selectedSort}
              onValueChange={setSelectedSort}
            >
              <SelectTrigger className="w-[180px] h-11 rounded-xl">
                <SelectValue placeholder="الفرز حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {/* View Mode Toggle */}
            <div className="flex rounded-xl overflow-hidden border border-border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-11 w-11"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="rounded-none h-11 w-11"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 gap-2 rounded-xl md:hidden">
                  <Filter className="h-4 w-4" />
                  <span>فلترة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>فلترة المنتجات</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <FilterContent
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    showSale={showSale}
                    setShowSale={setShowSale}
                    showNew={showNew}
                    setShowNew={setShowNew}
                    resetFilters={resetFilters}
                    isMobile={true}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Active Filters */}
        {(selectedCategories.length > 0 || showSale || showNew || searchQuery) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedCategories.map((cat) => (
              <div 
                key={cat}
                className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm"
              >
                <span>
                  {categories.find(c => c.id === cat)?.name || cat}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-primary/20"
                  onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            
            {showSale && (
              <div className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-sm">
                <span>خصومات</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-red-200"
                  onClick={() => setShowSale(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {showNew && (
              <div className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1.5 rounded-full text-sm">
                <span>منتجات جديدة</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-green-200"
                  onClick={() => setShowNew(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {searchQuery && (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full text-sm">
                <span>بحث: {searchQuery}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full hover:bg-blue-200"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={resetFilters}
            >
              إعادة ضبط الكل
            </Button>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <FilterContent
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              showSale={showSale}
              setShowSale={setShowSale}
              showNew={showNew}
              setShowNew={setShowNew}
              resetFilters={resetFilters}
              isMobile={false}
            />
          </div>
          
          {/* Products */}
          <div className="flex-grow">
            {/* Products Count */}
            <div className="text-muted-foreground mb-6">
              عرض {filteredProducts.length} منتج
            </div>
            
            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">لا توجد منتجات</h3>
                <p className="text-muted-foreground mb-6">
                  لم نتمكن من العثور على منتجات تطابق فلترك. حاول تغيير معايير البحث.
                </p>
                <Button onClick={resetFilters}>
                  إعادة ضبط الفلاتر
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    variant="horizontal" 
                  />
                ))}
              </div>
            )}
            
            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="mt-10 text-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => {}}
                >
                  تحميل المزيد
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Filter Content Component for both Sidebar and Mobile Sheet
interface FilterContentProps {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  showSale: boolean;
  setShowSale: (show: boolean) => void;
  showNew: boolean;
  setShowNew: (show: boolean) => void;
  resetFilters: () => void;
  isMobile: boolean;
}

const FilterContent = ({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  showSale,
  setShowSale,
  showNew,
  setShowNew,
  resetFilters,
  isMobile
}: FilterContentProps) => {
  return (
    <div className="space-y-6">
      {isMobile && (
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">الفلاتر</h3>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={resetFilters}
          >
            إعادة ضبط
          </Button>
        </div>
      )}
      
      {!isMobile && (
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-4">الفلاتر</h3>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={resetFilters}
          >
            إعادة ضبط الفلاتر
          </Button>
        </div>
      )}
      
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">الفئات</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    if (category.id === "all") {
                      setSelectedCategories(["all"]);
                    } else {
                      setSelectedCategories([
                        ...selectedCategories.filter(c => c !== "all"),
                        category.id
                      ]);
                    }
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter(c => c !== category.id)
                    );
                  }
                }}
                className="ml-2"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">نطاق السعر</h3>
        <div className="mb-6 px-2">
          <Slider
            defaultValue={[0, 100]}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={100}
            step={1}
            className="my-6"
          />
          <div className="flex justify-between">
            <span>{priceRange[0]} ريال</span>
            <span>{priceRange[1]} ريال</span>
          </div>
        </div>
      </div>
      
      {/* Special Filters */}
      <div>
        <h3 className="font-semibold mb-3">فلاتر خاصة</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="filter-sale"
              checked={showSale}
              onCheckedChange={(checked) => setShowSale(!!checked)}
              className="ml-2"
            />
            <label htmlFor="filter-sale" className="text-sm cursor-pointer">
              عروض وخصومات
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="filter-new"
              checked={showNew}
              onCheckedChange={(checked) => setShowNew(!!checked)}
              className="ml-2"
            />
            <label htmlFor="filter-new" className="text-sm cursor-pointer">
              منتجات جديدة
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
