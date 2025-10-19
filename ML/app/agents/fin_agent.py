from transformers import pipeline

class FinAgent:
    def __init__(self, model_name="ProsusAI/finbert"):
        """Initializes the FinAgent with a pre-trained FinBERT model."""
        self.sentiment_analyzer = pipeline("sentiment-analysis", model=model_name)

    def analyze_sentiment(self, text):
        """Analyzes the sentiment of a given text."""
        if not text or not isinstance(text, str):
            return {"label": "NEUTRAL", "score": 0.0}

        try:
            results = self.sentiment_analyzer(text)
            return results[0]
        except Exception as e:
            print(f"Error during sentiment analysis: {e}")
            return {"label": "ERROR", "score": 0.0}

# Example Usage
if __name__ == "__main__":
    fin_agent = FinAgent()
    news_headline = "The stock market is expected to see a significant downturn next week."
    sentiment = fin_agent.analyze_sentiment(news_headline)
    print(f"Headline: {news_headline}")
    print(f"Sentiment: {sentiment}")
