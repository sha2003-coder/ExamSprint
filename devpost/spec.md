---
doc: spec
status: approved
---

# ExamSprint — Technical Specification

A pure client-side React single-page application that dynamically prioritizes study revision topics based on exam urgency and self-rated student confidence.

---

## How This Works, In Plain Language
ExamSprint runs entirely in the user's web browser using React. When a student enters a study topic with an upcoming exam date and their confidence level, the application passes that information into a pure JavaScript function called the **Priority Engine**. 

The engine calculates how many calendar days remain until the exam and adds **Urgency Points** (up to 65) to **Confidence Points** (up to 30) to create a **Priority Score** from 10 to 95. The app then instantly sorts the student's study queue so that urgent and weak topics appear right at the top, tagged with a color-coded badge and an explanation sentence. Whenever a student marks a topic completed, edits a date, or updates their confidence level directly on a card, React automatically recalculates the scores and re-ranks the queue in real time without refreshing the page. All data is saved directly in browser `localStorage`.

---

## The Core Journey Through the System
Traces `prd.md > The Core Journey` through the technical components:

1. **Dashboard Initialization:** 
   - `App.jsx` mounts and executes a `useEffect` hook to read saved topics from `localStorage`.
   - If empty, default empty state displays in `StudyQueue.jsx` and `SummaryCards.jsx` displays `0` for all metrics.
2. **Topic Creation & Validation:**
   - The student types into `TopicForm.jsx`. 
   - On submit, input strings are trimmed and validated. If invalid (empty fields or past exam date), inline state errors render.
   - If valid, a new topic object with a unique timestamp ID is created and passed to `App.jsx` via callback.
3. **Priority Calculation:**
   - `priorityEngine.js` calculates days remaining using local midnight time and returns `{ score, tier, badgeColor, explanation }`.
4. **Queue Rendering & Sorting:**
   - Active topics are filtered (`!topic.completed`) and sorted descending by `score`.
   - `StudyQueue.jsx` renders sorted items using `TopicCard.jsx`.
5. **In-Place Updates:**
   - Selecting a new confidence in `TopicCard.jsx` invokes an update handler in `App.jsx`.
   - The topic object updates in state, triggers a recalculation in `priorityEngine.js`, and reorders the list smoothly.
6. **Archiving & Restoration:**
   - Clicking complete marks `topic.completed = true`. The card is moved from `StudyQueue.jsx` to `CompletedArchive.jsx`.
   - Clicking "Undo" sets `topic.completed = false`, immediately restoring the card to its calculated ranking.
7. **Persistence:**
   - A `useEffect` in `App.jsx` listens to changes in `topics` and serializes the array to `localStorage.setItem('examsprint_topics', JSON.stringify(topics))`.

---

