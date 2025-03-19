
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  image: string;
}

// Mock search results (to be replaced with actual API calls)
const mockResults: SearchResult[] = [
  { id: "1", name: "تفاح أخضر", category: "فواكه", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
  { id: "2", name: "موز", category: "فواكه", image: "https://images.unsplash.com/photo-1543218024-57a70143c369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
  { id: "3", name: "طماطم", category: "خضروات", image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
  { id: "4", name: "خيار", category: "خضروات", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
  { id: "5", name: "حليب طازج", category: "ألبان", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80" },
];

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar = ({ 
  className = "", 
  placeholder = "ابحث عن منتجات...",
  onSearch 
}: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search function
  const handleSearch = (value: string) => {
    setSearchValue(value);
    
    if (value.trim().length > 0) {
      // Filter mock results (to be replaced with API call)
      const filtered = mockResults.filter(item => 
        item.name.includes(value) || 
        item.category.includes(value)
      );
      
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
    
    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchValue.trim().length > 0 && setIsOpen(true)}
          className="pr-10 pl-10 h-11 rounded-xl w-full transition-all-medium focus:bg-white focus:shadow-md"
        />
        {searchValue.length > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-border overflow-hidden animate-scale-in"
        >
          <div className="max-h-[300px] overflow-auto p-1">
            {results.map((result) => (
              <div 
                key={result.id}
                className="flex items-center gap-3 p-2 hover:bg-accent rounded-md cursor-pointer transition-all-fast"
                onClick={() => {
                  setSearchValue(result.name);
                  setIsOpen(false);
                }}
              >
                <img 
                  src={result.image}
                  alt={result.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <p className="font-medium">{result.name}</p>
                  <p className="text-xs text-muted-foreground">{result.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && searchValue.length > 0 && results.length === 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white rounded-lg shadow-lg border border-border p-4 text-center animate-scale-in">
          <p className="text-muted-foreground">لا توجد نتائج للبحث</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
