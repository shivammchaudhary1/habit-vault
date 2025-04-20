# HabitVault – Daily Habit Tracker with Visual Streaks

## 🧠 Project Context

"Consistency beats intensity" is the core idea. HabitVault is a minimalist, distraction-free app focused on visual habit tracking and emotional motivation.

<img width="1440" alt="Screenshot 2025-04-20 at 5 54 24 PM" src="https://github.com/user-attachments/assets/3c5d7578-ecc3-4b84-9998-6a34c9aca6a4" />



---

## 🎯 Features

- **Add, Edit, Delete Habits**: Manage your daily routines with custom details.
- **Daily Check-In**: Mark habits as completed or missed each day.
- **Streak Tracking**: See your current and longest streaks for each habit.
- **Visual Dashboards**: Heatmaps charts to visualize your progress.
- **User Settings**: Persist UI preferences (theme, sorting) locally.

---

## 🔐 Authentication & Authorization

- Email/password registration & login
- All habit data is scoped to the logged-in user
- Protected routes/pages (auth middleware/route guards)
- Secure access via JWT
<img width="1440" alt="Screenshot 2025-04-20 at 5 57 56 PM" src="https://github.com/user-attachments/assets/cd8ee8e2-178a-42fb-987a-76974dafc330" />

<img width="1440" alt="Screenshot 2025-04-20 at 5 57 40 PM" src="https://github.com/user-attachments/assets/94afdb7d-c50c-444b-b34c-00566e02f2b9" />

---


## 🖥️ UI Pages

1. **Landing Page**: Logo, app title, tagline, intro, and [Get Started]/[Login] buttons
2. **Auth Pages**: Signup/Login with email & password, validations, redirects
3. **Dashboard**: Grid/card view of habits, streak counters, daily checklist, filter by status
<img width="1440" alt="Screenshot 2025-04-20 at 5 58 50 PM" src="https://github.com/user-attachments/assets/36b542f9-224f-4aff-8c1d-40063eb9fe6a" />
<img width="1440" alt="Screenshot 2025-04-20 at 5 59 16 PM" src="https://github.com/user-attachments/assets/253dec70-9c68-474a-8655-5036574b93e2" />
<img width="1440" alt="Screenshot 2025-04-20 at 5 59 34 PM" src="https://github.com/user-attachments/assets/de466176-5941-47ef-b8cc-2cce3cb79909" />

---

## ⚙️ Core Functionality

- **Habit Management**: Create, edit, delete habits (Name, Target Days, Start Date)
- **Daily Check-In**: Mark habits as completed/missed, store with timestamp
- **Streak Logic**: Auto-calculate current and longest streaks, reset on miss
- **Visualizations**: Heatmap/calendar
- **Sorting & Searching**: Sorting according to creation date and search by habit name.

---

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS, Material UI
- **Backend**: Node.js, Express, MongoDB
- **Auth**: JWT-based authentication
- **Charts**: Chart.js, Apache ECharts 

---

## 📁 Folder Structure (Client)

- `components/` – Reusable UI components
- `pages/` – Main app pages (Dashboard, Auth, Home)
- `modals/` – Modal dialogs for habits and stats
- `app/` – Redux store and slices
- `utility/` – Helpers, config, route guards
- `assets/` – Images and static assets

## 📁 Folder Structure (Server)

- `controllers/` – Route logic for auth, habits, stats
- `models/` – Mongoose models (User, Habit, HabitLog)
- `routes/` – Express route definitions
- `middleware/` – Auth middleware
- `services/` – Business logic (e.g., streaks)
- `config/` – DB, JWT, bcrypt config

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or cloud)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project
```

### 2. Setup Server

```bash
cd misogiai-server
npm install
# Configure your MongoDB URI and JWT secret in src/config/default.js
npm run server
```

### 3. Setup Client

```bash
cd ../misogiai-client
npm install
npm run dev
```

### 4. Open in Browser

Visit `http://localhost:5173` (or the port shown in terminal)

---

## 📊 Usage

- Register or login
- Add your habits
- Check off habits daily
- Track your streaks and visualize progress

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

[MIT](LICENSE)

---

## 📄 Live Deployement
- Live deployment https://misogiai-client.vercel.app/
- Credentials for Login:
   - email: shivamchaudhary75@gmail.com
   - password: Shivam@123


---

> **"Consistency beats intensity – Build better habits with clarity and streaks."**
