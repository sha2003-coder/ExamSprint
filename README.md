# ExamSprint ⚡

> **A smart, urgency-and-confidence-driven study revision planner for university students.**

🔗 **Live Website:** [https://sha2003-coder.github.io/ExamSprint/](https://sha2003-coder.github.io/ExamSprint/)

ExamSprint eliminates exam-season decision paralysis. Instead of maintaining a flat, static to-do list that treats every task equally, ExamSprint dynamically scores and re-ranks your study topics based on **exam proximity** and your self-rated **confidence level**.

---

## Key Features

- **Dynamic Priority Engine (Unique Kernel):** Pure JavaScript algorithm calculating a Priority Score (10–95) combining **Urgency Points** (up to 65) with **Confidence Points** (up to 30).
- **Transparent Reasoning:** Every card explains exactly why it is ranked where it is (e.g., *"Exam in 2 days and Low confidence. Revise this topic first."*).
- **In-Place Live Adjustments:** Change confidence directly on any active card to watch the score recalculate and the queue re-sort smoothly without page reload.
- **Completed Archive with Undo:** Mark topics complete to move them into a collapsible archive with strikethrough styling; click **↩ Undo** to restore them to the active queue.
- **Summary Metrics Dashboard:** Live counters track Total Subjects, Total Topics, High Priority Topics, and Completed Topics with percentage progress.
- **Defensive Input Validation:** Inline error alerts for blank or whitespace inputs; blocks past exam dates while accepting today's date.
- **Past-Due Exam Handling:** Automatically flags previously saved topics whose exam dates have lapsed with a `PAST DUE` warning badge.
- **Browser Persistence (`localStorage`):** Automatically saves all topics, edits, and completed states locally with safe error fallbacks.
- **Modern Responsive Dark Theme:** Styled with custom CSS variables, accessible contrast, and clean layout that scales from desktop split-view to mobile stacked layout.

---

## Priority Scoring Formula

The core scoring engine in `src/utils/priorityEngine.js` uses deterministic, client-side date math:

$$\text{Priority Score} = \text{Urgency Points} + \text{Confidence Points}$$

| Factor | Condition | Points | Rationale |
| :--- | :--- | :--- | :--- |
| **Exam Urgency** (Max 65 pts) | 0 to 2 days remaining | **65 pts** | Imminent exam — critical priority |
| | 3 to 7 days remaining | **45 pts** | Exam this week |
| | 8 to 14 days remaining | **25 pts** | Exam next week |
| | 15+ days remaining | **10 pts** | Upcoming with comfortable buffer |
| **Confidence Level** (Max 30 pts) | Low Confidence | **30 pts** | Struggling — needs urgent revision |
| | Medium Confidence | **15 pts** | Understands basics — needs practice |
| | High Confidence | **0 pts** | Well prepared — light maintenance |

- **High Priority (Red):** 70–100 points
- **Medium Priority (Orange/Yellow):** 40–69 points
- **Low Priority (Green):** 1–39 points
- **Past Due (Gray/Muted):** 0 points (`PAST DUE` badge)

---

## Technical Architecture

```
ExamSprint/
├── index.html                       # HTML5 entry point & Inter font
├── package.json                     # Vite & React dependencies
├── vite.config.js                   # Vite configuration
├── LICENSE                          # MIT License
├── README.md                        # Documentation
├── devpost/                         # Plan-first development artifacts
│   ├── scope.md & scope.html        # Approved Project Scope
│   ├── prd.md & prd.html            # Approved Product Requirements Document
│   ├── spec.md & spec.html          # Approved Technical Specification
│   ├── checklist.md                 # Working build slices & verification checklist
│   └── app-map.html                 # Architecture tour & code map
├── src/
│   ├── main.jsx                     # React DOM entry point
│   ├── App.jsx                      # Root state coordinator & localStorage sync
│   ├── index.css                    # CSS variables & dark design system
│   ├── components/
│   │   ├── Navbar.jsx               # Header branding
│   │   ├── SummaryCards.jsx         # 4 live metric counters
│   │   ├── TopicForm.jsx            # Form input & inline validation
│   │   ├── StudyQueue.jsx           # Live sorted priority queue & empty state
│   │   ├── TopicCard.jsx            # Individual topic card & in-place controls
│   │   ├── CompletedArchive.jsx     # Collapsible completed topics list with Undo
│   │   └── ConfirmModal.jsx         # Accessible delete confirmation dialog
│   └── utils/
│       └── priorityEngine.js        # Pure JS scoring algorithm & date arithmetic
└── tests/
    └── verify_all.mjs               # 40-test automated verification suite
```

---

## Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or newer recommended)
- Modern web browser (Chrome, Edge, Firefox, Safari)

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/ExamSprint.git
   cd ExamSprint
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` (or the port displayed in your terminal).

4. **Compile production bundle:**
   ```bash
   npm run build
   ```

---

## Automated Verification Suite

ExamSprint includes a comprehensive 40-test automated verification suite covering date arithmetic, mathematical weighting, queue auto-sorting, in-place confidence delta calculations, topic lifecycle, summary metrics, and storage corruption resilience:

```bash
node tests/verify_all.mjs
```

**Result:**
```
====================================================
VERIFICATION COMPLETE: 40/40 TESTS PASSED (100%)
====================================================
```

---

## Development Process

This project was built following the **Devpost Learn: Build With AI** plan-first framework:
1. **[Scope](devpost/scope.md):** Defined the user problem, distinctive kernel, and proof-of-concept boundaries.
2. **[PRD](devpost/prd.md):** Specified user journeys, screen layouts, validation rules, and acceptance criteria.
3. **[Spec](devpost/spec.md):** Designed the React component hierarchy, mathematical scoring weights, and data flow.
4. **[Build](devpost/checklist.md):** Implemented in 4 verified end-to-end working slices with zero technical debt.
5. **[App Map](devpost/app-map.html):** Documented architecture lifecycle and extension guide.

---

## License

This project is licensed under the [MIT License](LICENSE).

## 🎬 Project Demo

Watch the ExamSprint demonstration:



[Watch Demo Video] (https://youtu.be/84w0epMjptM).

## 🌐 Live Application

[Open ExamSprint](https://sha2003-coder.github.io/ExamSprint/)
