# Contributing to FinAI

First off, thank you for considering contributing to FinAI! It's people like you that make FinAI such a great tool for personal finance management.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

Before you begin contributing, make sure you have:

- **Git** installed on your local machine
- **Node.js** 18.x or higher
- **Python** 3.8 or higher
- **pip** and **npm/pnpm** package managers
- A **GitHub account**
- Familiarity with FastAPI, Next.js, and React

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/FinAI.git
   cd FinAI
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/Aspect022/FinAI.git
   ```

4. **Set up the development environment**:
   
   Follow the installation instructions in the [README.md](README.md#getting-started) to set up:
   - Backend service
   - ML service
   - Frontend application

5. **Create a new branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear and descriptive title**
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node/Python versions)
- **Error messages** or logs

Use the bug report template when available.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the proposed feature
- **Explain why this enhancement would be useful**
- **List any alternatives** you've considered
- **Include mockups or examples** if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:

- `good first issue` - Simple issues for newcomers
- `help wanted` - Issues where we need community help
- `documentation` - Documentation improvements

### Areas for Contribution

We welcome contributions in these areas:

1. **Frontend Development**
   - UI/UX improvements
   - New features and pages
   - Performance optimizations
   - Accessibility enhancements

2. **Backend Development**
   - API endpoints
   - Database models and migrations
   - Authentication and authorization
   - Performance and security improvements

3. **Machine Learning**
   - Model improvements
   - New prediction features
   - Data preprocessing enhancements
   - Algorithm optimizations

4. **Documentation**
   - Code documentation
   - User guides
   - API documentation
   - Tutorial content

5. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - Performance tests

6. **DevOps**
   - CI/CD improvements
   - Docker configurations
   - Deployment scripts
   - Monitoring and logging

## Development Workflow

### Branch Naming Convention

Use descriptive branch names following this pattern:

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Urgent fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions or updates

Examples:
- `feature/add-expense-categories`
- `bugfix/fix-login-validation`
- `docs/update-api-documentation`

### Keeping Your Fork Updated

Regularly sync your fork with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Coding Standards

### Python (Backend & ML)

Follow [PEP 8](https://pep8.org/) style guide:

- Use 4 spaces for indentation
- Maximum line length: 88 characters (Black formatter)
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Type hints are encouraged

**Example:**
```python
from typing import Optional

def get_user_by_id(user_id: int, db: Session) -> Optional[User]:
    """
    Retrieve a user by their ID.
    
    Args:
        user_id: The unique identifier of the user
        db: Database session
        
    Returns:
        User object if found, None otherwise
    """
    return db.query(User).filter(User.id == user_id).first()
```

**Tools:**
- Use `black` for code formatting
- Use `flake8` or `pylint` for linting
- Use `mypy` for type checking

```bash
# Format code
black app/

# Lint code
flake8 app/

# Type check
mypy app/
```

### TypeScript/JavaScript (Frontend)

Follow the project's ESLint configuration:

- Use 2 spaces for indentation
- Use semicolons
- Prefer `const` over `let`, avoid `var`
- Use TypeScript types and interfaces
- Use arrow functions for callbacks

**Example:**
```typescript
interface User {
  id: number;
  username: string;
  email: string;
}

const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};
```

**Tools:**
- Use ESLint for linting
- Use Prettier for formatting (if configured)

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### General Principles

- **DRY** (Don't Repeat Yourself): Avoid code duplication
- **KISS** (Keep It Simple, Stupid): Prefer simple solutions
- **SOLID** principles: Write maintainable and scalable code
- **Comments**: Use comments to explain "why", not "what"
- **Error Handling**: Always handle errors gracefully
- **Security**: Never commit sensitive data (API keys, passwords)

## Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(backend): add user authentication endpoint

Implement JWT-based authentication with login and registration endpoints.
Includes password hashing and token generation.

Closes #123
```

```
fix(frontend): correct expense calculation in dashboard

The total expense was not including all categories due to a filter bug.

Fixes #456
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("add feature" not "added feature")
- Keep commits focused on a single change
- Reference issues and PRs when applicable

## Pull Request Process

### Before Submitting

1. **Test your changes thoroughly**
   - Run all existing tests
   - Add new tests for your changes
   - Test manually in the browser/API client

2. **Update documentation**
   - Update README if needed
   - Add/update code comments
   - Update API documentation

3. **Ensure code quality**
   - Follow coding standards
   - Run linters and formatters
   - Fix any warnings or errors

4. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### Submitting a Pull Request

1. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub with:
   - **Clear title** following commit message format
   - **Detailed description** of changes
   - **Screenshots** for UI changes
   - **Reference to related issues** (e.g., "Closes #123")
   - **Testing performed** and results

3. **PR Template** (when available):
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] All tests pass
   - [ ] Added new tests
   - [ ] Manual testing completed
   
   ## Screenshots (if applicable)
   [Add screenshots here]
   
   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added for complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   ```

### Review Process

1. **Automated checks** will run (linting, tests, build)
2. **Maintainers will review** your code
3. **Address feedback** by pushing new commits
4. Once approved, a **maintainer will merge** your PR

### After Your PR is Merged

1. **Delete your branch**:
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Update your local main**:
   ```bash
   git checkout main
   git pull upstream main
   ```

## Testing Guidelines

### Backend Tests

```bash
cd Backend
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_main.py

# Run specific test
pytest tests/test_main.py::test_read_root
```

**Writing Tests:**
```python
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()
```

### ML Tests

```bash
cd ML
pytest

# Test specific module
pytest tests/test_model.py
```

### Frontend Tests

```bash
cd Frontend
npm test

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Documentation

### Code Documentation

- **Python**: Use docstrings (Google or NumPy style)
- **TypeScript**: Use JSDoc comments
- Document all public APIs
- Include examples for complex functions

### API Documentation

- Backend API uses FastAPI's automatic documentation
- Keep endpoint descriptions up to date
- Document request/response models
- Add examples in docstrings

### User Documentation

- Update README.md for user-facing changes
- Create tutorials for new features
- Keep setup instructions current
- Add troubleshooting guides

## Community

### Getting Help

- **GitHub Discussions**: Ask questions and discuss ideas
- **Issues**: Report bugs and request features
- **Pull Requests**: Get code review and feedback

### Code Review

When reviewing others' code:

- Be respectful and constructive
- Explain the "why" behind suggestions
- Acknowledge good work
- Focus on the code, not the person
- Use GitHub's suggestion feature for minor changes

### Recognition

Contributors are recognized in:
- README contributors section
- Release notes
- GitHub contributors page

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the `question` label
- Reach out to maintainers
- Check existing documentation

---

Thank you for contributing to FinAI! 🎉

Your contributions help make personal finance management accessible and intelligent for everyone.
