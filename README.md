📝 Task Management System – Firebase-Powered To-Do App
A fully functional task management (to-do) application where users can add, edit, delete, and prioritize tasks. Built with React and powered by Firebase Authentication and Realtime Database, this app demonstrates practical CRUD operations, state management, and session handling.

🚀 Live Demo
Coming soon (Deploy via Vercel or Firebase Hosting)

📌 Features
✅ User authentication via Google and EmailWithPassword (Firebase Auth)

📋 Create, read, update, and delete tasks

🎯 Prioritize tasks with high/medium/low labels

🗃️ Categorize tasks (e.g., Work, Personal, Study)

🗓️ Set due dates for tasks

🧾 View all tasks per user session

🎨 Responsive and intuitive UI with dynamic styling

🔒 Session persistence (login state retained)

🖼️ Category image mapping

🛠️ Tech Stack
Tech	Role
React	Frontend UI + State Management
Tailwind CSS / Radix UI	Styling and layout
Firebase Auth	Google login & session management
Firebase Realtime DB	Task storage (CRUD backend)
Vite	Frontend tooling and build system

🔐 Security
User sessions handled via Firebase Authentication
Data is scoped to individual authenticated users (/tasks/{userId})

📚 Learning Outcomes
By building this project, you will gain hands-on experience with:
🔁 Full CRUD operations
🗂️ Task organization by priority and category
🧠 React hooks and state management
🔐 Secure login with Firebase Auth
⚡ Firebase Realtime DB read/write operations
🧭 Routing and protected routes (optional)
🧪 Deployment with Vercel or Firebase Hosting

🧪 How to Run Locally
1.Clone the repository
git clone https://github.com/your-username/task-manager.git
cd task-management-system

2.Install dependency based on on your preference:
yarn 
npm install

3.Configure firebase
Create a .env file at the root:
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

4.Start the app based on your preference:
yarn dev
npm run dev 

🧑‍💻 Author
Ngatiah
Built with instinct, curiosity, and a love for React + Firebase.

📦 Deployment
You can deploy this app using:
🔥 Firebase Hosting
⚡ Vercel

📄 License
MIT License — free to use, modify, and distribute.



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
