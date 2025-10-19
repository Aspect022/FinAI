import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_user_data(df: pd.DataFrame):
    """Preprocesses user data."""
    # One-hot encode categorical variables
    df = pd.get_dummies(df, columns=['risk_tolerance'], drop_first=True)

    # Scale numerical features
    scaler = StandardScaler()
    numerical_cols = ['income', 'savings']
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

    return df

def preprocess_market_data(df: pd.DataFrame):
    """Preprocesses market data."""
    # Calculate moving average
    df['moving_average'] = df['price'].rolling(window=7).mean()
    return df
