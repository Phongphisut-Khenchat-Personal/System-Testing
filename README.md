
🤖 Automated testing project for user management system using Playwright framework

## 📁 Project Structure

```
├── src/
│   ├── helpers/
│   │   ├── createUser.js
│   │   ├── login.js
│   │   ├── viewAllUser.js
│   │   └── Logo.png
│   └── tests/
│       ├── createUser.test.js
│       ├── login.test.js
│       └── viewAllUser.test.js
```

## ✨ Features Tested

### 👤 User Creation
- ✅ Input validation for Thai characters
- ✅ Input validation for English characters
- ❌ Prevention of invalid inputs (emoji, special characters, numbers)
- ✅ First name and last name validation
- ✅ Username validation
- 📸 Profile picture upload

### 🔐 Login
- ✅ Authentication with valid credentials
- 🔄 URL redirection after successful login

### 📊 User Management
- 👥 View all users functionality
- 📋 User listing interface

## 🧪 Test Cases

The test suite includes multiple test cases covering:

### 1️⃣ First Name Validation (TC001-TC006)
   - 🇹🇭 Thai character support
   - 🔤 English character support
   - ⚔️ Invalid input prevention

### 2️⃣ Last Name Validation (TC007-TC012)
   - 🇹🇭 Thai character support
   - 🔤 English character support
   - ⚔️ Invalid input prevention

### 3️⃣ Username Validation (TC013-TC015)
   - 🔤 English character support
   - 🔢 Alphanumeric support
   - ⚔️ Numeric input validation

## 🚀 Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## ▶️ Running Tests

To run all tests:
```bash
npx playwright test
```

To run a specific test file:
```bash
npx playwright test createUser.test.js
```

## ⚙️ Test Configuration

The project uses standard test credentials:
- 👨‍💼 Admin: username: 'admin', password: 'Adm!n123'
- 👤 User: username: 'User', password: 'User'

## 🛠️ Helper Functions

The project includes several helper functions:
- 🔑 `login.js`: Handles authentication
- 👤 `createUser.js`: Manages user creation
- 📋 `viewAllUser.js`: Handles user listing operations

## 🌐 Environment

The tests are configured to run against:
```
https://pramern.withyamroll.com
```

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
⭐️ Made with ❤️ for better testing
