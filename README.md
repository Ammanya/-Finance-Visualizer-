
# 💼 Aone Finance – Personal Finance Visualizer

Aone Finance is a full-featured web application built to help users **track, categorize, and analyze personal finances** with clear visual insights and budget comparisons.

The app was developed in **three stages** as per the assignment prompt, each adding new layers of interactivity and functionality.

---

## 🧠 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Backend:** API Routes (Next.js)
- **Database:** MongoDB (with Mongoose)
- **Charts:** Recharts

---

## 🚀 Features by Stage

### ✅ Stage 1: Basic Transaction Tracking
- Add, edit, and delete transactions (amount, date, description)
- Transaction list view
- **Bar chart** for monthly expenses
- Form validation and responsive design

### ✅ Stage 2: Categories
- Predefined categories for transactions (e.g., Food, Rent, Utilities)
- **Pie chart** for category-wise expense breakdown
- **Dashboard cards**:
  - Total monthly expenses
  - Category breakdown
  - Most recent transactions

### ✅ Stage 3: Budgeting
- Set monthly **budgets per category**
- **Budget vs Actual** comparison chart
- Spending insights:
  - Over/under budget detection
  - Category-level summaries

---

## 📊 Visualizations Used

- 📊 **Monthly Bar Chart** – Expense totals per month  
- 🥧 **Category Pie Chart** – Breakdown by category  
- 📈 **Budget Comparison Chart** – Planned vs actual spend per category  

---

## ✅ Evaluation Criteria Coverage

| Criteria               | Details                                    |
|------------------------|--------------------------------------------|
| Feature Implementation | ✅ All 3 stages completed                  |
| Code Quality           | ✅ Modular components, API separation     |
| UI/UX Design           | ✅ Clean, responsive, accessible design   |

---

## 📁 Project Structure

aone-finance/

├── app/ # Next.js app directory

│ ├── api/ # API routes for transaction & budget management

│ ├── components/ # UI components (cards, forms, charts)

│ ├── lib/ # DB and helper logic (Mongoose, utils)

│ └── pages/ # Page-level routing

├── public/ # Static assets

├── styles/ # Global styles

├── .env.local # Environment variables

└── README.md


---

## 🧪 Getting Started

### 📦 Install Dependencies

```bash
npm install


⚙️ Environment Setup
Create a .env.local file in the root:

MONGODB_URI=mongodb+srv://<your-connection-string>

▶️ Run Development Server

npm run dev

Open http://localhost:3000 in your browser.
