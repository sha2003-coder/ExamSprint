---
doc: prd
status: approved
---

# ExamSprint — Product Requirements

A smart, single-page study revision planner for university students that dynamically ranks study topics based on exam urgency and self-rated confidence.
Source: `scope.md > The Unique Kernel`, `scope.md > Who It's For`.

---

## The Core Journey
Source: `scope.md > The Core Loop`, `scope.md > What "Working" Looks Like`.

1. **Arrival & Onboarding:** The student opens ExamSprint in their browser. They are greeted by a modern dark dashboard with top summary metrics at 0, a welcoming empty-state card ("Welcome to ExamSprint! Study smarter, not harder"), and an "Add Your First Topic" prompt.
2. **Inputting Topics:** On the left-hand form, the student types a Subject (e.g., "Computer Science"), a Topic Name (e.g., "Graph Algorithms"), selects an Exam Date (today or in the future), and picks an initial Confidence Level (Low, Medium, High).
3. **Validation & Instant Feedback:** Upon clicking "Add Topic", inputs are trimmed and validated. If valid, a brief success toast appears, the form resets, and the summary statistics update.
4. **Dynamic Priority Queueing:** On the right-hand side, the topic card appears instantly in the live revision queue. The client-side JavaScript engine calculates a Priority Score (1–100), tags it with a color-coded badge (High/Red, Medium/Orange-Yellow, Low/Green), and displays an explanatory sentence (e.g., *"Exam in 2 days and Low confidence. Revise this topic first."*).
5. **Real-Time Recalculation & In-Place Editing:** As the student studies, they can change the confidence dropdown directly on the card (e.g., from Low to High) or edit the exam date; the priority score recalculates immediately and the card shifts smoothly to its new ranked position without reloading the page.
6. **Completing Topics:** The student checks off a topic. It is removed from the active queue, moved into a collapsible "Completed Topics" section at the bottom (styled with a green checkmark, faded background, and strikethrough), and the Completed counter increments.
7. **Reversibility & Control:** If completed by mistake, the student can click "Undo" to restore the topic to the active queue with its original priority. If no longer relevant, topics can be deleted with a confirmation prompt.

---

## Screens and Layout
Source: `scope.md > Inspiration & Identity`.

- **Single-Page Dashboard Architecture:** All interactions occur on a single responsive screen without multi-page reloads or tab switching.
- **Top Navigation Bar:**
  - ExamSprint logo and title.
  - Subtitle or quick badge ("Sprint Study Planner").
- **Dashboard Metric Cards (Header Row):**
  - **Total Subjects:** Count of unique subjects added.
  - **Total Topics:** Total count of active + completed topics.
  - **High Priority Topics:** Count of active topics with Priority Score ≥ 70.
  - **Completed Topics:** Count of finished topics.
- **Main Working Area (Two-Column Desktop, Stacked Mobile):**
  - **Left Column (Input / Edit Form):** Clean card form for adding or editing subjects, topic titles, exam dates, and confidence levels with inline validation messages and a submit button.
  - **Right Column (Active Revision Queue):** Live feed sorted in descending order of Priority Score (highest priority on top).
- **Bottom Section (Collapsible Archive):**
  - Collapsible "Completed Topics" section showing archived cards with "Undo" and "Delete" actions.

---

## Look and Feel
Source: `scope.md > Inspiration & Identity`.

- **Theme & Colors:** Clean, modern dark mode palette.
  - Deep dark background (`#0f172a` / `#1e293b`).
  - Accents in vibrant purple and electric blue (`#818cf8`, `#38bdf8`) for buttons, active borders, and focus states.
  - Priority badge highlights:
    - High Priority: Vivid Red (`#ef4444`, background: `rgba(239, 68, 68, 0.15)`).
    - Medium Priority: Warm Amber/Orange (`#f59e0b`, background: `rgba(245, 158, 11, 0.15)`).
    - Low Priority: Fresh Green (`#10b981`, background: `rgba(16, 185, 129, 0.15)`).
- **Typography:** Modern, legible sans-serif (system stack or Inter-style clean geometry) with sharp contrast for quick reading under study pressure.
- **Micro-Interactions:** Subtle hover states on cards, smooth transitions when priority rankings reorder, and clear toast feedback on topic creation/deletion.

---

## Features and Behavior
Source: `scope.md > The POC Boundary`.

### 1. Topic Creation and Form Validation
- Inputs:
  - Subject Name (text, trimmed)
  - Topic Title (text, trimmed)
  - Exam Date (`YYYY-MM-DD` date picker, constrained to today or future dates)
  - Confidence Level (Dropdown: Low, Medium, High)
- Validation Rules:
  - Empty field check: Triggers an inline red error below the field (e.g., *"Please enter a topic name."*).
  - Past date check: If date `< today`, displays *"Exam date cannot be in the past. Please select today or a future date."* Today is valid (0 days remaining).
  - Form retention: On validation failure, previously entered values are preserved so the student does not have to retype everything.
  - Submission: On success, inputs reset (or reset topic while keeping subject for fast batch entry), a toast notification displays *"Topic added successfully!"*, and metrics update immediately.

