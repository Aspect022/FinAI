import numpy as np

class TrendAgent:
    def __init__(self, model_path="path/to/dummy/lstm.h5"):
        """Initializes the TrendAgent with a pre-trained LSTM model."""
        self.model_path = model_path
        # In a real scenario, you would load a trained model here, e.g.:
        # from tensorflow.keras.models import load_model
        # self.model = load_model(model_path)

    def predict_trend(self, historical_data):
        """Predicts the trend of a given historical data series."""
        if not isinstance(historical_data, list) or len(historical_data) < 10:
            return {"trend": "UNKNOWN", "confidence": 0.0}

        # Dummy prediction logic
        # A real model would perform preprocessing and prediction
        # For example, scaling the data and feeding it to the LSTM
        print(f"Predicting trend for data series of length {len(historical_data)}")

        # Dummy logic: if the last value is greater than the first, trend is up.
        if historical_data[-1] > historical_data[0]:
            trend = "UP"
            confidence = np.random.uniform(0.6, 0.9)
        else:
            trend = "DOWN"
            confidence = np.random.uniform(0.5, 0.8)

        return {"trend": trend, "confidence": round(confidence, 2)}

# Example Usage
if __name__ == "__main__":
    trend_agent = TrendAgent()
    # Dummy historical stock prices
    stock_prices_up = [100, 102, 105, 103, 108, 110, 112, 115, 118, 120]
    stock_prices_down = [150, 148, 145, 146, 142, 140, 138, 135, 133, 130]

    trend_up = trend_agent.predict_trend(stock_prices_up)
    print(f"Prediction for rising prices: {trend_up}")

    trend_down = trend_agent.predict_trend(stock_prices_down)
    print(f"Prediction for falling prices: {trend_down}")
