import os
import requests
from bs4 import BeautifulSoup
import feedparser
from urllib.parse import quote_plus
from datetime import datetime, timedelta
import google.generativeai as genai

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("Please set GEMINI_API_KEY as an environment variable or Streamlit secret.")
genai.configure(api_key=GEMINI_API_KEY)

MAX_DAYS_LOOKBACK = 30  # Search window for related news

def verify_headline_or_url(input_text):
    """
    Accepts a headline or URL, returns (result_dict, sources_list).
    """
    # Check if input is a URL
    if input_text.startswith("http://") or input_text.startswith("https://"):
        headline = extract_headline_from_url(input_text)
        if not headline:
            return {"prediction": "UNKNOWN", "confidence": 0, "reason": "Could not extract headline from URL"}, []
        result = fact_check_news(headline)
        sources = get_recent_news(headline)
    else:
        result = fact_check_news(input_text)
        sources = get_recent_news(input_text)

    # Ensure the result is a dictionary
    if isinstance(result, str):
        try:
            import json
            result = json.loads(result)
        except Exception:
            result = {"prediction": "UNKNOWN", "confidence": 0, "reason": result}

    sources_list = [f"{news['title']} ({news['link']})" for news in sources]
    return result, sources_list


def get_recent_news(query, days=MAX_DAYS_LOOKBACK):
    """Fetch recent news from Google News RSS."""
    base_url = "https://news.google.com/rss/search?q="
    url = f"{base_url}{quote_plus(query)}&hl=en-IN&gl=IN&ceid=IN:en"

    feed = feedparser.parse(url)
    recent_news = []
    cutoff = datetime.now() - timedelta(days=days)

    for entry in feed.entries:
        if hasattr(entry, 'published_parsed'):
            pub_date = datetime(*entry.published_parsed[:6])
            if pub_date >= cutoff:
                recent_news.append({
                    "title": entry.title,
                    "link": entry.link,
                    "published": pub_date
                })
    return recent_news


def fact_check_news(headline, description=""):
    """Fact-check a news claim using headline + description + Gemini."""
    full_claim = f"{headline}. {description}" if description else headline

    # Step 1: Get recent related news
    evidence_news = get_recent_news(full_claim)
    evidence_titles = [news['title'] for news in evidence_news]

    if not evidence_titles:
        return {
            "prediction": "UNKNOWN",
            "confidence": 0,
            "reason": "No related recent news found"
        }

    # Step 2: Exact match check
    for title in evidence_titles:
        if headline.lower() in title.lower():
            return {
                "prediction": "REAL",
                "confidence": 100,
                "reason": f"Exact match found in news: '{title}'"
            }

    # Step 3: Prepare evidence and call Gemini
    evidence_text = "\n".join(f"- {title}" for title in evidence_titles)
    model_input = f"""
    Headline: {headline}
    Description: {description}

    Evidence from reputable sources:
    {evidence_text}

    Based on this evidence, decide if the news is REAL or FAKE.
    Respond in JSON format:
    {{
        "prediction": "REAL or FAKE",
        "confidence": "0-100",
        "reason": "Short explanation"
    }}
    """

    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(model_input)

    # Convert Gemini response to dict if possible
    try:
        import json
        parsed = json.loads(response.text)
        return parsed
    except Exception:
        return {"prediction": "UNKNOWN", "confidence": 0, "reason": response.text}


def extract_headline_from_url(url):
    """Extract headline/title from a given webpage URL."""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching URL: {e}")
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    if soup.find("meta", property="og:title"):
        return soup.find("meta", property="og:title")["content"].strip()
    elif soup.find("title"):
        return soup.find("title").get_text().strip()
    elif soup.find("h1"):
        return soup.find("h1").get_text().strip()

    return None
