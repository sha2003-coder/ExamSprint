import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TopicForm from './components/TopicForm';
import StudyQueue from './components/StudyQueue';
import CompletedArchive from './components/CompletedArchive';
import ConfirmModal from './components/ConfirmModal';

const STORAGE_KEY = 'examsprint_topics';

export default function App() {
  // 1. Initialize state from localStorage with safe try/catch fallback
  const [topics, setTopics] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.warn('Could not load topics from localStorage:', err);
    }
    return [];
  });

  const [editingTopic, setEditingTopic] = useState(null);
  const [topicToDelete, setTopicToDelete] = useState(null);

  // 2. Sync topics array to localStorage on any change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
    } catch (err) {
      console.error('Failed to save topics to localStorage:', err);
    }
  }, [topics]);

  const handleAddTopic = (newTopicData) => {
    const newTopic = {
      id: `topic_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
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
      <Navbar />

      <SummaryCards topics={topics} />

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
