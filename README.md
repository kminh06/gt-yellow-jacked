# 🐝 Yellow Jacked

> The Georgia Tech-exclusive platform for students to get jacked. Built with Next.js, Capacitor, and Firebase.

## 🧩 The Jigsaw Philosophy

To manage our team of 8 effectively, we follow a **Feature-Based Modular Architecture**.

1. **Ownership:** Each Lead owns a specific folder in `src/features`.
2. **Isolation:** Only export via `index.ts`. Never "reach in" to another folder's subdirectories.
3. **Contracts:** All data must follow the interfaces defined in `src/types/index.ts`.
4. **Mobile-First:** Use Query Parameters (`/workout?id=123`) and test in Chrome DevTools "Mobile" mode.

---

## 📂 Team & Folder Map

| Folder                | Lead                        | Responsibility                                                              |
| :-------------------- | :-------------------------- | :-------------------------------------------------------------------------- |
| `features/auth`       | **Auth Lead**               | Firebase Auth & `useAuth` hook                                              |
| `features/workouts`   | **Workout Builder Lead**    | Workout detail page & Builder logic                                         |
| `features/exercises`  | **Exercises Lead**          | Exercise search & API integration                                           |
| `features/visualizer` | **Visualizer Lead**         | 3D Human Body Canvas                                                        |
| `features/dashboard`  | **Dashboard Lead**          | Home page & Progress tracking                                               |
| `components/ui`       | **Designer**                | Global Shadcn/Tailwind theme customization                                  |
| `lib/db`              | **Backend Team (2 people)** | Setting up Firestore database, writing type-safe CRUD services for frontend |

### 📜 Folder Rules for Leads

- **Standardized Sub-folders:** Use `api`, `components`, `hooks`, and `types` inside your feature folder.
- **Smart vs. Dumb UI:** Logic-heavy components stay in `features/`. Generic UI (buttons, cards) live in `src/components/ui`.
- **Backend Rule:** The Backend Team provides "Black Box" hooks. If a lead needs to save data, the Backend team provides a `useSaveData()` hook to handle the logic.

---

## 🛠 Setup & Build

```bash
# 1. Install & Config
git clone https://github.com/kminh06/gt-yellow-jacked.git
cd gt-yellow-jacked
npm install && cp .env.example .env.local

# 2. Run in Browser
npm run dev

# 3. Sync to Native
npm run build && npx cap sync

# 4. Run in Xcode/Android Studio
npx cap open ios
npx cap open android
```

## 📜 Dev Guidelines

- **Safe Areas:** The App Shell will handle the iPhone notch and home bar at the layout level; just focus on building your features
- **Atomic UI:** Always check `src/components/ui` for existing components before building your own.
- **Data:** Use `MOCK_DATA` until the Backend Team delivers your feature-specific hooks.

---

## 🚀 Branching & PRs

**Workflow:** `dev` ➔ `feature/[feature-name]/[task]` ➔ **Merge to `dev`**.

1. **Helping another folder?** Tag that **Folder Lead** as a reviewer on your PR.
2. **Ready to merge?** Folder Leads tag the **PM** (@kminh06) for the final review into `dev`.
3. **Releases:** The PM will handle merging `dev` into `main` for stable club releases.

---

## 🐝 Getting Help

- **Technical Blockers:** Tag your Folder Lead or the PM in the Discord #dev channel.
- **Infrastructure:** See the PM for any Capacitor, build, or environment variable issues.
