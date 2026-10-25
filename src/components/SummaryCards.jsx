import React from 'react';
import { calculatePriority } from '../utils/priorityEngine';

export default function SummaryCards({ topics }) {
  const totalTopics = topics.length;
  
  const uniqueSubjects = new Set(
    topics.map((t) => t.subject.trim().toLowerCase()).filter(Boolean)
  ).size;

  const highPriorityCount = topics.filter((t) => {
    if (t.completed) return false;
    const priority = calculatePriority(t.examDate, t.confidence);
    return priority.score >= 70;
  }).length;

  const completedCount = topics.filter((t) => t.completed).length;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-header">
          <span className="summary-label">Total Subjects</span>
          <span className="summary-icon">📚</span>
        </div>
        <div className="summary-value">{uniqueSubjects}</div>
        <div className="summary-subtext">Active courses tracked</div>
      </div>

      <div className="summary-card">
        <div className="summary-header">
          <span className="summary-label">Total Topics</span>
          <span className="summary-icon">📝</span>
        </div>
        <div className="summary-value">{totalTopics}</div>
        <div className="summary-subtext">Across all subjects</div>
      </div>

      <div className="summary-card highlight-high">
        <div className="summary-header">
          <span className="summary-label">High Priority</span>
          <span className="summary-icon">🔥</span>
        </div>
        <div className="summary-value" style={{ color: 'var(--priority-high)' }}>
          {highPriorityCount}
        </div>
        <div className="summary-subtext">Urgent revision needed</div>
      </div>

      <div className="summary-card highlight-completed">
        <div className="summary-header">
          <span className="summary-label">Completed</span>
          <span className="summary-icon">✅</span>
        </div>
        <div className="summary-value" style={{ color: 'var(--priority-low)' }}>
          {completedCount}
        </div>
        <div className="summary-subtext">
          {totalTopics > 0 ? `${Math.round((completedCount / totalTopics) * 100)}% progress` : '0% progress'}
        </div>
      </div>
    </div>
  );
}
