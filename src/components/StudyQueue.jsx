import React from 'react';
import TopicCard from './TopicCard';
import { calculatePriority } from '../utils/priorityEngine';

export default function StudyQueue({ topics, onUpdateConfidence, onComplete }) {
  const activeTopics = topics.filter((t) => !t.completed);

  // Sort descending by priority score (highest score first)
  const sortedTopics = [...activeTopics].sort((a, b) => {
    const scoreA = calculatePriority(a.examDate, a.confidence).score;
    const scoreB = calculatePriority(b.examDate, b.confidence).score;
    return scoreB - scoreA;
  });

  return (
    <div className="card-panel">
      <div className="queue-header">
        <h2 className="panel-title" style={{ margin: 0 }}>
          <span>⚡</span> Live Revision Priority Queue
        </h2>
        <span className="queue-count">
          {sortedTopics.length} {sortedTopics.length === 1 ? 'topic' : 'topics'} to revise
        </span>
      </div>

      {sortedTopics.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎯</div>
          <h3 className="empty-title">Welcome to ExamSprint!</h3>
          <p className="empty-desc">
            Add your first course subject and topic on the left to calculate your personalized revision priorities.
          </p>
        </div>
      ) : (
        <div className="topic-list">
          {sortedTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onUpdateConfidence={onUpdateConfidence}
              onComplete={onComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
