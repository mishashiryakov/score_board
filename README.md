# 🏆 Football World Cup Score Board

A lightweight and interactive score board application built for tracking live football games and summarizing finished matches.

---
## 🌐 Live Demo

🔗 [View it live](https://mishashiryakov.github.io/score_board/)

![preview-image](https://github.com/mishashiryakov/score_board/blob/16bb9c71bc0b211fa2fd57694fc73021ef155df6/preview.png)

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Run unit tests

```bash
npm run test
```

---

## 🛠 Tech Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **Vitest**
- **Testing Library**

---

## 📋 Features

### 1. Add a Live Game

- Enter team names in the **Home Team** and **Away Team** input fields.
- Click **"Add Game"** to start tracking the match.
- You can run **multiple live games simultaneously**.

### 2. Edit a Live Game

- Click the **"Edit"** button inside a game card.
- A modal window will open to enter the updated scores.
- The **Save** button is disabled if:
  - Scores are unchanged.
  - Scores are negative.

### 3. Finish a Game

- Click the **"Finish"** button inside the card to mark the game as completed.

### 4. View Game Summary

- Navigate to the **"Games Summary"** tab.
- Displays all finished games.
- Sorted by:
  1. **Highest total score**
  2. **Finish timestamp** (if scores are equal)

---

## 💡 Possible Improvements

- More reliable ID generation (handled on the backend)
- Support keyboard actions like **Enter to Save/Edit**
- Prevent adding games with duplicate team names
- Move all game operations (create, edit, finish) to the backend
- Integrate **TanStack Query** for data fetching and caching

---

## 📁 Project Structure

```
src/
├── components/      # UI Components
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
├── pages/           # Score Board pae
└── main.tsx         # App entry point
```
