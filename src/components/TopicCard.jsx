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
          <span>({priority.daysRemaining === 0 ? 'Today' : priority.daysRemaining === 1 ? '1 day left' : `${priority.daysRemaining} days left`})</span>
        </div>

        <div className="meta-item">
          <span>🎯 Confidence:</span>
          {onUpdateConfidence ? (
            <select
              className="confidence-selector"
              value={topic.confidence}
              onChange={(e) => onUpdateConfidence(topic.id, e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          ) : (
            <strong>{topic.confidence}</strong>
          )}
        </div>

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
  );
}
