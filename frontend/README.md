# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



---

##  Frontend README (`chatbot-appsync/frontend/README.md`)


# Frontend – Chatbot App

This is the frontend for the Chatbot App, built using **React + Vite**. It provides a clean and dynamic UI to communicate with the backend (AppSync, Lambda).

---

## 🧰 Tech Stack

- **Framework:** React
- **Bundler:** Vite
- **Styling:** CSS Modules (or Tailwind, if added)
- **State Management:** useState, useEffect (Context planned)

---

## 🚀 Getting Started (Local Development)

1. Navigate to the frontend folder:
    cd frontend
2. Install dependencies:
    npm install
3. Run the development server:
   npm run dev 
4. Visit: http://localhost:5173

## 📁 Folder Structure

```
frontend/
│
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, logos, icons
│   ├── components/    # Reusable UI components
│   ├── pages/         # Main screen views (Home, Chat)
│   ├── styles/        # Global and component styles
│   ├── App.jsx        # Root component
│   └── main.jsx       # Entry point
├── index.html         # HTML template
├── package.json
├── vite.config.js
```

📦 TODO
```
Integrate API calls with AppSync
Add chat message components
Improve styling and responsiveness
```
