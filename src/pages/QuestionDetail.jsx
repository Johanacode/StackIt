import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS } from '../utils/mockData';
import './QuestionDetail.css';

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const question = MOCK_QUESTIONS.find(q => String(q.id) === String(id));
    if (!question) return <div style={{ padding: '2rem' }}>Question not found.</div>;
    return (
        <div className="question-detail-container">
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
                        <button className="back-button" onClick={() => navigate('/')}>Back to Questions</button>
                    </div>
                </div>
            </header>
            <main className="main-content" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 0' }}>
                <div className="question-detail-box">
                    <h2 className="question-title">{question.title}</h2>
                    <div className="question-meta">
                        <span className="question-tags">
                            {question.tags.map(tag => (
                                <span className="tag-item" key={tag}>{tag}</span>
                            ))}
                        </span>
                        <span className="question-answers">Answers: {question.answers}</span>
                    </div>
                    <p className="question-desc">{question.description}</p>
                </div>
            </main>
        </div>
    );
};

export default QuestionDetail;
