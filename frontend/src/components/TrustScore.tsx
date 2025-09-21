import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge } from "./ui/badge";

interface TrustScoreProps {
  score: number;
  className?: string;
}

export function TrustScore({ score, className }: TrustScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 50) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <ShieldCheck className="h-3 w-3" />;
    if (score >= 50) return <Shield className="h-3 w-3" />;
    return <ShieldAlert className="h-3 w-3" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "High Trust";
    if (score >= 50) return "Medium Trust";
    return "Low Trust";
  };

  return (
    <div className={`flex flex-col items-center space-y-1 ${className}`}>
      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getScoreColor(score)}`}>
        {getScoreIcon(score)}
        <span>{score}</span>
      </div>
      <span className="text-xs text-muted-foreground font-medium">
        {getScoreLabel(score)}
      </span>
    </div>
  );
}