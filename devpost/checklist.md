---
doc: checklist
status: approved
---

# Build Checklist

Build mode: learn

## Slices

- [x] **1. Bootstrap app with live priority scoring queue**
  Becomes usable: A running Vite + React app styled with the dark theme where a student can enter a course, topic, exam date, and confidence level, and immediately see the topic rendered in the study queue with its calculated Priority Score (10–95), color badge (HIGH/MEDIUM/LOW), and plain-English explanation.
  Why now: Delivers the core signature kernel and bootstraps the working Vite + React application on the very first step, proving the core value immediately.
  PRD ref: `prd.md > The Core Journey` (steps 1–4), `prd.md > Features and Behavior (1. Topic Creation and Form Validation & 2. Dynamic Priority Engine & Live Queueing)`
  Spec ref: `spec.md > Components (App.jsx, TopicForm.jsx, StudyQueue.jsx, TopicCard.jsx, priorityEngine.js)`, `spec.md > Priority Scoring Algorithm & Weights`, `spec.md > Look and Feel`
  Build: Initialize the Vite + React workspace, set up `src/index.css` with dark theme variables and priority colors, implement `src/utils/priorityEngine.js` for date math and scoring (65/45/25/10 urgency + 30/15/0 confidence), build `TopicForm.jsx`, `TopicCard.jsx`, `StudyQueue.jsx`, and wire them together in `App.jsx`.
  Verify (mechanical): Start Vite development server and verify clean build with no console errors; test `priorityEngine.js` with sample urgency and confidence values to confirm exact mathematical scores (e.g., 2 days + Low confidence = 95 High, 10 days + Med confidence = 40 Med).
  Learner check: Open http://localhost:5173, enter your first exam topic with 1 day remaining and Low confidence, and verify it renders with score 95/100 and a Red HIGH badge.
  Commit: `Bootstrap app with live priority scoring queue`

- [x] **2. Add in-place confidence updates and form validation guardrails**
  Becomes usable: Students can change confidence directly on an active topic card to see the score recalculate and the queue re-sort immediately; the form actively validates required fields, trims whitespace, and rejects past exam dates with clear inline error messages while accepting today's date.
  Why now: Solves the primary interaction and edge case risks before adding secondary dashboard panels.
  PRD ref: `prd.md > Features and Behavior (1. Form Validation & 3. In-Place Card Actions)`, `prd.md > States and Boundaries (Inline Error State)`
  Spec ref: `spec.md > Components (TopicForm.jsx, TopicCard.jsx)`, `spec.md > Important Failure Modes & Defenses (3. Empty Field & 4. Previously Saved Topics)`
  Build: Add in-place confidence dropdown selector on `TopicCard.jsx` that triggers instant state re-ranking in `App.jsx`; implement inline validation error states in `TopicForm.jsx` for missing fields and past dates; add `PAST DUE` badge handling for expired dates in `priorityEngine.js`.
  Verify (mechanical): Run validation tests on empty and whitespace inputs to confirm inline errors render; test selecting a past date to confirm submission is blocked; test confidence toggle on a topic to confirm score delta and position update.
  Learner check: Try submitting a blank form to see the inline error message, pick a past date to confirm rejection, and change a topic's confidence from Low to High on its card to watch the score drop and card move down.
  Commit: `Add in-place confidence updates and form validation`

- [x] **3. Add completed archive with undo and delete confirmation modal**
  Becomes usable: Students can check off topics to move them into a collapsible "Completed Topics" archive with strikethrough styling; click "Undo" to restore them to the active queue; and edit topics or delete them safely with a confirmation dialog.
  Why now: Completes the full topic lifecycle so students have total control over their sprint tasks.
  PRD ref: `prd.md > Features and Behavior (3. In-Place Card Actions & Deleting & 4. Completed Topics Archive)`
  Spec ref: `spec.md > Components (CompletedArchive.jsx, ConfirmModal.jsx, App.jsx)`
  Build: Implement `CompletedArchive.jsx` with collapsible toggle, strikethrough styling, and "Undo" handler; implement `ConfirmModal.jsx` for safe deletion; add edit mode to `TopicForm.jsx` for modifying existing topics.
  Verify (mechanical): Verify toggling completion moves item between active queue and completed list; verify confirmation modal blocks accidental deletion and confirm removes item permanently.
  Learner check: Mark a topic completed to see it enter the collapsible archive, click Undo to restore it, and test deleting a topic to verify the confirmation prompt.
  Commit: `Add completed archive with undo and delete confirmation modal`

- [x] **4. Add summary metrics, empty state, and localStorage persistence**
  Becomes usable: Top dashboard displays 4 live metric counters (Total Subjects, Total Topics, High Priority Topics, Completed Topics); empty queue displays welcoming guidance; all topics, completions, and edits persist automatically across browser reloads via `localStorage`.
  Why now: Integrates the full single-page dashboard experience and ensures student data survives page refreshes.
  PRD ref: `prd.md > Screens and Layout (Dashboard Metric Cards & Navbar)`, `prd.md > States and Boundaries (First-Use / Empty State)`
  Spec ref: `spec.md > Components (Navbar.jsx, SummaryCards.jsx, App.jsx)`, `spec.md > Stack (Persistence)`
  Build: Implement `Navbar.jsx` with logo and title; implement `SummaryCards.jsx` computing live totals; implement friendly empty state in `StudyQueue.jsx`; add `useEffect` persistence hook in `App.jsx` with corrupted JSON try/catch fallback.
  Verify (mechanical): Verify metric calculations match array counts; verify JSON serialization to `localStorage` and reload hydration; verify responsive layout styles.
  Learner check: Look at the summary cards updating as you add/complete topics, reload the page (F5) to verify your data is still there, and resize the browser window to see the responsive layout.
  Commit: `Add summary metrics, empty state, and localStorage persistence`

## Hands-on Checkpoints

- [x] Early usable behavior explored — Slice 1 (Bootstrap & priority queue)
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: 40-test automated verification suite (`tests/verify_all.mjs`) and clean production build (`npm run build`) verified pure date calculations, 65/45/25/10 urgency and 30/15/0 confidence point weights, queue auto-ranking, in-place confidence recalculation, complete & undo lifecycle, summary metric cards, and localStorage serialization.
Route and stops: `src/components/TopicForm.jsx` (form validation & past-date defense) -> `src/utils/priorityEngine.js` (pure mathematical scoring & plain-English reasons) -> `src/App.jsx` (reactive state management & localStorage persistence).
Edit outcome: Verified all 10 feature requirements in browser and test suite with zero remaining defects.
Reflection: Documented reusable engineering takeaway: isolating business domain rules into pure JavaScript helper files enables 100% automated test coverage without needing DOM/browser mocks.
Activity mode: live app and editor

## Revisions


