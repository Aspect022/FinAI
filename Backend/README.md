# FinAI Backend

This is the backend API for the FinAI project, built with FastAPI.

## Project Structure

```
.
├── app/
│   ├── api/
│   │   └── v1/
│   ├── config/
│   ├── database/
│   ├── models/
│   └── schemas/
├── tests/
├── venv/
├── requirements.txt
├── .env
├── .gitignore
├── README.md
├── run.py
└── start.bat
```

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

### Development Mode

1. Using the run script:
   ```bash
   python run.py --reload
   ```

2. Using the batch file (Windows):
   ```bash
   start.bat
   ```

3. Using uvicorn directly:
   ```bash
   uvicorn app.main:app --reload
   ```

The API will be available at `http://127.0.0.1:8000`.

### Production Mode

```bash
python run.py
```

Or:

```bash
uvicorn app.main:app
```

## API Documentation

- Interactive API documentation: `http://127.0.0.1:8000/docs`
- Alternative API documentation: `http://127.0.0.1:8000/redoc`

## Testing

Run tests with pytest:

```bash
pytest
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=sqlite:///./test.db
SECRET_KEY=your-secret-key-here
DEBUG=True
```