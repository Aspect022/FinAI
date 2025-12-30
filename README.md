# FinAI - AI-Powered Personal Finance Management Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://MoneyFyi.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> An intelligent financial management platform that helps users track expenses, analyze investments, and make informed financial decisions using AI and machine learning.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About the Project

**FinAI** (MoneyFyi) is a comprehensive personal finance management platform that leverages artificial intelligence and machine learning to provide users with:

- **Smart Expense Tracking**: Automatically categorize and track your expenses
- **Investment Recommendations**: Get personalized investment suggestions based on your risk profile
- **Financial Health Analysis**: Monitor your financial health with AI-powered insights
- **Market Sentiment Analysis**: Stay informed with real-time financial news sentiment analysis
- **Multi-language Support**: Available in English and Hindi

The platform consists of three main components:
1. **Frontend**: Next.js-based responsive web application
2. **Backend API**: FastAPI server handling user data and business logic
3. **ML Service**: Machine learning models for predictions and recommendations

## ✨ Features

### For Users
- 💰 **Expense & Income Tracking**: Log and categorize all your financial transactions
- 📊 **Financial Dashboard**: Visualize your financial status with interactive charts
- 🎯 **Goal Planning**: Set and track financial goals
- 📈 **Investment Portfolio**: Monitor your investments in one place
- 🤖 **AI Recommendations**: Receive personalized investment recommendations
- 📚 **Financial Education**: Access educational content on financial literacy
- 🌐 **Bilingual Support**: Use the app in English or Hindi
- 📱 **Responsive Design**: Access from any device

### For Developers
- 🔌 **RESTful API**: Well-documented API endpoints
- 🧪 **Testing Suite**: Comprehensive test coverage
- 🐳 **Docker Support**: Easy containerization and deployment
- 📖 **API Documentation**: Interactive Swagger/OpenAPI documentation
- 🔐 **Security First**: Best practices for data protection

## 🏗️ Architecture

FinAI follows a microservices architecture with three main components:

```
┌─────────────────┐
│   Frontend      │  Next.js 15 + React 19 + TypeScript
│   (Port: 3000)  │  Radix UI + Tailwind CSS
└────────┬────────┘
         │
         ├──────────────┐
         │              │
┌────────▼────────┐ ┌──▼──────────────┐
│   Backend API   │ │   ML Service    │
│   (Port: 8000)  │ │   (Port: 8001)  │
│   FastAPI       │ │   FastAPI       │
│   SQLAlchemy    │ │   Transformers  │
└────────┬────────┘ └──┬──────────────┘
         │              │
    ┌────▼──────────────▼────┐
    │   SQLite Database      │
    └────────────────────────┘
```

### Component Responsibilities

#### Frontend (`/Frontend`)
- User interface and experience
- Client-side routing with Next.js App Router
- State management and API integration
- Responsive design with Tailwind CSS
- Form validation with Zod

#### Backend API (`/Backend`)
- User authentication and authorization
- CRUD operations for users and transactions
- Business logic and data validation
- Database management with SQLAlchemy
- RESTful API endpoints

#### ML Service (`/ML`)
- Financial sentiment analysis using FinBERT
- Investment recommendation engine
- Market trend prediction
- Risk assessment algorithms
- Feature engineering and preprocessing

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.8
- **Language**: TypeScript 5
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.1.9
- **Component Library**: Radix UI
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **HTTP Client**: SWR
- **Internationalization**: react-i18next

### Backend
- **Framework**: FastAPI 0.68.0
- **Language**: Python 3.8+
- **ORM**: SQLAlchemy 1.4.x
- **Database**: SQLite (development), PostgreSQL (production ready)
- **Migration**: Alembic 1.7.x
- **Server**: Uvicorn 0.15.x
- **Testing**: Pytest 6.2.x

### ML Service
- **Framework**: FastAPI 0.104.1
- **Language**: Python 3.8+
- **ML Libraries**: 
  - scikit-learn 1.3.2
  - PyTorch 2.1.0
  - Transformers 4.34.1 (HuggingFace)
- **Data Processing**: Pandas 2.1.1, NumPy 1.26.1
- **Model**: FinBERT (ProsusAI/finbert) for sentiment analysis

### DevOps & Tools
- **Version Control**: Git & GitHub
- **Deployment**: Vercel (Frontend), Docker (Backend & ML)
- **Package Managers**: npm/pnpm (Frontend), pip (Backend)

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **Python** 3.8 or higher
- **pip** (Python package manager)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aspect022/FinAI.git
   cd FinAI
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Set up the ML Service**
   ```bash
   cd ../ML
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

4. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   # or
   pnpm install
   ```

### Configuration

1. **Backend Configuration**
   
   Create a `.env` file in the `Backend` directory:
   ```env
   DATABASE_URL=sqlite:///./test.db
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ```

2. **ML Service Configuration**
   
   The ML service will automatically download the required models on first run.

### Running the Application

#### Option 1: Run All Services Separately

1. **Start the Backend API** (Terminal 1)
   ```bash
   cd Backend
   python run.py --reload
   # or
   uvicorn app.main:app --reload
   ```
   Backend will be available at: `http://localhost:8000`

2. **Start the ML Service** (Terminal 2)
   ```bash
   cd ML
   uvicorn app.main:app --reload --port 8001
   ```
   ML Service will be available at: `http://localhost:8001`

3. **Start the Frontend** (Terminal 3)
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will be available at: `http://localhost:3000`

#### Option 2: Quick Start (Windows)
   ```bash
   cd Backend
   start.bat
   ```

### Verify Installation

