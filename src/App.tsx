import { useState } from "react";
import { Header } from "./components/Header";
import { FeaturedSection } from "./components/FeaturedSection";
import { NewsGrid } from "./components/NewsGrid";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Home");

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Section */}
        {selectedCategory === "Home" && <FeaturedSection />}
        
        {/* All News Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-6">
            {selectedCategory === "Home" ? "Latest News" : `${selectedCategory} News`}
          </h2>
          <NewsGrid selectedCategory={selectedCategory} />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <h3 className="font-semibold">TrustNews</h3>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Transparent journalism with trust scores
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2025 TrustNews. All rights reserved. Trust scores are based on source reliability, fact-checking, and editorial standards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}