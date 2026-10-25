import React from 'react';
import { calculatePriority } from '../utils/priorityEngine';

export default function TopicCard({ topic, onUpdateConfidence, onComplete, onEdit, onDelete }) {
  const priority = calculatePriority(topic.examDate, topic.confidence);

  return (
    <div className="topic-card">
      <div className="card-top">
        <div>
          <span className="subject-badge">{topic.subject}</span>
          <h3 className="topic-title">{topic.topic}</h3>
        </div>
        <div className={`priority-pill ${priority.badgeClass}`}>
          <span>{priority.tier}</span>
          {priority.score > 0 && <span>• {priority.score}/100</span>}
        </div>
      </div>

      <div className="card-reason">
        {priority.explanation}
      </div>

      <div className="card-meta">
        <div className="meta-item">
          <span>📅</span>
          <span>{topic.examDate}</span>
          <span style={{ color: priority.daysRemaining <= 2 ? 'var(--priority-high)' : 'var(--text-muted)' }}>
            ({priority.daysRemaining < 0
              ? 'Past due'
              : priority.daysRemaining === 0
              ? 'Today'
              : priority.daysRemaining === 1
              ? '1 day left'
              : `${priority.daysRemaining} days left`})
          </span>
        </div>

        <div className="meta-item">
          <label htmlFor={`conf-${topic.id}`} style={{ marginRight: '0.25rem', fontSize: '0.8rem' }}>🎯 Confidence:</label>
          <select
            id={`conf-${topic.id}`}
            className="confidence-selector"
            value={topic.confidence}
            onChange={(e) => onUpdateConfidence(topic.id, e.target.value)}
            title="Change confidence to recalculate priority immediately"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {onEdit && (
            <button
              onClick={() => onEdit(topic)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-cyan)',
                padding: '0.3rem 0.55rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
              title="Edit topic details"
            >
              ✏️
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(topic)}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--priority-high)',
                padding: '0.3rem 0.55rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
              title="Delete topic"
            >
              🗑️
            </button>
          )}

          {onComplete && (
            <button
              className="btn-complete"
              onClick={() => onComplete(topic.id)}
              title="Mark as completed"
            >
              ✓ Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
