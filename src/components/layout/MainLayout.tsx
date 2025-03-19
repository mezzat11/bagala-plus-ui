
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Home, 
  Grid, 
  User, 
  Heart,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Set RTL direction for the whole app
    document.documentElement.setAttribute("dir", "rtl");
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "المنتجات", path: "/products", icon: <Grid className="w-5 h-5" /> },
    { name: "الحساب", path: "/profile", icon: <User className="w-5 h-5" /> },
    { name: "المفضلة", path: "/wishlist", icon: <Heart className="w-5 h-5" /> },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all-medium ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-sm" 
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Menu */}
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden"
                    aria-label="فتح القائمة"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col h-full py-6">
                    <div className="px-2">
                      <h2 className="text-2xl font-bold mb-6">بقالة بلس+</h2>
                    </div>
                    <nav className="flex-1">
                      <ul className="space-y-3 px-2">
                        {navLinks.map((link) => (
                          <li key={link.path}>
                            <Link 
                              to={link.path}
                              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all-fast ${
                                location.pathname === link.path
                                  ? "bg-primary/10 text-primary"
                                  : "hover:bg-secondary"
                              }`}
                            >
                              {link.icon}
                              <span>{link.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
              
              <Link 
                to="/" 
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient"
              >
                بقالة بلس+
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all-fast ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* Search and Cart */}
            <div className="flex items-center gap-2">
              <Link to="/search">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full"
                  aria-label="البحث"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full relative"
                  aria-label="عربة التسوق"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">بقالة بلس+</h3>
              <p className="text-muted-foreground">
                أفضل تطبيق للتسوق بقالة عبر الإنترنت. توصيل سريع وجودة ممتازة.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">روابط مهمة</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-all-fast">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-all-fast">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-all-fast">
                    الشروط والأحكام
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-all-fast">
                    سياسة الخصوصية
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
              <p className="text-muted-foreground mb-2">البريد الإلكتروني: info@bagalaplus.com</p>
              <p className="text-muted-foreground mb-2">الهاتف: +966 12 345 6789</p>
              <div className="flex gap-4 mt-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  aria-label="فيسبوك"
                >
                  <i className="fab fa-facebook-f"></i>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  aria-label="تويتر"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  aria-label="انستغرام"
                >
                  <i className="fab fa-instagram"></i>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2023 بقالة بلس+. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
