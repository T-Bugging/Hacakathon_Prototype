import { TrendingUp, Clock, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrustScore } from "./TrustScore";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturedSection() {
  const featuredArticle = {
    title: "Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning",
    summary: "Scientists at leading tech companies have developed a new artificial intelligence model that demonstrates unprecedented capabilities in reasoning and problem-solving, marking a significant milestone in the field of machine learning. This breakthrough could reshape how we approach complex problems in various industries.",
    imageUrl: "https://images.unsplash.com/photo-1632507127573-f4098f6f027f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3MlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODIxODExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Dr. Sarah Chen",
    publishedAt: "2 hours ago",
    category: "Technology",
    trustScore: 92,
    readTime: "5 min read"
  };

  const trendingArticles = [
    {
      title: "Global Markets React to Economic Policy Changes",
      author: "Michael Rodriguez",
      publishedAt: "4 hours ago",
      trustScore: 88
    },
    {
      title: "Medical Research Breakthrough for Rare Diseases",
      author: "Dr. Emily Johnson",
      publishedAt: "8 hours ago",
      trustScore: 94
    },
    {
      title: "Climate Summit Environmental Agreements",
      author: "Alex Thompson",
      publishedAt: "12 hours ago",
      trustScore: 85
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Featured & Trending</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Article */}
        <Card className="lg:col-span-2 group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden">
          <div className="relative">
            <div className="aspect-[16/9] overflow-hidden">
              <ImageWithFallback
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-primary-foreground">Featured</Badge>
            </div>
            <div className="absolute top-4 right-4">
              <TrustScore score={featuredArticle.trustScore} />
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary">{featuredArticle.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                {featuredArticle.readTime}
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors cursor-pointer">
              {featuredArticle.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {featuredArticle.summary}
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <User className="h-4 w-4 mr-1" />
                <span className="font-medium">{featuredArticle.author}</span>
              </div>
              <time className="text-muted-foreground">
                {featuredArticle.publishedAt}
              </time>
            </div>
          </CardContent>
        </Card>

        {/* Trending Articles */}
        <div className="space-y-4">
          <h3 className="font-semibold text-muted-foreground uppercase tracking-wide text-sm">
            Trending Now
          </h3>
          {trendingArticles.map((article, index) => (
            <Card key={index} className="group hover:shadow-md transition-all duration-200 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    #{index + 1}
                  </span>
                  <TrustScore score={article.trustScore} className="scale-75" />
                </div>
                
                <h4 className="font-medium line-clamp-2 mb-3 group-hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </h4>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <time>{article.publishedAt}</time>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}