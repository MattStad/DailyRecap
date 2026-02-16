# DailyRecap ✅🗓️
DailyRecap is a fast daily check-in app (1–2 minutes) to track habits and reflect on your day — built with a modern React + Vite stack.

## ✨ Idea
Users open the app once per day (Duolingo-like routine) and answer a small set of questions such as:
- Did you drink > 2L water?
- Did you read 15 pages?
- Did you go to the gym?
- How healthy did you eat today?

The questions are customizable and support multiple answer types. The app then visualizes progress with summaries and charts.

## ✅ Features (current + target)
### Daily check-in flow
- One daily session (today’s recap)
- Fast completion (tap-based UX)
- Streak concept (optional)

### Custom questions
Supported question types:
- Yes/No
- Rating (e.g. 1–5 stars)
- Scale (e.g. 1–10 slider)
- Free text

Users can:
- add / edit / delete questions
- reorder questions
- enable/disable questions

### Analytics / dashboard
- history view (past days)
- charts per question over time
- completion rate, streak, averages

## 🧱 Tech Stack
- **React 18** + **TypeScript**
- **Vite** (build tooling)
- **Tailwind CSS** + **shadcn/ui** (Radix UI)
- **React Router**
- **TanStack React Query**
- **Recharts** (charts)
- **Vitest** (tests)
- ESLint (linting)

## 🚀 Getting Started
### Install
```bash
npm install
