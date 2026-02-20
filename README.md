# GT Yellow Jacked

Welcome to the team. To ensure 8 developers can build at speed without breaking each other’s code, this project follows a Feature-Based Modular Architecture.

The Concept: Think of this app as a jigsaw puzzle. Instead of everyone working on the same giant file, each developer is assigned a "Feature Folder." You own the logic, components, and styles within your folder. As long as your feature respects the TypeScript Contracts and uses the Shadcn UI "materials" defined in the shell, your piece will snap perfectly into the main app.

## 📜 The Golden Rules

Isolation: Keep feature-specific code inside your src/features/[name] folder.

Atomic UI: Use the base components in src/components/ui. Do not recreate buttons or inputs from scratch.

Mobile-First: This app will be wrapped in Capacitor. Always test your UI using Chrome DevTools in "Mobile" mode.

Contract First: Before coding, ensure you agree with the PM on the data shape (Props/Interfaces).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing. The page auto-updates as you edit the file.
