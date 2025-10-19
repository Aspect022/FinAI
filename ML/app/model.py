from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import pandas as pd
import joblib

class RecommendationModel:
    def __init__(self, model_type='random_forest'):
        self.model_type = model_type
        self.model = self._create_model()

    def _create_model(self):
        if self.model_type == 'random_forest':
            return RandomForestClassifier(n_estimators=150, random_state=42, max_depth=10)
        # In a real scenario, you could have other model types
        # elif self.model_type == 'gradient_boosting':
        #     return GradientBoostingClassifier()
        else:
            raise ValueError(f"Unsupported model type: {self.model_type}")

    def train(self, X, y):
        """Trains the recommendation model."""
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        print("Training the model...")
        self.model.fit(X_train, y_train)
        
        # Evaluate the model
        predictions = self.model.predict(X_test)
        print("Model evaluation:")
        print(classification_report(y_test, predictions))

    def predict(self, user_data):
        """Gets an investment recommendation for a user."""
        if not hasattr(self.model, 'classes_'):
            raise RuntimeError("Model has not been trained yet.")
        
        # Dummy prediction logic
        return self.model.predict(user_data)

    def save_model(self, file_path):
        """Saves the trained model to a file."""
        print(f"Saving model to {file_path}")
        joblib.dump(self.model, file_path)

    def load_model(self, file_path):
        """Loads a model from a file."""
        print(f"Loading model from {file_path}")
        self.model = joblib.load(file_path)