## Stack
- **Framework / Runtime:** [React 18+](https://react.dev/) with JSX. Chosen because the learner is building CS skills in React and component-driven architecture.
- **Build Tool:** [Vite](https://vitejs.dev/). Chosen for near-instant development startup (`npm run dev`), zero complex configuration, and fast HMR (Hot Module Replacement).
- **Styling:** Vanilla CSS with custom properties (CSS variables). Chosen to maintain total styling control, create custom animations, and keep dependencies minimal without Tailwind or external UI libraries.
- **Persistence:** Browser [Web Storage API (`localStorage`)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). Chosen to provide persistent sessions across page reloads without requiring a backend server or database.
- **Language:** Modern JavaScript (ES6+). Pure client-side execution with zero paid API keys or cloud dependencies.

---

## Where It Runs and How Someone Tries It
- **Runtime Environment:** Modern web browser (Chrome, Edge, Firefox, Safari).
- **Prerequisites:** Node.js (version 18 or newer).
- **Start Command:**
  ```bash
  npm install
  npm run dev
  ```
- **Local URL:** Open `http://localhost:5173` in your browser.
- **Demo Recording Verification:** The entire user journey (adding topics, real-time priority ranking, in-place confidence adjustment, error validation, and completion/undo) can be demonstrated locally in 60 seconds.
- **Repository:** Public GitHub repository for Devpost submission; external cloud hosting is optional.

---

## Look and Feel
Implements `prd.md > Look and Feel` and `scope.md > Inspiration & Identity`.

- **CSS Variables Design System (`src/index.css`):**
  - `--bg-primary: #0b1120;`
  - `--bg-card: #1e293b;`
  - `--bg-input: #0f172a;`
  - `--accent-purple: #818cf8;`
  - `--accent-cyan: #38bdf8;`
  - `--priority-high: #ef4444;`
  - `--priority-med: #f59e0b;`
  - `--priority-low: #10b981;`
  - `--text-primary: #f8fafc;`
  - `--text-muted: #94a3b8;`
  - `--border-color: #334155;`
- **Layout Behavior:** Responsive flexbox/grid layout (side-by-side columns on desktop `> 860px`, vertical stack on mobile/narrow screens).
- **Transitions:** Smooth CSS transitions for card hover, badge color updates, and completed strikethrough.

---

## Components

### `App.jsx`
- **Responsibility:** Top-level application coordinator. Holds primary state (`topics`, `editingTopic`, `topicToDelete`, `toast`), syncs with `localStorage`, and coordinates handlers.
- **PRD Ref:** Implements `prd.md > Screens and Layout`.

### `Navbar.jsx`
- **Responsibility:** Header bar with ExamSprint logo, title, and tagline badge.
- **PRD Ref:** Implements `prd.md > Screens and Layout (Top Navigation Bar)`.

### `SummaryCards.jsx`
- **Responsibility:** Computes and displays the 4 dashboard metric cards (Total Subjects, Total Topics, High Priority Topics, Completed Topics).
- **PRD Ref:** Implements `prd.md > Screens and Layout (Dashboard Metric Cards)`.

### `TopicForm.jsx`
- **Responsibility:** Handles input fields for Subject Name, Topic Name, Exam Date, and Confidence Level. Executes validation logic (required fields, past date prevention, whitespace trim) and fires `onAddTopic` or `onUpdateTopic`.
- **PRD Ref:** Implements `prd.md > Features and Behavior (1. Topic Creation and Form Validation)`.

### `StudyQueue.jsx`
- **Responsibility:** Filters active uncompleted topics, computes live scores via `priorityEngine.js`, sorts topics descending by Priority Score, and renders `TopicCard.jsx` instances or the friendly empty state.
- **PRD Ref:** Implements `prd.md > Features and Behavior (2. Dynamic Priority Engine & Live Queueing)`.

### `TopicCard.jsx`
- **Responsibility:** Renders a single active topic card with priority score number, badge (`HIGH`/`MEDIUM`/`LOW`), countdown days, explanation, in-place confidence selector dropdown, complete checkbox, edit button, and delete button.
- **PRD Ref:** Implements `prd.md > Features and Behavior (2. Dynamic Priority Engine & 3. In-Place Card Actions)`.

### `CompletedArchive.jsx`
- **Responsibility:** Collapsible bottom drawer displaying completed topics with muted styling, green checkmark, strikethrough text, "Undo" button, and "Delete" button.
- **PRD Ref:** Implements `prd.md > Features and Behavior (4. Completed Topics Archive & Progress Tracking)`.

### `ConfirmModal.jsx`
- **Responsibility:** Accessible modal dialog prompting *"Are you sure you want to delete this topic?"* with Cancel and Confirm Delete buttons.
- **PRD Ref:** Implements `prd.md > Features and Behavior (3. Deleting Topics)`.

### `utils/priorityEngine.js`
- **Responsibility:** Pure JavaScript helper functions for date math and scoring.
  - `calculateDaysRemaining(examDateString)`: Compares exam date with local midnight.
  - `calculatePriority(examDateString, confidence)`: Computes urgency points + confidence points.
  - `getExplanation(daysRemaining, confidence, score)`: Formulates human-readable sentence.
- **PRD Ref:** Implements `prd.md > Features and Behavior (2. Dynamic Priority Engine)`.

---

## Data Model

### Topic Object Schema
```javascript
{
  id: "topic_1730000000000",        // Unique string timestamp
  subject: "Computer Science",      // Trimmed string
  topic: "Graph Algorithms",        // Trimmed string
  examDate: "2026-10-30",           // YYYY-MM-DD local date string
  confidence: "Low",                // "Low" | "Medium" | "High"
  completed: false,                 // Boolean flag
  createdAt: 1730000000000          // Numeric timestamp
}
```

### Priority Engine Output Schema
```javascript
{
  daysRemaining: 2,
  score: 95,                        // 10 to 95 points
  tier: "HIGH",                     // "HIGH" | "MEDIUM" | "LOW"
  badgeClass: "badge-high",
  explanation: "Exam in 2 days and Low confidence. Revise this topic first."
}
```

---

## Priority Scoring Algorithm & Weights
Agreed in technical planning with the learner:

### 1. Urgency Points (Max 65)
- `0` to `2` days remaining: **65 points** (Imminent exam)
- `3` to `7` days remaining: **45 points** (This week)
- `8` to `14` days remaining: **25 points** (Next week)
- `15+` days remaining: **10 points** (Upcoming)

### 2. Confidence Points (Max 30)
- `Low` confidence: **30 points** (High need for study)
- `Medium` confidence: **15 points** (Moderate need)
- `High` confidence: **0 points** (Low need)

### 3. Total Formula
$$\text{Priority Score} = \text{Urgency Points} + \text{Confidence Points}$$
- **Score Range:** 10 to 95.
- **Tiers:**
  - High: 70–100 (Red)
  - Medium: 40–69 (Orange/Yellow)
  - Low: 1–39 (Green)

---

## File Structure

```
ExamSprint/
├── index.html                       # HTML5 entry point & metadata
├── package.json                     # Vite & React dependencies
├── vite.config.js                   # Vite configuration
├── devpost/                         # Devpost learning hackathon documents
│   ├── learner-profile.md
│   ├── scope.md
│   ├── scope.html
│   ├── prd.md
│   ├── prd.html
│   ├── spec.md                      # This technical blueprint
│   └── spec.html                    # Visual interactive companion
└── src/
    ├── main.jsx                     # React DOM root entry
    ├── App.jsx                      # App root state & layout
    ├── index.css                    # CSS variables & dark design system
    ├── components/
    │   ├── Navbar.jsx               # Header & branding
    │   ├── SummaryCards.jsx         # 4 dashboard metric cards
    │   ├── TopicForm.jsx            # Form input & validation
    │   ├── StudyQueue.jsx           # Active ranked study feed
    │   ├── TopicCard.jsx            # Individual topic card & in-place controls
    │   ├── CompletedArchive.jsx     # Collapsible completed topics list
    │   └── ConfirmModal.jsx         # Delete confirmation dialog
    └── utils/
        └── priorityEngine.js        # Date math & priority scoring algorithm
```

---

## External Services and Dependencies
- **No external paid APIs or backend services.** 100% self-contained client-side application.
- **NPM Dependencies:**
  - `react`: `^18.3.1`
  - `react-dom`: `^18.3.1`
  - `vite`: `^5.4.0` (dev dependency)
  - `@vitejs/plugin-react`: `^4.3.1` (dev dependency)

---

## Important Failure Modes & Defenses

1. **Date Timezone & Midnight Skew:**
   - *Risk:* Comparing UTC timestamps can cause an exam set for tomorrow to read as 0 days or past due depending on student timezone.
   - *Defense:* `priorityEngine.js` parses the `YYYY-MM-DD` string and sets the time to local midnight (`00:00:00`) for both today and the target date before computing `Math.round((examDate - today) / (1000 * 60 * 60 * 24))`.
2. **Corrupted or Malformed `localStorage`:**
   - *Risk:* If `localStorage` contains invalid JSON, the app could crash on first load.
   - *Defense:* Wrapped in `try...catch` block. If parsing fails, logs warning and falls back to empty array `[]`.
3. **Empty Field or Whitespace Submission:**
   - *Risk:* Adding empty cards that pollute the priority list.
   - *Defense:* Form validation trims strings (`.trim()`) and checks length `> 0`. Errors appear inline below the offending field without clearing other valid inputs.
4. **Previously Saved Topics with Expired/Past Exam Dates:**
   - *Risk:* A topic added days ago might now have an exam date that has passed (`daysRemaining < 0`).
   - *Defense:* `priorityEngine.js` detects when `daysRemaining < 0`. Instead of producing negative scores or invalid states, it assigns a `PAST DUE` badge with explanation *"Exam date has passed. Update date or mark complete."* and places it at the bottom of the active queue so it doesn't displace urgent upcoming exams.

---

## Testing and Verification Plan

During the build phase (`5-build`), we will systematically verify the application against these 10 criteria:

1. **Empty State Verification:** Open clean app -> verify 4 summary metric counters show `0` and a friendly empty state is displayed with an "Add Your First Topic" prompt.
2. **Input Validation:** Try submitting empty form -> verify inline red error messages; select past date -> verify rejection with clear alert; select today -> verify accepted.
3. **Priority Score Calculation:** Add topic with 1 day remaining + Low confidence -> verify score is `95/100`, Red badge (`HIGH`), with plain-English explanation *"Exam in 1 day and Low confidence. Revise this topic first."*
4. **Auto-Ranking Queue:** Add 3 topics with different urgency/confidence -> verify queue renders them strictly from highest to lowest score.
5. **In-Place Confidence Recalculation:** Toggle confidence dropdown from Low to High directly on a card -> verify score drops by 30 points and card re-ranks smoothly without page reload.
6. **Editing Topics:** Click Edit on a topic -> modify subject, topic name, or date -> verify changes save and recalculate correctly.
7. **Deletion Safety:** Click trash icon -> verify confirmation modal appears; click Cancel -> topic stays; click Delete -> topic is permanently removed and counters decrement.
8. **Completed Topics Archive & Undo:** Mark topic complete -> verify it leaves active queue, increments "Completed Topics" counter, and appears in collapsible archive with strikethrough; click "Undo" -> verify it returns to active queue.
9. **Browser Persistence (`localStorage`):** Add topics, mark one complete, and reload the browser (`F5`) -> verify all data and completion statuses persist.
10. **Responsive Design:** View on desktop (`> 860px`) -> verify side-by-side split layout; view on mobile viewport (`< 600px`) -> verify clean stacked layout.

---

## What Was Simplified and Why
- **`localStorage` instead of MongoDB/Node backend:** Eliminates setup complexity, backend database hosting costs, and server connection failures during demo recording.
- **Deterministic Rule-Based Engine instead of LLM API:** Eliminates latency, API billing, network failures, and unpredictable responses.
- **Single Page Architecture instead of React Router:** Avoids unnecessary multi-page routing overhead for an MVP dashboard where all core value happens on one screen.

---

## Decisions and Open Issues

### Decisions Made
- **Stack:** Vite + React + Vanilla CSS + `localStorage`.
- **Scoring Weights:** 65/45/25/10 for Urgency, 30/15/0 for Confidence.
- **Component Decomposition:** 7 modular React components + 1 pure JS utility.
- **Validation:** Inline red field alerts, blocking past dates, preserving valid inputs.
- **Past Date Handling:** Graceful `PAST DUE` badge for previously stored items whose exam date has lapsed.

### Resolved Unknown
- **Date calculation reliability:** Resolved by using local midnight date difference calculation to avoid timezone offsets.