1. Backend API: Visit `http://localhost:8000/docs` for interactive API documentation
2. ML Service: Visit `http://localhost:8001/` to verify it's running
3. Frontend: Visit `http://localhost:3000` to access the application

## 📁 Project Structure

```
FinAI/
├── Backend/                 # FastAPI backend service
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   └── v1/         # API version 1
│   │   │       └── users.py
│   │   ├── config/         # Configuration files
│   │   │   └── settings.py
│   │   ├── database/       # Database models and connection
│   │   │   ├── database.py
│   │   │   └── crud.py
│   │   ├── models/         # SQLAlchemy models
│   │   │   └── user.py
│   │   ├── schemas/        # Pydantic schemas
│   │   │   └── user.py
│   │   └── main.py         # Application entry point
│   ├── tests/              # Backend tests
│   ├── requirements.txt    # Python dependencies
│   ├── pyproject.toml      # Python project configuration
│   ├── run.py             # Run script
│   └── README.md          # Backend documentation
│
├── Frontend/               # Next.js frontend application
│   ├── app/               # Next.js app directory
│   │   ├── dashboard/     # Dashboard page
│   │   ├── onboarding/    # Onboarding flow
│   │   ├── portfolio/     # Portfolio management
│   │   ├── profile/       # User profile
│   │   ├── recommendation/ # Investment recommendations
│   │   ├── history/       # Transaction history
│   │   └── layout.tsx     # Root layout
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── public/           # Static assets
│   ├── styles/           # Global styles
│   ├── package.json      # Node.js dependencies
│   └── README.md         # Frontend documentation
│
├── ML/                    # Machine Learning service
│   ├── app/
│   │   ├── agents/       # ML agents
│   │   │   ├── fin_agent.py      # Financial sentiment analysis
│   │   │   └── trend_agent.py    # Market trend prediction
│   │   ├── api.py        # ML API endpoints
│   │   ├── model.py      # ML models
│   │   ├── preprocessing.py  # Data preprocessing
│   │   ├── data_ingestion.py # Data fetching
│   │   ├── config.py     # ML configuration
│   │   └── main.py       # ML service entry point
│   ├── notebooks/        # Jupyter notebooks for experimentation
│   ├── tests/           # ML tests
│   ├── requirements.txt # Python ML dependencies
│   └── README.md        # ML documentation
│
├── Docs/                 # Project documentation
│   ├── MoneyFyi(1)[1].pdf
│   └── Mumbai_hackathon_PPt_final[1].pdf
│
├── README.md            # This file
├── CONTRIBUTING.md      # Contribution guidelines
├── LICENSE              # Project license
├── CODE_OF_CONDUCT.md   # Code of conduct
└── SECURITY.md          # Security policy
```

## 💻 Usage

### For End Users

1. **Onboarding**
   - Visit the application and complete the onboarding process
   - Set up your financial profile and risk tolerance

2. **Dashboard**
   - View your financial overview
   - Track income and expenses
   - Monitor your financial health score

3. **Transactions**
   - Add income and expense transactions
   - Categorize transactions automatically
   - View transaction history

4. **Investments**
   - View your investment portfolio
   - Get AI-powered investment recommendations
   - Track portfolio performance

5. **Profile**
   - Update your financial information
   - Adjust risk preferences
   - Manage account settings

### For Developers

#### API Examples

**Create a User**
```bash
curl -X POST "http://localhost:8000/api/v1/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com"
  }'
```

**Get Investment Recommendations**
```bash
curl -X POST "http://localhost:8001/recommendations/" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 1
  }'
```

## 📚 API Documentation

### Backend API Endpoints

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

#### Key Endpoints:

- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /api/v1/users/` - Create a new user
- `GET /api/v1/users/{user_id}` - Get user by ID

### ML Service Endpoints

- `GET /` - Service status
- `POST /recommendations/` - Get investment recommendations

For detailed API documentation, refer to:
- [Backend API Documentation](./Backend/README.md)
- [ML Service Documentation](./ML/README.md)

## 🧪 Testing

### Backend Tests
```bash
cd Backend
pytest
```

### ML Tests
```bash
cd ML
pytest
```

### Frontend Tests
```bash
cd Frontend
npm test
# or
npm run lint
```

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](./CONTRIBUTING.md) to get started.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure:
- Your code follows the project's coding standards
- You've added tests for new features
- All tests pass before submitting
- You've updated documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔒 Security

For security concerns, please review our [Security Policy](./SECURITY.md) and report vulnerabilities responsibly.

## 📞 Contact

**Project Maintainer**: Aspect022

- GitHub: [@Aspect022](https://github.com/Aspect022)
- Project Link: [https://github.com/Aspect022/FinAI](https://github.com/Aspect022/FinAI)
- Live Demo: [https://MoneyFyi.vercel.app](https://MoneyFyi.vercel.app)

## 🙏 Acknowledgments

- [FinBERT](https://huggingface.co/ProsusAI/finbert) - Financial sentiment analysis model
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework for building APIs
- [Next.js](https://nextjs.org/) - React framework for production
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 🗺️ Roadmap

- [ ] Add OAuth authentication (Google, GitHub)
- [ ] Implement real-time notifications
- [ ] Add cryptocurrency tracking
- [ ] Develop mobile applications (iOS & Android)
- [ ] Integrate with banking APIs
- [ ] Advanced portfolio rebalancing algorithms
- [ ] Social features (share goals, compare with peers)
- [ ] Export financial reports (PDF, Excel)

---

<div align="center">
  <p>Made with ❤️ by the FinAI Team</p>
  <p>⭐ Star us on GitHub — it helps!</p>
</div>
