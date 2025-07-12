import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS, POPULAR_TAGS } from '../utils/mockData';
import './QuestionsList.css';

const QuestionsList = () => {
    const navigate = useNavigate();
    return (
        <div className="questions-list-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <div className="logo">
                            <span className="material-symbols-outlined">forum</span>
                        </div>
                        <div>
                            <h1 className="brand">StackIt</h1>
                            <p className="brand-description">A Minimal Q&amp;A Forum Platform</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="ask-button" onClick={() => navigate('/add')}>Ask Question</button>
                    </div>
                </div>
            </header>
            <main className="main-content" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 0' }}>
                <section className="questions-section">
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>All Questions</h2>
                    <div className="questions-list">
                        {MOCK_QUESTIONS.map(q => (
                            <div className="question-card" key={q.id} onClick={() => navigate(`/question/${q.id}`)} style={{ cursor: 'pointer' }}>
                                <h3 className="question-title">{q.title}</h3>
                                <div className="question-meta">
                                    <span className="question-tags">
                                        {q.tags.map(tag => (
                                            <span className="tag-item" key={tag}>{tag}</span>
                                        ))}
                                    </span>
                                    <span className="question-answers">Answers: {q.answers}</span>
                                </div>
                                <p className="question-desc">{q.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <aside className="sidebar" style={{ marginLeft: '2rem' }}>
                    <div className="popular-tags-box">
                        <h3>Popular Tags</h3>
                        <div className="popular-tags-list">
                            {POPULAR_TAGS.map(tagObj => (
                                <span className="tag-item" key={tagObj.name}>{tagObj.name}</span>
                            ))}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default QuestionsList;
