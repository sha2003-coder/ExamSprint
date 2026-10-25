import React, { useState } from 'react';
import TopicForm from './components/TopicForm';
import StudyQueue from './components/StudyQueue';
import CompletedArchive from './components/CompletedArchive';
import ConfirmModal from './components/ConfirmModal';

export default function App() {
  const [topics, setTopics] = useState([]);
  const [editingTopic, setEditingTopic] = useState(null);
  const [topicToDelete, setTopicToDelete] = useState(null);

  const handleAddTopic = (newTopicData) => {
    const newTopic = {
      id: `topic_${Date.now()}`,
      ...newTopicData,
      completed: false,
      createdAt: Date.now()
    };
    setTopics((prev) => [newTopic, ...prev]);
  };

  const handleSaveEdit = (updatedTopic) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === updatedTopic.id ? updatedTopic : t))
    );
    setEditingTopic(null);
  };

  const handleCancelEdit = () => {
    setEditingTopic(null);
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

  const handleRestoreTopic = (id) => {
    setTopics((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: false } : t))
    );
  };

  const handleDeleteRequest = (topic) => {
    setTopicToDelete(topic);
  };

  const handleConfirmDelete = () => {
    if (topicToDelete) {
      setTopics((prev) => prev.filter((t) => t.id !== topicToDelete.id));
      if (editingTopic && editingTopic.id === topicToDelete.id) {
        setEditingTopic(null);
      }
      setTopicToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setTopicToDelete(null);
  };

  const completedTopics = topics.filter((t) => t.completed);

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
          <TopicForm
            key={editingTopic ? editingTopic.id : 'create-form'}
            onAddTopic={handleAddTopic}
            editingTopic={editingTopic}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
          />
        </aside>

        <section className="right-panel">
          <StudyQueue
            topics={topics}
            onUpdateConfidence={handleUpdateConfidence}
            onComplete={handleCompleteTopic}
            onEdit={(topic) => setEditingTopic(topic)}
            onDelete={handleDeleteRequest}
          />

          <CompletedArchive
            completedTopics={completedTopics}
            onRestoreTopic={handleRestoreTopic}
            onDeleteTopic={handleDeleteRequest}
          />
        </section>
      </main>

      <ConfirmModal
        topic={topicToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
