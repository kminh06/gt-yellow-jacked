# 🐝 Yellow Jacked

> The Georgia Tech-exclusive platform for students to get jacked. Built with Next.js, Capacitor, and Firebase.

## 🧩 The Jigsaw Philosophy

To manage our team of 8 effectively, we follow a **Feature-Based Modular Architecture**.

1. **Ownership:** Each Lead owns a specific folder in `src/features`.
2. **Isolation:** Keep feature-specific logic, components, and hooks within your assigned folder.
3. **Contracts:** All data models must follow the interfaces defined in `src/types/index.ts`.
4. **Mobile-First:** We are building for iOS/Android. **Test your UI in Chrome DevTools "Mobile" mode.**

---

## 📂 Folder Map & Ownership

Each feature folder in `src/features/` must follow this standardized sub-structure to maintain consistency across the team:

```text
src/features/[feature-name]/
├── api/          # Data fetching logic (Firebase calls, API route handlers)
├── components/   # UI pieces specific to this feature (Smart components)
├── hooks/        # React logic/state specific to this feature
├── types/        # Local interfaces (If they aren't in the global Constitution)
└── index.ts      # THE BARREL: Only export what the rest of the app needs
```

| Folder                | Lead                        | Responsibility                                                                                 |
| :-------------------- | :-------------------------- | :--------------------------------------------------------------------------------------------- |
| `features/auth`       | **Auth Lead**               | Firebase Auth & `useAuth` hook                                                                 |
| `features/workouts`   | **Workout Builder Lead**    | Workout detail page & Builder logic                                                            |
| `features/exercises`  | **Exercises Lead**          | Exercise search & API integration                                                              |
| `features/visualizer` | **Visualizer Lead**         | 3D Human Body Canvas                                                                           |
| `features/dashboard`  | **Dashboard Lead**          | Home page & Progress tracking                                                                  |
| `components/ui`       | **Designer**                | Global Shadcn/Tailwind theme customization                                                     |
| `lib/db`              | **Backend Team (2 people)** | Setting up Firestore database, writing type-safe CRUD services for frontend, Data Access Layer |

### 📜 Folder Rules for Leads

- **Standardized Sub-folders:** Each feature lead is responsible for organizing their directory into `api`, `components`, `hooks`, and `types` (already created).
- **Public/Private:** Files inside a feature folder should only be accessed via the `index.ts` file in that folder. Do not "reach in" to sub-folders from the outside; this keeps our code clean. See /features/dashboard as an example.
- **Smart vs. Dumb Components:** Logic-heavy components live in your `features/` folder. Pure UI components (buttons, inputs) belong in `src/components/ui` and are managed by the Designer. Preview them by going to "/design" page.
- **Local vs. Global:** If a Type is used by more than one feature, it should be moved to the global `src/types` directory.

---

## 🛠 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/kminh06/gt-yellow-jacked.git
cd gt-yellow-jacked
npm install
```

### 2. Environment Variables

1. Copy `.env.example` to a new file named `.env.local`.
2. Populate the Firebase keys (Found in the pinned Discord message).
3. **Note:** All variables must start with `NEXT_PUBLIC_` to be accessible in the browser.

### 3. Work & Test in Browser

```bash
npm run dev
```

### 4. Build & Sync (Native Mobile)

Because we use **Static Export**, follow this to see web changes on your phone/simulator:

```bash
npm run build      # Compiles Next.js build files into the /out folder
npx cap sync       # Syncs /out assets to native ios/android folders
npx cap open ios   # Opens Xcode (use 'android' for Android Studio)
```

## 📜 Development Rules

- **Safe Areas:** The App Shell (`layout.tsx`) handles the iPhone notch and home bar automatically via CSS spacers. Build your features as if the screen is a standard rectangle; the hardware padding is already accounted for.
- **No Inline Styles:** Use Tailwind CSS only.
- **Atomic UI:** Check `src/components/ui` before building a new component. Use the buttons, cards, and inputs defined by the Designer to maintain a consistent Georgia Tech branding.
- **Data Fetching:** Use the `MOCK_DATA` in `src/lib/db/mock-data.ts` during early development.
- **Routing:** Use Query Parameters for dynamic pages (e.g., `/workout?id=123`)

## ONLY For Backend Team

- You do not build UI. Your goal is to provide functions and hooks. If a Feature Lead says 'I need to save a workout,' you provide them with a useSaveWorkout() hook that handles the logic for them.

---

## 🚀 How to Contribute

1. **Pick a Ticket:** Check the GitHub Issues tab. You can claim issues in your own folder or help out in other folders if you have capacity.
2. **Branching:** Always branch FROM `dev`.
   - Name: `feature/[feature-name]/[task-description]`
3. **The Review Process:**
   - **If you are helping another folder:** You must tag that **Folder Lead** as a reviewer on your Pull Request. They are responsible for ensuring your code doesn't break their feature's logic.
   - **If you are the Folder Lead:** Once your own code (or a helper's code) is ready, tag the **PM** as the final reviewer for the merge to `dev`.
4. **Main Releases:** The PM will handle merging `dev` into `main`.

---

## 🐝 Getting Help

- Discord channel, tagging Leads/PM, etc.
