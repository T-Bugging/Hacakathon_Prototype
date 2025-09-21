import { NewsCard } from "./NewsCard";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  category: string;
  trustScore: number;
  readTime: string;
}

interface NewsGridProps {
  selectedCategory: string;
}

const mockNewsData: NewsArticle[] = [
  {
    id: "1",
    title: "Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning",
    summary: "Scientists at leading tech companies have developed a new artificial intelligence model that demonstrates unprecedented capabilities in reasoning and problem-solving, marking a significant milestone in the field of machine learning.",
    imageUrl: "https://images.unsplash.com/photo-1632507127573-f4098f6f027f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3MlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1ODIxODExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Dr. Sarah Chen",
    publishedAt: "2 hours ago",
    category: "Technology",
    trustScore: 92,
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Global Markets React to Unprecedented Economic Policy Changes",
    summary: "Financial markets worldwide are experiencing significant volatility following the announcement of major economic policy shifts by central banks, with investors closely monitoring the implications for global trade.",
    imageUrl: "https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGZpbmFuY2UlMjBuZXdzfGVufDF8fHx8MTc1ODIyMzU3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Michael Rodriguez",
    publishedAt: "4 hours ago",
    category: "Business",
    trustScore: 88,
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "Controversial Legislation Sparks Nationwide Debate on Digital Privacy Rights",
    summary: "New proposed legislation addressing digital privacy and data protection has ignited intense discussions among lawmakers, privacy advocates, and technology companies about the balance between security and personal freedoms.",
    imageUrl: "https://images.unsplash.com/photo-1638770749564-97535bf0d552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xpdGljcyUyMGdvdmVybm1lbnQlMjBuZXdzfGVufDF8fHx8MTc1ODIyODg0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Jennifer Walsh",
    publishedAt: "6 hours ago",
    category: "Politics",
    trustScore: 76,
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Groundbreaking Medical Research Offers Hope for Rare Disease Treatment",
    summary: "Researchers have made significant progress in developing a new treatment approach for a rare genetic disorder, offering renewed hope to patients and families affected by this challenging condition.",
    imageUrl: "https://images.unsplash.com/photo-1611689866681-d9cbd35d7b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjBzY2llbmNlJTIwbWVkaWNhbHxlbnwxfHx8fDE3NTgxODU2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Dr. Emily Johnson",
    publishedAt: "8 hours ago",
    category: "Health",
    trustScore: 94,
    readTime: "4 min read"
  },
  {
    id: "5",
    title: "Climate Summit Yields Ambitious New International Environmental Agreements",
    summary: "World leaders have reached consensus on several key environmental initiatives aimed at combating climate change, with commitments to renewable energy investments and carbon emission reductions.",
    imageUrl: "https://images.unsplash.com/photo-1565011471985-8a450248b005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudCUyMGNsaW1hdGUlMjBjaGFuZ2V8ZW58MXx8fHwxNzU4MjU1Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Alex Thompson",
    publishedAt: "12 hours ago",
    category: "Environment",
    trustScore: 85,
    readTime: "8 min read"
  },
  {
    id: "6",
    title: "Championship Finals Set as Underdog Team Defeats Seasoned Veterans",
    summary: "In a stunning upset, the underdog team has secured their place in the championship finals after defeating the heavily favored veterans in a thrilling match that kept fans on the edge of their seats.",
    imageUrl: "https://images.unsplash.com/photo-1585909695789-d998198243b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBuZXdzJTIwYXRobGV0aWNzfGVufDF8fHx8MTc1ODI3MjE5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Sports Desk",
    publishedAt: "1 day ago",
    category: "Sports",
    trustScore: 71,
    readTime: "3 min read"
  },
  // Additional articles for other categories
  {
    id: "7",
    title: "New Quantum Computing Processor Achieves Record-Breaking Performance",
    summary: "Tech giant unveils revolutionary quantum processor that solves complex problems 1000x faster than traditional computers, potentially transforming fields from cryptography to drug discovery.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHByb2Nlc3NvcnxlbnwxfHx8fDE3NTgyNzIxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Tech Reporter",
    publishedAt: "3 hours ago",
    category: "Technology",
    trustScore: 89,
    readTime: "6 min read"
  },
  {
    id: "8",
    title: "Major Healthcare Reform Bill Passes Congress With Bipartisan Support",
    summary: "Landmark legislation aimed at reducing prescription drug costs and expanding access to mental health services receives overwhelming support from both parties in historic vote.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcG9saXRpY3N8ZW58MXx8fHwxNzU4MjcyMTkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    author: "Political Correspondent",
    publishedAt: "5 hours ago",
    category: "Politics",
    trustScore: 84,
    readTime: "8 min read"
  }
];

export function NewsGrid({ selectedCategory }: NewsGridProps) {
  const handleArticleClick = (article: NewsArticle) => {
    // Here you could navigate to a full article page
    // For now, we'll show an alert with article details
    alert(`Opening article: "${article.title}" by ${article.author}`);
    
    // In a real app, you might do something like:
    // router.push(`/article/${article.id}`);
    // or
    // window.open(article.url, '_blank');
  };

  // Filter articles based on selected category
  const filteredArticles = selectedCategory === "Home" 
    ? mockNewsData 
    : mockNewsData.filter(article => article.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <NewsCard
          key={article.id}
          title={article.title}
          summary={article.summary}
          imageUrl={article.imageUrl}
          author={article.author}
          publishedAt={article.publishedAt}
          category={article.category}
          trustScore={article.trustScore}
          readTime={article.readTime}
          onClick={() => handleArticleClick(article)}
        />
      ))}
      {filteredArticles.length === 0 && (
        <div className="col-span-full text-center py-8">
          <p className="text-muted-foreground">No articles found for {selectedCategory} category.</p>
        </div>
      )}
    </div>
  );
}