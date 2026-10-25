import { calculateDaysRemaining, calculatePriority } from '../src/utils/priorityEngine.js';

console.log('====================================================');
console.log('EXAMSPRINT AUTOMATED VERIFICATION SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    throw new Error(`Test failed: ${message}`);
  }
}

// ----------------------------------------------------
// 1. DATE CALCULATION & TIMEZONE INTEGRITY
// ----------------------------------------------------
console.log('--- 1. Testing Date Calculations ---');
const today = new Date();
const formatDate = (offsetDays) => {
  const d = new Date(today);
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

assert(calculateDaysRemaining(formatDate(0)) === 0, 'Today evaluates to 0 days remaining');
assert(calculateDaysRemaining(formatDate(1)) === 1, 'Tomorrow evaluates to 1 day remaining');
assert(calculateDaysRemaining(formatDate(5)) === 5, 'Date in 5 days evaluates to 5 days remaining');
assert(calculateDaysRemaining(formatDate(14)) === 14, 'Date in 14 days evaluates to 14 days remaining');
assert(calculateDaysRemaining(formatDate(-1)) === -1, 'Yesterday evaluates to -1 (past due)');

// ----------------------------------------------------
// 2. MATHEMATICAL SCORING ALGORITHM & EXPLANATIONS
// ----------------------------------------------------
console.log('\n--- 2. Testing Priority Scoring Weights & Explanations ---');

// Imminent exam (0-2d: 65pts) + Low confidence (30pts) = 95pts (HIGH)
const sc1 = calculatePriority(formatDate(1), 'Low');
assert(sc1.score === 95, `Expected 95 points for 1d + Low confidence, got ${sc1.score}`);
assert(sc1.tier === 'HIGH', `Expected tier HIGH, got ${sc1.tier}`);
assert(sc1.badgeClass === 'badge-high', 'Expected badge-high class');
assert(sc1.explanation.includes('Exam is tomorrow') && sc1.explanation.includes('Revise this topic first'), 'Correct plain-English reason for 1d + Low');

// Imminent exam (0-2d: 65pts) + High confidence (0pts) = 65pts (MEDIUM)
const sc2 = calculatePriority(formatDate(2), 'High');
assert(sc2.score === 65, `Expected 65 points for 2d + High confidence, got ${sc2.score}`);
assert(sc2.tier === 'MEDIUM', `Expected tier MEDIUM, got ${sc2.tier}`);

// This week exam (3-7d: 45pts) + Medium confidence (15pts) = 60pts (MEDIUM)
const sc3 = calculatePriority(formatDate(5), 'Medium');
assert(sc3.score === 60, `Expected 60 points for 5d + Medium confidence, got ${sc3.score}`);
assert(sc3.tier === 'MEDIUM', `Expected tier MEDIUM, got ${sc3.tier}`);

// Next week exam (8-14d: 25pts) + Low confidence (30pts) = 55pts (MEDIUM)
const sc4 = calculatePriority(formatDate(10), 'Low');
assert(sc4.score === 55, `Expected 55 points for 10d + Low confidence, got ${sc4.score}`);

// Distant exam (15+d: 10pts) + High confidence (0pts) = 10pts (LOW)
const sc5 = calculatePriority(formatDate(25), 'High');
assert(sc5.score === 10, `Expected 10 points for 25d + High confidence, got ${sc5.score}`);
assert(sc5.tier === 'LOW', `Expected tier LOW, got ${sc5.tier}`);
assert(sc5.badgeClass === 'badge-low', 'Expected badge-low class');

// Past due exam (days < 0) -> score 0, PAST DUE tier
const scPast = calculatePriority(formatDate(-2), 'Low');
assert(scPast.score === 0, `Expected 0 score for past due, got ${scPast.score}`);
assert(scPast.tier === 'PAST DUE', `Expected PAST DUE tier, got ${scPast.tier}`);
assert(scPast.badgeClass === 'badge-past-due', 'Expected badge-past-due class');
assert(scPast.explanation.includes('Exam date has passed'), 'Correct past due warning message');

// ----------------------------------------------------
// 3. PRIORITY SORTING & AUTO-RANKING
// ----------------------------------------------------
console.log('\n--- 3. Testing Auto-Ranking Queue Order ---');
const testTopics = [
  { id: 't1', topic: 'Calculus Integrals', examDate: formatDate(10), confidence: 'High' }, // 25 + 0 = 25
  { id: 't2', topic: 'Graph Algorithms', examDate: formatDate(1), confidence: 'Low' },   // 65 + 30 = 95
  { id: 't3', topic: 'Database Normalization', examDate: formatDate(4), confidence: 'Low' }, // 45 + 30 = 75
  { id: 't4', topic: 'OS Process Schedulers', examDate: formatDate(20), confidence: 'Medium' } // 10 + 15 = 25
];

const sorted = [...testTopics].sort((a, b) => {
  return calculatePriority(b.examDate, b.confidence).score - calculatePriority(a.examDate, a.confidence).score;
});

assert(sorted[0].id === 't2', 'Topic 2 (score 95) is ranked 1st');
assert(sorted[1].id === 't3', 'Topic 3 (score 75) is ranked 2nd');
assert(sorted[0].topic === 'Graph Algorithms', 'Most urgent topic is on top');

// ----------------------------------------------------
// 4. IN-PLACE CONFIDENCE UPDATE IMPACT
// ----------------------------------------------------
console.log('\n--- 4. Testing In-Place Confidence Updates ---');
// Change t2 from Low (95) to High (65)
const t2Updated = { ...testTopics[1], confidence: 'High' };
const reSorted = [testTopics[0], t2Updated, testTopics[2], testTopics[3]].sort((a, b) => {
  return calculatePriority(b.examDate, b.confidence).score - calculatePriority(a.examDate, a.confidence).score;
});

assert(reSorted[0].id === 't3', 'Topic 3 (score 75) is now ranked 1st after t2 confidence increased');
assert(reSorted[1].id === 't2', 'Topic 2 (score 65) dropped to 2nd position smoothly');

// ----------------------------------------------------
// 5. TOPIC LIFECYCLE: COMPLETE, UNDO, DELETE
// ----------------------------------------------------
console.log('\n--- 5. Testing Topic Lifecycle (Complete, Undo, Delete) ---');
let activeList = [...testTopics];
let completedList = [];

// Complete t2
const completedItem = activeList.find(t => t.id === 't2');
activeList = activeList.filter(t => t.id !== 't2');
completedList.push({ ...completedItem, completed: true });

assert(activeList.length === 3, 'Active list decremented to 3');
assert(completedList.length === 1 && completedList[0].id === 't2', 'Completed list has t2');

// Undo t2
const restoredItem = completedList.find(t => t.id === 't2');
completedList = completedList.filter(t => t.id !== 't2');
activeList.push({ ...restoredItem, completed: false });

assert(activeList.length === 4, 'Active list restored to 4');
assert(completedList.length === 0, 'Completed list emptied');

// Delete t4
activeList = activeList.filter(t => t.id !== 't4');
assert(activeList.length === 3, 'Active list after deletion is 3');
assert(!activeList.some(t => t.id === 't4'), 't4 successfully deleted');

// ----------------------------------------------------
// 6. DASHBOARD SUMMARY STATISTICS CALCULATIONS
// ----------------------------------------------------
console.log('\n--- 6. Testing Summary Statistics ---');
const topicsForMetrics = [
  { id: '1', subject: 'Computer Science', topic: 'A', examDate: formatDate(1), confidence: 'Low', completed: false },  // High Priority
  { id: '2', subject: 'Computer Science', topic: 'B', examDate: formatDate(5), confidence: 'Medium', completed: false }, // Med Priority
  { id: '3', subject: 'Mathematics', topic: 'C', examDate: formatDate(10), confidence: 'High', completed: true },      // Completed
  { id: '4', subject: 'Physics', topic: 'D', examDate: formatDate(2), confidence: 'Low', completed: false }            // High Priority
];

const totalSubjects = new Set(topicsForMetrics.map(t => t.subject.trim().toLowerCase())).size;
const totalTopicsCount = topicsForMetrics.length;
const completedCount = topicsForMetrics.filter(t => t.completed).length;
const highPriorityCount = topicsForMetrics.filter(t => !t.completed && calculatePriority(t.examDate, t.confidence).score >= 70).length;

assert(totalSubjects === 3, `Expected 3 subjects (CS, Math, Physics), got ${totalSubjects}`);
assert(totalTopicsCount === 4, `Expected 4 total topics, got ${totalTopicsCount}`);
assert(completedCount === 1, `Expected 1 completed topic, got ${completedCount}`);
assert(highPriorityCount === 2, `Expected 2 high priority topics, got ${highPriorityCount}`);

// ----------------------------------------------------
// 7. LOCALSTORAGE SERIALIZATION & CORRUPTION RESILIENCE
// ----------------------------------------------------
console.log('\n--- 7. Testing LocalStorage Serialization & Fallback ---');
const jsonPayload = JSON.stringify(topicsForMetrics);
const parsed = JSON.parse(jsonPayload);
assert(Array.isArray(parsed) && parsed.length === 4, 'Parsed payload matches original array');

// Corrupted JSON resilience simulation
function safeParseStorage(raw) {
  try {
    const val = JSON.parse(raw);
    if (Array.isArray(val)) return val;
  } catch (e) {
    return [];
  }
  return [];
}

assert(safeParseStorage('{ invalid json').length === 0, 'Malformed JSON returns safe fallback empty array []');
assert(safeParseStorage('null').length === 0, 'Null returns safe fallback empty array []');
assert(safeParseStorage('{"not":"an array"}').length === 0, 'Non-array returns safe fallback empty array []');

console.log('\n====================================================');
console.log(`VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED (100%)`);
console.log('====================================================\n');
