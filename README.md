# 🌿 Mojito Vault | High-End Personal Finance Terminal

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Mojito Vault** is a professional-grade, industrial-aesthetic expense tracking system designed for high information density and premium user experience. Built with a "Digital Age" branding philosophy, it balances sophisticated financial analytics with an intuitive, Bento Box-inspired interface.

---

## ✨ Key Features

### 💎 Premium Component Architecture
- **Proximity-Aware Select**: A custom-engineered dropdown component that tracks mouse proximity for smooth, organic interactions and animations.
- **Glassmorphism 2.0**: Utilizing `backdrop-blur-3xl`, semi-transparent layers, and vibrant accent glows for a modern, high-end feel.
- **Bento Grid Layout**: A responsive modular system that organizes data into clean, functional containers.

### 📊 Financial Intelligence
- **Spending Analysis**: Real-time breakdown of expenses by category with dynamic growth bars and allocation percentages.
- **Scale-Adaptive Peak**: Automated scaling system that adjusts analytics views based on total spending volume.
- **Currency Preview Terminal**: Live exchange rate integration using a dedicated FX stream with local proxying to bypass CORS restrictions.

### 🛡️ Enterprise-Grade Foundation
- **TypeScript Core**: Fully typed codebase ensuring data integrity and developer scalability.
- **Responsive Engineering**: Optimized for high-resolution desktop terminals ($1600 \times 900$) and mobile mobile devices ($414 \times 749$).
- **Persistent Ledger**: Versioned local storage integration for data persistence across sessions.

---

## 🚀 Technical Stack

- **Framework**: [React 18](https://reactjs.org/) (Vite-powered)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `clsx`, `tailwind-merge`, `class-variance-authority` (shadcn-inspired patterns)

---

## 🛠️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
src/
├── components/         # Modular UI Components
│   ├── ui/             # Atomic Shadcn-style components (Select, etc.)
│   ├── ExpenseForm.tsx # Transaction entry terminal
│   ├── ExpenseList.tsx # Historical ledger display
│   ├── SummaryPanel.tsx# Analytical breakdown matrix
│   └── ...
├── lib/                # Shared utilities and helpers (cn, etc.)
├── App.tsx             # Main application orchestrator
├── index.css           # Global design system & design tokens
└── main.tsx            # Entry point
```

---

## 🌐 API & Proxy Configuration

To ensure seamless live exchange rates, the project utilizes the [Frankfurter API](https://www.frankfurter.app/). To bypass browser CORS policies during development, a Vite reverse proxy is configured in `vite.config.ts`:

```javascript
// vite.config.ts snippet
proxy: {
  '/fx-api': {
    target: 'https://api.frankfurter.app',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/fx-api/, ''),
  },
}
```

---

## 🎨 Design Philosophy

The **Marketing Mojito** aesthetic is defined by:
- **Color Palette**: Deep Charcoal (`#0d0d0d`) backgrounds with vibrant Mojito Lime (`#A3E635`) accents.
- **Typography**: `Plus Jakarta Sans` for sleek interface elements and `Space Mono` for financial data precision.
- **Information Density**: A "Productivity-First" approach that minimizes whitespace without feeling cluttered.

---

## 📄 License

This project was developed as part of the **Marketing Mojito Web Developer Intern** assignment. 
Distributed under the MIT License.

---
