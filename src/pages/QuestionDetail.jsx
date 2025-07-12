import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS, EMOJI_CATEGORIES, formatMarkdown, insertEmoji } from '../utils/mockData';
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
    const [showCommentPreview, setShowCommentPreview] = useState(false);
    const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false);
    const [selectedCommentEmojiCategory, setSelectedCommentEmojiCategory] = useState('smileys');
    const commentTextAreaRef = useRef(null);

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

    // Rich text editor functions for comments
    const handleCommentFormat = (command) => {
        const result = formatMarkdown(newComment, command);
        if (result) {
            setNewComment(commentTextAreaRef.current.value);
            setTimeout(() => {
                commentTextAreaRef.current.focus();
                commentTextAreaRef.current.setSelectionRange(result.start, result.end);
            }, 0);
        }
    };

    const handleCommentEmojiInsert = (emoji) => {
        insertEmoji(emoji, commentTextAreaRef, (prev) => setNewComment(prev.content || newComment + emoji));
        setShowCommentEmojiPicker(false);
    };

    // Click outside handler for emoji picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCommentEmojiPicker && !event.target.closest('.emoji-picker-container')) {
                setShowCommentEmojiPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showCommentEmojiPicker]);

    // For reply input
    const [replyInputs, setReplyInputs] = useState({});
    const handleReplyInput = (id, value) => {
        setReplyInputs({ ...replyInputs, [id]: value });
    };
    const handleReplySubmit = (id) => {
        handleAddReply(id, replyInputs[id] || '');
        setReplyInputs({ ...replyInputs, [id]: '' });
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
                        
                        {/* Enhanced Comment Input with Rich Text Editor */}
                        <div className="comment-section" style={{ marginTop: '2rem', background: '#1a2e37', borderRadius: 8, padding: '1.5rem' }}>
                            <h4 style={{ marginBottom: '1rem', color: '#7ae2cf' }}>Add Your Comment</h4>
                            
                            {/* Rich Text Toolbar */}
                            <div className="toolbar" style={{ 
                                display: 'flex', 
                                gap: '0.5rem', 
                                marginBottom: '1rem', 
                                padding: '0.5rem',
                                background: '#0f1a20',
                                borderRadius: 6,
                                flexWrap: 'wrap'
                            }}>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('bold')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: 'bold'
                                    }}
                                    title="Bold"
                                >
                                    B
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('italic')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontStyle: 'italic'
                                    }}
                                    title="Italic"
                                >
                                    I
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('strikethrough')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        textDecoration: 'line-through'
                                    }}
                                    title="Strikethrough"
                                >
                                    S
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('bullet')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Bullet List"
                                >
                                    •
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('number')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Numbered List"
                                >
                                    1.
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('align_left')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Align Left"
                                >
                                    ⬅
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('align_center')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Align Center"
                                >
                                    ↔
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('align_right')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Align Right"
                                >
                                    ➡
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('code')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Code Block"
                                >
                                    &lt;/&gt;
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('link')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Link"
                                >
                                    🔗
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => handleCommentFormat('image')}
                                    className="toolbar-button"
                                    style={{ 
                                        background: 'none', 
                                        border: '1px solid #2d3748', 
                                        color: '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Image"
                                >
                                    📷
                                </button>
                                
                                {/* Emoji Picker Button */}
                                <div className="emoji-picker-container" style={{ position: 'relative' }}>
                                    <button 
                                        type="button" 
                                        onClick={() => setShowCommentEmojiPicker(!showCommentEmojiPicker)}
                                        className="toolbar-button"
                                        style={{ 
                                            background: showCommentEmojiPicker ? '#7ae2cf' : 'none', 
                                            border: '1px solid #2d3748', 
                                            color: showCommentEmojiPicker ? '#06202b' : '#f5eed', 
                                            padding: '0.5rem',
                                            borderRadius: 4,
                                            cursor: 'pointer',
                                            fontSize: '1rem'
                                        }}
                                        title="Insert Emoji"
                                    >
                                        😊
                                    </button>
                                    
                                    {/* Comprehensive Emoji Picker */}
                                    {showCommentEmojiPicker && (
                                        <div className="emoji-picker" style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            background: '#1a2e37',
                                            border: '1px solid #2d3748',
                                            borderRadius: 8,
                                            padding: '1rem',
                                            zIndex: 1000,
                                            width: '350px',
                                            maxHeight: '400px',
                                            overflowY: 'auto',
                                            marginTop: '0.5rem',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                        }}>
                                            {/* Category tabs */}
                                            <div style={{ 
                                                display: 'flex', 
                                                gap: '0.25rem', 
                                                marginBottom: '1rem', 
                                                flexWrap: 'wrap',
                                                borderBottom: '1px solid #2d3748',
                                                paddingBottom: '0.5rem'
                                            }}>
                                                {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => (
                                                    <button
                                                        key={key}
                                                        type="button"
                                                        onClick={() => setSelectedCommentEmojiCategory(key)}
                                                        style={{
                                                            background: selectedCommentEmojiCategory === key ? '#7ae2cf' : 'transparent',
                                                            color: selectedCommentEmojiCategory === key ? '#06202b' : '#7ae2cf',
                                                            border: '1px solid #7ae2cf',
                                                            borderRadius: 4,
                                                            padding: '0.25rem 0.5rem',
                                                            fontSize: '0.75rem',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s'
                                                        }}
                                                    >
                                                        {category.name.split(' ')[0]}
                                                    </button>
                                                ))}
                                            </div>
                                            
                                            {/* Emoji grid */}
                                            <div style={{ 
                                                display: 'grid', 
                                                gridTemplateColumns: 'repeat(8, 1fr)', 
                                                gap: '0.25rem' 
                                            }}>
                                                {EMOJI_CATEGORIES[selectedCommentEmojiCategory].emojis.map((emoji, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => handleCommentEmojiInsert(emoji)}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            fontSize: '1.2rem',
                                                            cursor: 'pointer',
                                                            padding: '0.25rem',
                                                            borderRadius: 4,
                                                            transition: 'background 0.2s'
                                                        }}
                                                        onMouseEnter={(e) => e.target.style.background = 'rgba(122, 226, 207, 0.1)'}
                                                        onMouseLeave={(e) => e.target.style.background = 'none'}
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Preview Toggle */}
                                <button 
                                    type="button" 
                                    onClick={() => setShowCommentPreview(!showCommentPreview)}
                                    className="toolbar-button"
                                    style={{ 
                                        background: showCommentPreview ? '#7ae2cf' : 'none', 
                                        border: '1px solid #2d3748', 
                                        color: showCommentPreview ? '#06202b' : '#f5eed', 
                                        padding: '0.5rem',
                                        borderRadius: 4,
                                        cursor: 'pointer',
                                        fontSize: '1rem'
                                    }}
                                    title="Toggle Preview"
                                >
                                    👁
                                </button>
                            </div>
                            
                            {/* Comment Input Area */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {!showCommentPreview ? (
                                    <textarea
                                        ref={commentTextAreaRef}
                                        id="comment-content"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Write your comment here... Use the toolbar for formatting!"
                                        style={{
                                            width: '100%',
                                            minHeight: '120px',
                                            padding: '1rem',
                                            borderRadius: 6,
                                            border: '1px solid #2d3748',
                                            background: '#06202b',
                                            color: '#f5eed',
                                            fontSize: '1rem',
                                            lineHeight: '1.5',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                ) : (
                                    <div 
                                        style={{
                                            width: '100%',
                                            minHeight: '120px',
                                            padding: '1rem',
                                            borderRadius: 6,
                                            border: '1px solid #2d3748',
                                            background: '#06202b',
                                            color: '#f5eed',
                                            fontSize: '1rem',
                                            lineHeight: '1.5'
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: newComment
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/_(.*?)_/g, '<em>$1</em>')
                                                .replace(/~~(.*?)~~/g, '<del>$1</del>')
                                                .replace(/`(.*?)`/g, '<code style="background: #2d3748; padding: 0.2rem 0.4rem; border-radius: 3px;">$1</code>')
                                                .replace(/\n/g, '<br>')
                                        }}
                                    />
                                )}
                                
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <button 
                                        onClick={handleAddComment} 
                                        disabled={!newComment.trim()}
                                        style={{ 
                                            background: newComment.trim() ? '#7ae2cf' : '#2d3748', 
                                            color: newComment.trim() ? '#06202b' : '#666', 
                                            borderRadius: 6, 
                                            padding: '0.75rem 1.5rem', 
                                            fontWeight: 500, 
                                            border: 'none', 
                                            fontSize: '1rem', 
                                            cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Post Comment
                                    </button>
                                    <span style={{ fontSize: '0.875rem', color: '#888' }}>
                                        {newComment.length} characters
                                    </span>
                                </div>
                            </div>
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
