import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS } from '../utils/mockData';
import './QuestionDetail.css';

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // Mock discussions/comments for demonstration
    const [discussions, setDiscussions] = useState([
        {
            id: 1,
            user: 'ReactDev',
            text: 'You can use SQL CONCAT function for that! 😊',
            upvotes: 3,
            downvotes: 0,
            replies: [],
        },
        {
            id: 2,
            user: 'NodeMaster',
            text: 'Try using JOIN and SELECT together. 👍',
            upvotes: 2,
            downvotes: 0,
            replies: [],
        },
    ]);
    const [newComment, setNewComment] = useState('');

    // (already declared above, remove duplicate)
    const question = MOCK_QUESTIONS.find(q => String(q.id) === String(id));
    if (!question) return <div style={{ padding: '2rem' }}>Question not found.</div>;

    const handleUpvote = (id) => {
        setDiscussions(discussions.map(d => d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d));
    };
    const handleDownvote = (id) => {
        setDiscussions(discussions.map(d => d.id === id ? { ...d, downvotes: d.downvotes + 1 } : d));
    };
    const handleAddComment = () => {
        if (newComment.trim()) {
            setDiscussions([
                ...discussions,
                {
                    id: Date.now(),
                    user: 'Guest',
                    text: newComment,
                    upvotes: 0,
                    downvotes: 0,
                    replies: [],
                },
            ]);
            setNewComment('');
        }
    };
    const handleAddReply = (id, replyText) => {
        if (replyText.trim()) {
            setDiscussions(discussions.map(d => d.id === id ? { ...d, replies: [...d.replies, { user: 'Guest', text: replyText }] } : d));
        }
    };

    // Find similar questions by matching tags (excluding current question)
    const similarQuestions = MOCK_QUESTIONS.filter(q =>
        q.id !== question.id && q.tags.some(tag => question.tags.includes(tag))
    ).slice(0, 5);

    // Emoji options for comments
    const emojiList = ['😊', '👍', '🎉', '😢', '😂', '🔥', '💡', '❓'];

    // For reply input
    const [replyInputs, setReplyInputs] = useState({});
    const handleReplyInput = (id, value) => {
        setReplyInputs({ ...replyInputs, [id]: value });
    };
    const handleReplySubmit = (id) => {
        handleAddReply(id, replyInputs[id] || '');
        setReplyInputs({ ...replyInputs, [id]: '' });
    };
    const handleAddEmoji = (emoji) => {
        setNewComment(newComment + emoji);
    };

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
            <main className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 0', display: 'flex', gap: '2rem' }}>
                <div style={{ flex: 2 }}>
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
                    <div className="discussions-section" style={{ marginTop: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Discussions &amp; Comments</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {discussions.map(d => (
                                <li key={d.id} style={{ background: '#1a2e37', borderRadius: 8, marginBottom: '1rem', padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 600 }}>{d.user}</span>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => handleUpvote(d.id)} style={{ background: '#7ae2cf', color: '#06202b', border: 'none', borderRadius: 12, padding: '0.2rem 0.7rem', cursor: 'pointer', fontWeight: 500 }}>
                                                ▲ {d.upvotes}
                                            </button>
                                            <button onClick={() => handleDownvote(d.id)} style={{ background: '#e26a7a', color: '#fff', border: 'none', borderRadius: 12, padding: '0.2rem 0.7rem', cursor: 'pointer', fontWeight: 500 }}>
                                                ▼ {d.downvotes}
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '0.5rem', color: '#f5eed' }}>{d.text}</div>
                                    {/* Replies */}
                                    {d.replies && d.replies.length > 0 && (
                                        <ul style={{ listStyle: 'none', paddingLeft: '1rem', marginTop: '0.5rem' }}>
                                            {d.replies.map((r, idx) => (
                                                <li key={idx} style={{ background: '#22384a', borderRadius: 8, marginBottom: '0.5rem', padding: '0.5rem', color: '#f5eed' }}>
                                                    <span style={{ fontWeight: 500 }}>{r.user}:</span> {r.text}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {/* Reply input */}
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <input
                                            type="text"
                                            value={replyInputs[d.id] || ''}
                                            onChange={e => handleReplyInput(d.id, e.target.value)}
                                            placeholder="Reply..."
                                            style={{ flex: 1, padding: '0.3rem', borderRadius: 6, border: '1px solid #2d3748', background: '#06202b', color: '#f5eed' }}
                                        />
                                        <button onClick={() => handleReplySubmit(d.id)} style={{ background: '#7ae2cf', color: '#06202b', borderRadius: 6, padding: '0.3rem 0.7rem', fontWeight: 500, border: 'none', fontSize: '0.95rem', cursor: 'pointer' }}>
                                            Reply
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                            <input
                                type="text"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #2d3748', background: '#06202b', color: '#f5eed' }}
                            />
                            <button onClick={handleAddComment} style={{ background: '#7ae2cf', color: '#06202b', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 500, border: 'none', fontSize: '1rem', cursor: 'pointer' }}>
                                Comment
                            </button>
                            {/* Emoji picker */}
                            {emojiList.map(emoji => (
                                <button key={emoji} type="button" onClick={() => handleAddEmoji(emoji)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer' }}>
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Similar questions sidebar */}
                <aside style={{ flex: 1, background: '#1a2e37', borderRadius: 8, padding: '1.5rem', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#7ae2cf' }}>Similar Questions</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {similarQuestions.length === 0 && <li style={{ color: '#f5eed' }}>No similar questions found.</li>}
                        {similarQuestions.map(q => (
                            <li key={q.id} style={{ marginBottom: '1rem' }}>
                                <a href={`/question/${q.id}`} style={{ color: '#7ae2cf', textDecoration: 'none', fontWeight: 500 }}>{q.title}</a>
                                <div style={{ fontSize: '0.9rem', color: '#f5eed', opacity: 0.7 }}>{q.tags.join(', ')}</div>
                            </li>
                        ))}
                    </ul>
                </aside>
            </main>
        </div>
    );
};

export default QuestionDetail;
