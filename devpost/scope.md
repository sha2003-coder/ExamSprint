---
doc: scope
status: approved
---

# ExamSprint

A smart, urgency-and-confidence-driven study revision planner for university students.

## The Unique Kernel
A dynamic, rule-based revision priority engine written in pure JavaScript that calculates a clear Priority Score for each topic based on days remaining until the exam and the student's confidence level (Low, Medium, High), providing plain-English explanations for why each topic is ranked where it is.

## Who It's For
University students preparing for multiple simultaneous exams who experience decision paralysis when deciding what to revise, and who find standard flat to-do lists incapable of prioritizing where their limited study time makes the biggest impact.

## The Core Loop
The student opens ExamSprint, enters subjects and topics along with exam dates and confidence ratings, instantly receives a prioritized revision queue with scores and transparent explanations, and marks topics complete or updates confidence as they study, triggering instant schedule recalculations.

## Inspiration & Identity
Focused, high-clarity academic dashboard designed to reduce exam anxiety. Clean layout with calm contrast, clear priority badges, and immediate feedback so students know their exact next move without cognitive friction.

## Why This Matters to the Learner
As a second-year Computer Science student, the learner experiences exam season pressures firsthand and wants to build a practical tool to solve this problem while mastering the end-to-end plan-first software development process.

## What "Working" Looks Like
In a 1-minute demo video:
1. The student enters courses and study topics with upcoming exam dates and self-rated confidence (Low, Medium, High).
2. ExamSprint immediately runs its scoring algorithm and renders an ordered revision list with visible scores and plain-language reasoning (e.g., "Exam in 2 days + Low confidence -> Critical Priority").
3. Updating an exam date or boosting confidence instantly recalculates the queue in real time.
4. Marking a topic completed updates revision status cleanly.

## The POC Boundary
- Adding subjects and revision topics.
- Setting exam dates and confidence levels (Low, Medium, High).
- Pure JavaScript rule-based priority scoring algorithm (deterministic, fast, zero API fees).
- Rendering topics in sorted priority order with visible score and plain-English explanation.
- Real-time recalculation upon date or confidence changes.
- Marking topics as completed.

## Later
- Saving state to browser `localStorage` across page refreshes.
- AI chatbot assistance for topic summaries and revision explanations.
- User accounts and cloud authentication for multi-device sync.

## Explicitly Cut
- Email notifications and automated reminders: Cut to avoid backend mailing infrastructure and cron schedulers, keeping the proof of concept fully achievable in a 2–4 hour active build.
