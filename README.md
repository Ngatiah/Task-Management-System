```markdown
---
# 📝 Task Management System – Firebase-Powered To-Do App

A **fully functional task management (to-do) application** where users can add, edit, delete, and prioritize tasks. Built with **React** and powered by **Firebase Authentication and Realtime Database**, this app demonstrates practical CRUD operations, state management, and session handling.

---

## 🚀 Live Demo

Coming soon (Deploy via Vercel or Firebase Hosting)

---

## 📌 Features

This Task Management System offers a comprehensive set of features to keep you organized:

* **User Authentication**: Secure login via Google and Email/Password using Firebase Auth.
* **Task Management**:
    * Create, Read, Update, and Delete (CRUD) tasks.
    * Prioritize tasks with high, medium, and low labels.
    * Categorize tasks (e.g., Work, Personal, Study).
    * Set due dates for tasks.
    * View all tasks per user session.
* **User Interface**:
    * Responsive and intuitive UI with dynamic styling.
    * Category image mapping for a richer experience.
* **Session Handling**:
    * Session persistence, meaning your login state is retained.

---

## 🛠️ Tech Stack

| Tech                   | Role                                    |
| :--------------------- | :-------------------------------------- |
| **React** | Frontend UI + State Management          |
| **Tailwind CSS** | Styling and layout                      |
| **Radix UI** | Styling and layout                      |
| **Firebase Auth** | Google login & session management       |
| **Firebase Realtime DB** | Task storage (CRUD backend)             |
| **Vite** | Frontend tooling and build system       |

---

## 🔐 Security

We've prioritized your data's security:

* **User sessions** are securely handled via Firebase Authentication.
* **Data is scoped** to individual authenticated users (`/tasks/{userId}`).

---

## 📚 Learning Outcomes

By building and exploring this project, you'll gain hands-on experience with:

* **Full CRUD operations** for real-world applications.
* **Task organization** by priority and category, crucial for effective task management.
* **React hooks and state management** for building dynamic user interfaces.
* **Secure login** with Firebase Authentication.
* **Firebase Realtime DB** read/write operations for dynamic data handling.
* **Routing and protected routes** (optional implementation for advanced navigation).
* **Deployment** with Vercel or Firebase Hosting, preparing you for production.

---

## 🧪 How to Run Locally

Get this app up and running on your local machine in just a few steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Ngatiah/Task-Management-System.git
    cd Task-Management-System
    ```

2.  **Install dependencies** (choose your preferred package manager):
    ```bash
    yarn
    # OR
    npm install
    ```

3.  **Configure Firebase**:
    Create a `.env` file at the root of your project and add your Firebase configuration details:

    ```env
    VITE_FIREBASE_API_KEY=your_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Start the app** (choose your preferred package manager):
    ```bash
    yarn dev
    # OR
    npm run dev
    ```

---

## 🧑‍💻 Author

**Ngatiah**

Built with instinct, curiosity, and a love for React + Firebase.

---

## 📦 Deployment

You can easily deploy this application using:

* **Firebase Hosting**
* **Vercel**

---

## 📄 License

**MIT License** — free to use, modify, and distribute.
```

Viewers :![visitors](https://visitor-badge.glitch.me/badge?page_id=Ngatiah.Task-Management-System)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
