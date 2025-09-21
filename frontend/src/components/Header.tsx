import { Search, User, Menu, Wrench, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TextSubmissionModal } from "./TextSubmissionModal";

interface HeaderProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export function Header({ selectedCategory = "Home", onCategoryChange }: HeaderProps) {
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleCategoryClick = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const navItems = [
    { name: "Home", active: selectedCategory === "Home" },
    { name: "Technology", active: selectedCategory === "Technology" },
    { name: "Business", active: selectedCategory === "Business" },
    { name: "Politics", active: selectedCategory === "Politics" },
    { name: "Health", active: selectedCategory === "Health" },
    { name: "Sports", active: selectedCategory === "Sports" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-xl font-semibold">TrustNews</h1>
          </div>

          {/* Navigation - Centered with more space */}
          <nav className="hidden md:flex items-center justify-center flex-1 max-w-md mx-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleCategoryClick(item.name)}
                  className={`transition-colors whitespace-nowrap hover:text-primary ${
                    item.active
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Search, Theme Toggle and User - Right side with proper spacing */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="hidden sm:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news..."
                  className="pl-10 w-56 lg:w-64"
                />
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsToolModalOpen(true)}
              className="relative"
            >
              <Wrench className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="relative"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Text Submission Modal */}
      <TextSubmissionModal 
        isOpen={isToolModalOpen} 
        onClose={() => setIsToolModalOpen(false)} 
      />
    </header>
  );
}