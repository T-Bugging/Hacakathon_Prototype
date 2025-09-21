import { Clock, User, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrustScore } from "./TrustScore";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NewsCardProps {
  title: string;
  summary: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  category: string;
  trustScore: number;
  readTime: string;
  onClick?: () => void;
}

export function NewsCard({
  title,
  summary,
  imageUrl,
  author,
  publishedAt,
  category,
  trustScore,
  readTime,
  onClick
}: NewsCardProps) {
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior - could navigate to article detail page
      console.log(`Opening article: ${title}`);
    }
  };

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 border-border/50 overflow-hidden cursor-pointer hover:scale-[1.02]" 
      onClick={handleCardClick}
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {/* Trust Score positioned on image */}
        <div className="absolute top-3 right-3">
          <TrustScore score={trustScore} />
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {readTime}
          </div>
        </div>
        <h3 className="line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {summary}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            <span className="font-medium">{author}</span>
          </div>
          <time className="text-muted-foreground">
            {publishedAt}
          </time>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-between group/button pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Read Full Article</span>
          <ExternalLink className="h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
}