### 2. Dynamic Priority Engine & Live Queueing
- Scoring Range: 1 to 100 points.
- Priority Tiers:
  - **High Priority:** 70–100 points (Red badge)
  - **Medium Priority:** 40–69 points (Orange/Yellow badge)
  - **Low Priority:** 1–39 points (Green badge)
- Card Display Content:
  - Subject Tag & Topic Title
  - Days Remaining countdown (e.g., "Exam in 2 days", "Exam Today")
  - Confidence Indicator badge (Low / Medium / High)
  - Numerical Priority Score (e.g., `95/100`)
  - Color-coded Priority Badge (`HIGH`, `MEDIUM`, `LOW`)
  - Plain-English Explanation sentence reflecting the inputs (e.g., *"Exam in 2 days and Low confidence. Revise this topic first."*).
- Ordering: Cards are automatically sorted in descending order of Priority Score.

### 3. In-Place Card Actions & Editing
- **Direct Confidence Toggle:** A quick dropdown directly on each active card allowing students to change confidence from Low → Medium → High. The score recalculates instantly, updating badge, explanation, and queue ranking without page refresh.
- **Card Edit Modal/Inline Mode:** Allows editing Subject, Topic Title, Exam Date, or Confidence. Saving validates inputs and re-ranks the queue.
- **Delete Action:** A trash icon button on the card. Clicking displays a confirmation dialog: *"Are you sure you want to delete this topic?"* with Cancel (keeps topic) and Delete (permanently removes topic and decrements counters).

### 4. Completed Topics Archive & Progress Tracking
- Checkbox/Complete Button: Checking marks the topic complete.
- Behavior:
  - Topic is removed from the active queue.
  - Added to the "Completed Topics" collapsible list at the bottom.
  - Styled with a green checkmark, muted opacity, and strikethrough text.
  - Excluded from active priority calculations.
  - Increments "Completed Topics" metric card.
- Restoration: Each completed card features an "Undo" / "Mark as Incomplete" button that restores it back to the active queue with recalculated priority.

---

## States and Boundaries

- **First-Use / Empty State:**
  - Metric counters show `0`.
  - Left form is ready for input.
  - Right area displays a welcoming empty-state card:
    - Header: *"Welcome to ExamSprint! Study smarter, not harder."*
    - Body: *"Add your first study topic to generate your personalized revision priorities."*
    - Action: *"Add Your First Topic"* button that focuses the Subject input.
  - Completed section remains hidden when empty.
- **Active Operational State:**
  - Queue shows cards sorted by Priority Score.
  - Metrics accurately display totals and high-priority counts.
- **Inline Error State:**
  - Red contextual error text beneath invalid input fields.
  - Invalid topic is blocked from entering the queue.
- **Delete Confirmation State:**
  - Accessible modal or alert box with Cancel and Confirm Delete buttons.
- **Completed Archive State:**
  - Collapsible accordion with header showing count (e.g., *"Completed Topics (3)"*).

---

## Product Decisions
Source: Learner interview responses.

- **Single-page dashboard over multi-tab navigation:** Chosen to provide instant visual feedback where adding or editing a topic re-ranks the list on the same screen without cognitive friction.
- **Pure JavaScript rule-based scoring over AI LLM API calls:** Chosen to keep the application deterministic, blazing fast, 100% free of API costs, and easy to run locally.
- **Collapsible completed archive over permanent deletion:** Allows students to feel a sense of progress without cluttering active urgent study items, while providing an "Undo" safety net.
- **In-place confidence dropdown on cards:** Allows quick updates during study sessions without opening complex edit modals.

---

## What We're Building (POC Core)
- Single-page responsive React dashboard with dark theme and purple/blue accents.
- Top navigation bar and 4 summary metric cards.
- Left-side input form with field validation (empty check, past-date prevention, whitespace trim).
- Dynamic JavaScript priority scoring engine (1–100 score + High/Med/Low badge + plain-English reasoning).
- Live ranked study queue sorted by Priority Score with in-place confidence editing.
- Edit and Delete (with confirmation dialog) actions.
- Collapsible Completed Topics section with Undo capability.

---

## Deferred From the POC
- **Browser `localStorage` persistence:** Running state in React memory is sufficient for the 1-minute demo and 2–4 hour build target; saving across reloads is slated for post-hackathon.
- **AI Chatbot Study Assistant:** Interactive concept explanations and automated flashcards deferred to preserve the POC boundary.
- **User Accounts and Authentication:** Multi-user sync and database login deferred to avoid backend infrastructure.

---

## Non-Goals
- Automated email or SMS reminder notifications.
- Multi-page routing or complex navigation menus.
- Server-side database configurations or external cloud storage.

---

## Open Questions
- Exact mathematical weightings for the scoring formula (e.g., points allocated per day remaining vs. weight per confidence tier). To be formalized during `4-spec`.
