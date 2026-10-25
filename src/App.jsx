import React, { useState } from 'react';
import TopicForm from './components/TopicForm';
import StudyQueue from './components/StudyQueue';

export default function App() {
  const [topics, setTopics] = useState([]);

  const handleAddTopic = (newTopicData) => {
    const newTopic = {
      id: `topic_${Date.now()}`,
      ...newTopicData,
      completed: false,
      createdAt: Date.now()
    };
    setTopics((prev) => [newTopic, ...prev]);
  };

  const handleUpdateConfidence = (id, newConfidence) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, confidence: newConfidence } : t))
    );
  };

  const handleCompleteTopic = (id) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="brand-title">
          <span className="brand-icon">⚡</span>
          <div>
            <h1 className="brand-name">ExamSprint</h1>
            <p className="brand-tagline">Smart Study Revision Planner for University Students</p>
          </div>
        </div>
        <div className="header-badge">
          Sprint Study Engine
        </div>
      </header>

      <main className="dashboard-grid">
        <aside className="left-panel">
          <TopicForm onAddTopic={handleAddTopic} />
        </aside>

        <section className="right-panel">
          <StudyQueue
            topics={topics}
            onUpdateConfidence={handleUpdateConfidence}
            onComplete={handleCompleteTopic}
          />
        </section>
      </main>
    </div>
  );
}
