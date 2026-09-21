# CryptoAI Frontend

CryptoAI is a modern, responsive web application that provides an AI-powered conversational interface for cryptocurrency insights and knowledge.

## ✨ Features

- **Authentication System**
  - Secure login and registration flows
  - Email verification via OTP (One-Time Password)
  - Password recovery and reset functionality
  - Enforced strong password policies with visual strength indicators
- **Intelligent AI Chat**
  - Real-time conversational interface
  - Markdown support with `react-markdown` and GitHub Flavored Markdown (GFM)
  - Multiple chat session management
  - Isolated chat history per user account stored securely
- **User Experience**
  - Fully responsive design (Desktop & Mobile)
  - Toast notifications for system feedback
  - Intuitive sidebar navigation and history panel
  - User profile management

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **API Client:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Linter:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository and navigate to the frontend directory:
   ```bash
   cd cryptoAI/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env`
   - Ensure the API base URL is configured properly:
     ```env
     VITE_API_BASE_URL=http://your-backend-api-url
     ```

### Running the Application

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory. You can preview the production build locally using:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── api/          # Axios client configuration and API endpoints
├── components/   # Reusable UI components (Buttons, Inputs, Sidebar, etc.)
├── context/      # React Context providers (Auth, Global Chat state)
├── hooks/        # Custom React hooks (e.g., useChat, useAuth)
├── pages/        # Route components (Login, Signup, Chat, Profile, etc.)
├── routes/       # Protected and Public route wrappers
├── services/     # Local storage engines and utilities (AuthStorage, ChatMemory)
└── types/        # TypeScript interfaces and type definitions
```

## 🔐 Architecture Notes

- **API Gateway Support:** The Axios interceptor is specially configured to parse AWS API Gateway-style wrapped responses that return HTTP 200 with embedded error statuses (e.g., extracting 400+ status codes properly into the UI).
- **Secure State:** Chat sessions are aggressively namespaced by the user's username in local storage to prevent session leakage across different accounts on the same machine.
