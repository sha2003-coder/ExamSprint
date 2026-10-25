import React, { useState } from 'react';
import { calculateDaysRemaining } from '../utils/priorityEngine';

export default function TopicForm({ onAddTopic, editingTopic, onCancelEdit, onSaveEdit }) {
  const [subject, setSubject] = useState(editingTopic ? editingTopic.subject : '');
  const [topic, setTopic] = useState(editingTopic ? editingTopic.topic : '');
  const [examDate, setExamDate] = useState(editingTopic ? editingTopic.examDate : '');
  const [confidence, setConfidence] = useState(editingTopic ? editingTopic.confidence : 'Low');
  const [errors, setErrors] = useState({});
  const [successToast, setSuccessToast] = useState('');

  // Format today's local date as YYYY-MM-DD for min attribute
  const todayStr = (() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  })();

  const validate = () => {
    const newErrors = {};

    if (!subject.trim()) {
      newErrors.subject = 'Please enter a course or subject name.';
    }

    if (!topic.trim()) {
      newErrors.topic = 'Please enter a revision topic name.';
    }

    if (!examDate) {
      newErrors.examDate = 'Please select an upcoming exam date.';
    } else {
      const days = calculateDaysRemaining(examDate);
      if (days < 0) {
        newErrors.examDate = 'Exam date cannot be in the past. Please select today or a future date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setErrors({});

    const topicData = {
      subject: subject.trim(),
      topic: topic.trim(),
      examDate,
      confidence
    };

    if (editingTopic && onSaveEdit) {
      onSaveEdit({ ...editingTopic, ...topicData });
      setSuccessToast('Topic updated successfully!');
    } else {
      onAddTopic(topicData);
      setTopic('');
      setSuccessToast('Topic added to priority queue!');
    }

    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div className="card-panel">
      <h2 className="panel-title">
        <span>{editingTopic ? '✏️ Edit Study Topic' : '➕ Add Study Topic'}</span>
      </h2>

      {successToast && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid #10b981',
          color: '#34d399',
          padding: '0.65rem 0.85rem',
          borderRadius: '6px',
          fontSize: '0.88rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>✓</span> {successToast}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="subject-input">
            Course / Subject Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="subject-input"
            className={`form-input ${errors.subject ? 'input-error' : ''}`}
            type="text"
            placeholder="e.g. Computer Science, Calculus"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              if (errors.subject) setErrors((prev) => ({ ...prev, subject: '' }));
            }}
          />
          {errors.subject && <span className="error-text">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="topic-input">
            Revision Topic <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="topic-input"
            className={`form-input ${errors.topic ? 'input-error' : ''}`}
            type="text"
            placeholder="e.g. Graph Algorithms, Integration"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (errors.topic) setErrors((prev) => ({ ...prev, topic: '' }));
            }}
          />
          {errors.topic && <span className="error-text">{errors.topic}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date-input">
            Exam Date <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            id="date-input"
            className={`form-input ${errors.examDate ? 'input-error' : ''}`}
            type="date"
            min={todayStr}
            value={examDate}
            onChange={(e) => {
              setExamDate(e.target.value);
              if (errors.examDate) setErrors((prev) => ({ ...prev, examDate: '' }));
            }}
          />
          {errors.examDate && <span className="error-text">{errors.examDate}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confidence-input">
            Current Confidence Level <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id="confidence-input"
            className="form-select"
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
          >
            <option value="Low">Low (Struggling — Needs Urgent Revision)</option>
            <option value="Medium">Medium (Understands Basics — Needs Practice)</option>
            <option value="High">High (Confident — Light Maintenance)</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="submit" className="btn-primary">
            {editingTopic ? 'Save Changes' : 'Generate Priority & Add to Queue'}
          </button>
          {editingTopic && (
            <button
              type="button"
              onClick={onCancelEdit}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
