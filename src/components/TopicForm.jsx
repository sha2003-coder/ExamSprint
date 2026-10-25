import React, { useState } from 'react';

export default function TopicForm({ onAddTopic }) {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [examDate, setExamDate] = useState('');
  const [confidence, setConfidence] = useState('Low');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !topic.trim() || !examDate) {
      setError('Please fill in all fields (subject, topic, and exam date).');
      return;
    }

    setError('');
    onAddTopic({
      subject: subject.trim(),
      topic: topic.trim(),
      examDate,
      confidence
    });

    // Reset topic title and focus for fast entry, keep subject if desired
    setTopic('');
  };

  return (
    <div className="card-panel">
      <h2 className="panel-title">
        <span>➕</span> Add Study Topic
      </h2>

      {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="subject-input">Course / Subject Name</label>
          <input
            id="subject-input"
            className="form-input"
            type="text"
            placeholder="e.g. Computer Science, Calculus"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="topic-input">Revision Topic</label>
          <input
            id="topic-input"
            className="form-input"
            type="text"
            placeholder="e.g. Graph Algorithms, Integration"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="date-input">Exam Date</label>
          <input
            id="date-input"
            className="form-input"
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confidence-input">Current Confidence Level</label>
          <select
            id="confidence-input"
            className="form-select"
            value={confidence}
            onChange={(e) => setConfidence(e.target.value)}
          >
            <option value="Low">Low (Struggling — Needs Urgent Revision)</option>
            <option value="Medium">Medium (Understands Basics — Needs Practice)</option>
            <option value="High">High (Confident — Light Revision)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Generate Priority & Add to Queue
        </button>
      </form>
    </div>
  );
}
