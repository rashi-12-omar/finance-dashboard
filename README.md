### Project Link : https://github.com/rashi-12-omar/finance-dashboard
### Live Demo: https://finance-dashboard-weld-tau-87.vercel.app/


# FinTrack: Personal Finance Dashboard
FinTrack is a modern, responsive finance management dashboard built with React, Vite, and Tailwind CSS. It allows users to track income, expenses, and visualize spending patterns through interactive charts while supporting role-based access and dark mode.

## Key Features
Role-Based Access Control (RBAC): Toggle between Admin and Viewer roles. Admins can add/delete transactions, while Viewers have read-only access.

Interactive Data Visualization: Dynamic Area Charts for activity trends and Donut Charts for category-wise spending breakdown using Recharts.

Real-time Filtering & Search: Search transactions by category or filter by type (Income/Expense) and date.

Theme Switching: Fully optimized Dark Mode for a premium user experience.

Data Export: Securely export your transaction history as a JSON file.

Smart Insights: Automated alerts for high-spending categories (e.g., Rent).

## Tech Stack
| Technology        | Use Case                              |
|------------------|----------------------------------------|
| React (Vite)     | Frontend Framework (Fast HMR)         |
| Tailwind CSS     | Utility-first Styling & Dark Mode     |
| Recharts         | Interactive Data Visualization        |
| Lucide React     | Modern UI Iconography                 |
| Zustand / State  | Global State Management               |

## Approach
1) Component-Driven Development: Built using modular components (TransactionTable, SummaryCards, DashboardCharts) for maximum reusability and clean code.

2) Tailwind JIT Engine: Leveraged Tailwind's Just-In-Time engine to handle complex dark mode transitions and responsive layouts efficiently.

3) State Logic: Implemented a centralized state for transactions, allowing real-time updates across the dashboard without page refreshes.

4) UX Focus: Prioritized high-contrast accessibility (Dark Mode) and smooth transitions (framer-motion / CSS transitions) for a professional feel.



npm or yarn
## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### 📌 Prerequisites

Make sure you have the following installed:

- Node.js (v16.0.0 or higher)
- npm or yarn

---

### ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/rashi-12-omar/finance-dashboard.git
cd finance-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## Project Structure
```plain text
src/
 ├── assets/          # Static images/icons
 ├── components/      # UI Components (Charts, Tables, Cards)
 ├── store/           # State management logic
 ├── App.jsx          # Main Layout & Role Logic
 ├── index.css        # Tailwind & Global Styles
 └── main.jsx         # Entry point
```

 
