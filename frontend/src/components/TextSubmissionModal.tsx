import { useState } from "react";
import { Send, Loader2, CheckCircle, XCircle, Link, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TextSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Hidden API endpoint configuration (for production, move to environment variables)
const API_CONFIG = {
  HEADLINE_ENDPOINT: "https://api.trustnews.com/verify/headline",
  URL_ENDPOINT: "https://api.trustnews.com/verify/url"
};

export function TextSubmissionModal({ isOpen, onClose }: TextSubmissionModalProps) {
  const [activeTab, setActiveTab] = useState("headline");
  
  // Headline verification fields
  const [headline, setHeadline] = useState("");
  const [optionalText, setOptionalText] = useState("");
  
  // URL verification fields
  const [url, setUrl] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleHeadlineSubmit = async () => {
    if (!headline.trim()) {
      setErrorMessage("Please enter a headline to verify");
      setSubmissionStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      // Mock API call for headline verification
      const response = await fetch(API_CONFIG.HEADLINE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          headline: headline,
          additionalText: optionalText,
          timestamp: new Date().toISOString(),
          source: 'TrustNews Verification Tool'
        }),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setHeadline("");
        setOptionalText("");
        setTimeout(() => {
          onClose();
          setSubmissionStatus("idle");
        }, 2000);
      } else {
        throw new Error(`Verification failed! status: ${response.status}`);
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to verify headline");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!url.trim()) {
      setErrorMessage("Please enter a URL to verify");
      setSubmissionStatus("error");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setErrorMessage("Please enter a valid URL");
      setSubmissionStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      // Mock API call for URL verification
      const response = await fetch(API_CONFIG.URL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          timestamp: new Date().toISOString(),
          source: 'TrustNews Verification Tool'
        }),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setUrl("");
        setTimeout(() => {
          onClose();
          setSubmissionStatus("idle");
        }, 2000);
      } else {
        throw new Error(`Verification failed! status: ${response.status}`);
      }
    } catch (error) {
      setSubmissionStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to verify URL");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    if (activeTab === "headline") {
      handleHeadlineSubmit();
    } else {
      handleUrlSubmit();
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setHeadline("");
      setOptionalText("");
      setUrl("");
      setSubmissionStatus("idle");
      setErrorMessage("");
      setActiveTab("headline");
      onClose();
    }
  };

  const isFormValid = activeTab === "headline" ? headline.trim() : url.trim();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5 text-primary" />
            <span>Verify News</span>
          </DialogTitle>
          <DialogDescription>
            Verify the credibility of news content by headline or URL from any website.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="headline" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>By Headline</span>
            </TabsTrigger>
            <TabsTrigger value="url" className="flex items-center space-x-2">
              <Link className="h-4 w-4" />
              <span>By URL</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="headline" className="space-y-4 mt-4">
            {/* Headline Input */}
            <div className="space-y-2">
              <Label htmlFor="headline-input">News Headline *</Label>
              <Input
                id="headline-input"
                placeholder="Enter the news headline to verify..."
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Optional Text */}
            <div className="space-y-2">
              <Label htmlFor="optional-text">Additional Context (Optional)</Label>
              <Textarea
                id="optional-text"
                placeholder="Add any additional text or context that might help with verification..."
                value={optionalText}
                onChange={(e) => setOptionalText(e.target.value)}
                rows={4}
                disabled={isSubmitting}
                className="resize-none"
              />
              <p className="text-sm text-muted-foreground">
                {optionalText.length} characters
              </p>
            </div>
          </TabsContent>

          <TabsContent value="url" className="space-y-4 mt-4">
            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="url-input">Article URL *</Label>
              <Input
                id="url-input"
                placeholder="https://example.com/news-article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isSubmitting}
                type="url"
              />
              <p className="text-sm text-muted-foreground">
                Enter the full URL of any news article from any website
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Status Messages */}
        {submissionStatus === "success" && (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medium">
              {activeTab === "headline" ? "Headline" : "URL"} submitted for verification successfully!
            </span>
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
            <XCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Verify {activeTab === "headline" ? "Headline" : "URL"}
              </>
            )}
          </Button>
        </div>

        {/* Information note */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-md">
          <strong>How it works:</strong> Our verification system analyzes the credibility of news content 
          using multiple sources and fact-checking databases. Results include trust scores and source reliability indicators.
        </div>
      </DialogContent>
    </Dialog>
  );
}