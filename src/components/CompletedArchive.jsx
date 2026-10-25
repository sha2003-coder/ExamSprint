import React, { useState } from 'react';

export default function CompletedArchive({ completedTopics, onRestoreTopic, onDeleteTopic }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!completedTopics || completedTopics.length === 0) {
    return null;
  }

  return (
    <div className="card-panel" style={{ marginTop: '2rem' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <h2 className="panel-title" style={{ margin: 0 }}>
          <span>🎉</span> Completed Topics ({completedTopics.length})
        </h2>
        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          {isOpen ? '▲ Collapse' : '▼ Expand'}
        </span>
      </div>

      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
          {completedTopics.map((topic) => (
            <div
              key={topic.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1rem',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                opacity: 0.8
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--priority-low)', fontSize: '1.2rem', fontWeight: 'bold' }}>✓</span>
                <div>
                  <span className="subject-badge" style={{ opacity: 0.7 }}>{topic.subject}</span>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    textDecoration: 'line-through',
                    color: 'var(--text-muted)'
                  }}>
                    {topic.topic}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={() => onRestoreTopic(topic.id)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--accent-purple)',
                    color: 'var(--accent-purple)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  title="Restore topic to active priority queue"
                >
                  ↩ Undo
                </button>

                <button
                  onClick={() => onDeleteTopic(topic)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--priority-high)',
                    padding: '0.35rem 0.55rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                  title="Permanently delete topic"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
