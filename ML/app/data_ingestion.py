import pandas as pd

def fetch_user_data(user_id: int):
    """Fetches user data from the database."""
    # Placeholder for database query
    data = {
        'user_id': [user_id],
        'income': [50000],
        'savings': [10000],
        'risk_tolerance': ['medium']
    }
    return pd.DataFrame(data)

def fetch_market_data(ticker: str):
    """Fetches market data for a given ticker."""
    # Placeholder for API call to a financial data provider
    data = {
        'ticker': [ticker],
        'price': [150.0],
        'volume': [1000000]
    }
    return pd.DataFrame(data)
