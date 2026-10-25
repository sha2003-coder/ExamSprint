/**
 * Priority Scoring Engine for ExamSprint
 * Implements pure client-side mathematical scoring based on exam urgency and student confidence.
 */

export function calculateDaysRemaining(examDateStr) {
  if (!examDateStr) return 0;
  const [year, month, day] = examDateStr.split('-').map(Number);
  const examDate = new Date(year, month - 1, day);
  examDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = examDate.getTime() - today.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export function calculatePriority(examDateStr, confidence) {
  const days = calculateDaysRemaining(examDateStr);

  // Handle past due exam dates
  if (days < 0) {
    return {
      daysRemaining: days,
      score: 0,
      tier: 'PAST DUE',
      badgeClass: 'badge-past-due',
      explanation: 'Exam date has passed. Please update date or mark complete.'
    };
  }

  // 1. Urgency Points (Max 65)
  let urgencyPoints = 10;
  if (days <= 2) {
    urgencyPoints = 65;
  } else if (days <= 7) {
    urgencyPoints = 45;
  } else if (days <= 14) {
    urgencyPoints = 25;
  }

  // 2. Confidence Points (Max 30)
  let confidencePoints = 0;
  if (confidence === 'Low') {
    confidencePoints = 30;
  } else if (confidence === 'Medium') {
    confidencePoints = 15;
  } else if (confidence === 'High') {
    confidencePoints = 0;
  }

  const score = urgencyPoints + confidencePoints;

  // 3. Priority Tiers
  let tier = 'LOW';
  let badgeClass = 'badge-low';
  if (score >= 70) {
    tier = 'HIGH';
    badgeClass = 'badge-high';
  } else if (score >= 40) {
    tier = 'MEDIUM';
    badgeClass = 'badge-med';
  }

  // 4. Plain-English Explanation
  let dayText = days === 0 ? 'Exam is today' : days === 1 ? 'Exam is tomorrow' : `Exam in ${days} days`;
  let explanation = '';
  if (tier === 'HIGH') {
    explanation = `${dayText} and ${confidence} confidence. Revise this topic first.`;
  } else if (tier === 'MEDIUM') {
    explanation = `${dayText} with ${confidence} confidence. Review this topic soon.`;
  } else {
    explanation = `${dayText} with ${confidence} confidence. Keep fresh with light revision.`;
  }

  return {
    daysRemaining: days,
    score,
    tier,
    badgeClass,
    explanation
  };
}
