# AI-Driven Loan Origination Platform

## Project Overview
This project is an **AI-Driven Loan Origination Platform** built using **Next.js, Tailwind CSS, NextAuth.js, and MongoDB**. The platform is designed to streamline the loan application process in the **BFSI (Banking, Financial Services, and Insurance)** sector using **Machine Learning** models for loan approval predictions.

🏆 This project was built in the **Ctrl + Alt + Hack** hackathon at **NSUT**, hosted by **SpaceCon**, and developed within **24 hours**.

## Features
- 🔑 User Authentication with **NextAuth.js (JWT)**
- 📊 Data Visualization with **React-Charts**
- 💸 Income Tracking and Debt-to-Income Ratio Calculation
- 🔍 Credit Score Fetching and Display
- 🧠 Loan Approval Prediction using **ML Model**
- 🎯 Loan History Tracking
- 📝 Dynamic Onboarding Form with Multi-Step Flow

## Tech Stack
### Frontend
- **Next.js 14** (React Framework)
- **TypeScript (TSX)**
- **Tailwind CSS** for UI Styling
- **shadcn/ui** for Modern UI Components
- **Framer Motion** for Animations
- **React Charts** for Data Visualizations

### Backend
- **MongoDB** for Database
- **Java Spring Boot** for ML Model Hosting (via API)
- **PyMongo** for ML Database Interfacing
- **NextAuth.js with JWT** for Authentication

## Folder Structure
```
├── pages
│   ├── api
│   │   └── auth
│   │       └── [...nextauth].ts   # NextAuth.js JWT Authentication API
│   ├── index.tsx                 # Landing Page
│   ├── dashboard.tsx             # Main Dashboard Page
│   └── onboarding.tsx            # Multi-step Onboarding Form
│
├── components
│   ├── Navbar.tsx               # Navigation Bar
│   ├── Sidebar.tsx              # Sidebar Menu
│   ├── Charts.tsx               # Charts Visualization Component
│   └── LoanCard.tsx             # Loan Application Card
│
├── styles                       # Tailwind Global Styles
└── utils                        # Utility Functions
```

## Authentication Flow 🔑
- User logs in via **NextAuth.js** with JWT tokens.
- Session maintained globally using `SessionProvider`
- Protected Routes using `useSession()`
- JWT Token sent in headers for API requests

## Data Visualization 📊
- **React Charts** library used for interactive data visualizations.
- Displays Income vs Debt comparison.
- Loan Approval Probability chart.
- Monthly Expense Breakdown.

## Animations 🎯
- Page transitions & button animations with **Framer Motion**
- Smooth fade-in and slide effects.

## How to Run Locally
### Prerequisites
- Node.js
- MongoDB

### Setup
```bash
git clone https://github.com/username/project.git
cd project
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
MONGO_URI=mongodb://localhost:27017/spaceCon
```

### Start Server
```bash
npm run dev
```

## Future Scope 🔥
- AI Loan Recommendation System
- Credit Score Calculation
- Payment Reminders
- Loan Repayment Tracking

## License
This project is licensed under the **MIT License**.

