import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, formatMarkdown, generateSlug, POPULAR_TAGS, validateQuestion, EMOJI_CATEGORIES, insertEmoji } from '../utils/mockData';
import './add.css';

const StackItUploadPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        tags: ''
    });
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [tagInput, setTagInput] = useState('');
    const [tagList, setTagList] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmojiCategory, setSelectedEmojiCategory] = useState('smileys');
    const textAreaRef = useRef(null);
    const emojiPickerRef = useRef(null);

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        if (showEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEmojiPicker]);

    // Load draft on component mount
    useEffect(() => {
        // Load draft if exists
        const draft = localStorage.getItem('questionDraft');
        if (draft) {
            try {
                const data = JSON.parse(draft);
                setFormData({
                    title: data.title || '',
                    category: data.category || '',
                    content: data.content || '',
                    tags: ''
                });
                setTagList(Array.isArray(data.tags) ? data.tags : []);
                setFiles([]); // Don't auto-load files for security
            } catch (error) {
                console.error('Error loading draft:', error);
            }
        }
    }, []);

    // Improved validation using mockData utility
    const validateForm = () => validateQuestion({ ...formData, tags: tagList });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Tag management
    const handleTagInput = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            addTag(tagInput.trim());
        }
    };

    const addTag = (tag) => {
        if (tag && !tagList.includes(tag)) {
            setTagList([...tagList, tag]);
            setTagInput('');
        }
    };

    const removeTag = (tag) => {
        setTagList(tagList.filter(t => t !== tag));
    };

    const handlePopularTagClick = (tag) => {
        addTag(tag);
    };

    // File handling
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => {
            const isValidSize = file.size <= 10 * 1024 * 1024;
            if (!isValidSize) {
                alert(`File ${file.name} is too large. Maximum size is 10MB`);
            }
            return isValidSize;
        });
        setFiles(validFiles);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('drag-over');
        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(file => {
            const isValidSize = file.size <= 10 * 1024 * 1024;
            if (!isValidSize) {
                alert(`File ${file.name} is too large. Maximum size is 10MB`);
            }
            return isValidSize;
        });
        setFiles(validFiles);
    };

    // Draft save/load
    const handleSaveDraft = async () => {
        try {
            const draft = {
                ...formData,
                tags: tagList,
                files: files.map(f => f.name),
                savedAt: new Date().toISOString()
            };
            localStorage.setItem('questionDraft', JSON.stringify(draft));
            alert('Draft saved successfully!');
        } catch (error) {
            console.error('Error saving draft:', error);
            alert('Failed to save draft');
        }
    };

    // Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        console.log("Validation check:", newErrors);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            console.log("Form Data:", { ...formData, tags: tagList });
            console.warn("Form has validation errors:", newErrors);
            return;
        }

        if (tagList.length === 0) {
            setErrors(prev => ({ ...prev, tags: "Please add at least one tag" }));
            console.warn("No tags provided");
            return;
        }

        setIsSubmitting(true);
        try {
            const questionData = {
                ...formData,
                tags: tagList,
                files: files,
                slug: generateSlug(formData.title),
                createdAt: new Date().toISOString()
            };
            console.log("Submitting question:", questionData);

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Clear draft and show success
            localStorage.removeItem('questionDraft');
            alert('Question posted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error submitting question:', error);
            alert('Failed to post question. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Markdown formatting
    const formatText = (command) => {
        if (!textAreaRef.current) return;
        const formatResult = formatMarkdown(textAreaRef.current.value, command);
        if (!formatResult) return;
        const { newText, start } = formatResult;
        const textarea = textAreaRef.current;
        const text = textarea.value;
        const before = text.substring(0, textarea.selectionStart);
        const after = text.substring(textarea.selectionEnd);
        setFormData(prev => ({
            ...prev,
            content: before + newText + after
        }));
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start, start + newText.length);
        }, 0);
    };

    // Handle emoji insertion
    const handleEmojiInsert = (emoji) => {
        insertEmoji(emoji, textAreaRef, setFormData);
        setShowEmojiPicker(false);
    };

    // Markdown preview (simple)
    const renderMarkdownPreview = () => {
        // Enhanced markdown preview with support for new formatting
        let html = formData.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/_(.*?)_/g, '<em>$1</em>')
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            .replace(/`([^`]+)`/g, '<code style="background: #243642; padding: 0.2rem 0.4rem; border-radius: 3px;">$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre style="background: #243642; padding: 1rem; border-radius: 6px; overflow-x: auto;"><code>$1</code></pre>')
            .replace(/<div style="text-align: (left|center|right)">\n(.*?)\n<\/div>/g, '<div style="text-align: $1; margin: 0.5rem 0;">$2</div>')
            .replace(/\n/g, '<br>');
        return { __html: html };
    };

    return (
        <div className="upload-container">
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
                        <button className="icon-button" onClick={() => navigate('/')}
                            aria-label="Go to Home">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="ask-button" onClick={() => navigate('/add')}>Ask Question</button>
                    </div>
                </div>
            </header>
            <main className="main-content" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '2rem', width: '100%' }}>
                <aside className="sidebar" style={{ minWidth: 220, maxWidth: 260 }}>
                    <nav className="nav-menu">
                        <a href="/" className="nav-item">
                            <span className="material-symbols-outlined nav-item-icon">home</span>
                            <span>Home</span>
                        </a>
                        <a href="#" className="nav-item">
                            <span className="material-symbols-outlined nav-item-icon">public</span>
                            <span>Public</span>
                        </a>
                        <a href="/add" className="nav-item active">
                            <span className="material-symbols-outlined nav-item-icon">upload</span>
                            <span>Upload</span>
                        </a>
                        <a href="#" className="nav-item">
                            <span className="material-symbols-outlined nav-item-icon">label</span>
                            <span>Tags</span>
                        </a>
                        <a href="#" className="nav-item">
                            <span className="material-symbols-outlined nav-item-icon">group</span>
                            <span>Users</span>
                        </a>
                    </nav>
                    <div className="guidelines-box">
                        <h3 className="guidelines-title">Upload Guidelines</h3>
                        <ul className="guidelines-list">
                            <li className="guidelines-item">Be specific in your title and description</li>
                            <li className="guidelines-item">Add relevant tags to help others find your content</li>
                            <li className="guidelines-item">Format your post properly for readability</li>
                            <li className="guidelines-item">Be respectful and follow community guidelines</li>
                            <li className="guidelines-item">Review your post before submitting</li>
                        </ul>
                    </div>
                </aside>
                <section className="main-section" style={{ flex: 1, minWidth: 0 }}>
                    <div className="content-box" style={{ maxWidth: '100%', minWidth: 400, margin: '0', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', background: '#1a2e37', borderRadius: 12 }}>
                        <h2 className="content-title" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '2rem' }}>Upload Content</h2>
                        <form onSubmit={handleSubmit} className="form-content" autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="title" className="form-label" style={{ fontWeight: 500 }}>Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`form-input ${errors.title ? 'error' : ''}`}
                                    placeholder="Enter a descriptive title for your content"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    maxLength={150}
                                    required
                                    aria-invalid={!!errors.title}
                                    aria-describedby="title-error"
                                    style={{ width: '100%', fontSize: '1rem' }}
                                />
                                {errors.title && <div className="error-message" id="title-error">{errors.title}</div>}
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="category" className="form-label" style={{ fontWeight: 500 }}>Category</label>
                                <select 
                                    id="category"
                                    name="category"
                                    className={`form-input ${errors.category ? 'error' : ''}`}
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    aria-invalid={!!errors.category}
                                    aria-describedby="category-error"
                                    style={{ width: '100%', fontSize: '1rem' }}
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <div className="error-message" id="category-error">{errors.category}</div>}
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="content" className="form-label" style={{ fontWeight: 500 }}>Content</label>
                                <div className="editor-container" style={{ borderRadius: 8, overflow: 'hidden' }}>
                                    <div className="editor-toolbar" style={{ display: 'flex', gap: '0.5rem', background: '#16232e', padding: '0.5rem 0.75rem', borderRadius: '8px 8px 0 0', flexWrap: 'wrap' }}>
                                        {/* Text formatting buttons */}
                                        {['bold', 'italic', 'strikethrough'].map(cmd => (
                                            <button
                                                key={cmd}
                                                type="button"
                                                className="toolbar-button"
                                                onClick={() => formatText(cmd)}
                                                title={`Insert ${cmd}`}
                                                tabIndex={0}
                                                style={{ background: 'none', border: 'none', color: '#7ae2cf', fontSize: '1.1rem', borderRadius: 4, padding: '0.25rem 0.5rem' }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    {cmd === 'strikethrough' ? 'strikethrough_s' : `format_${cmd}`}
                                                </span>
                                            </button>
                                        ))}
                                        
                                        {/* List buttons */}
                                        {['bullet', 'number'].map(cmd => (
                                            <button
                                                key={cmd}
                                                type="button"
                                                className="toolbar-button"
                                                onClick={() => formatText(cmd)}
                                                title={`Insert ${cmd === 'bullet' ? 'bullet points' : 'numbered list'}`}
                                                tabIndex={0}
                                                style={{ background: 'none', border: 'none', color: '#7ae2cf', fontSize: '1.1rem', borderRadius: 4, padding: '0.25rem 0.5rem' }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    {cmd === 'bullet' ? 'format_list_bulleted' : 'format_list_numbered'}
                                                </span>
                                            </button>
                                        ))}
                                        
                                        {/* Text alignment buttons */}
                                        {['align_left', 'align_center', 'align_right'].map(cmd => (
                                            <button
                                                key={cmd}
                                                type="button"
                                                className="toolbar-button"
                                                onClick={() => formatText(cmd)}
                                                title={`Align ${cmd.split('_')[1]}`}
                                                tabIndex={0}
                                                style={{ background: 'none', border: 'none', color: '#7ae2cf', fontSize: '1.1rem', borderRadius: 4, padding: '0.25rem 0.5rem' }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    {cmd === 'align_left' ? 'format_align_left' : 
                                                     cmd === 'align_center' ? 'format_align_center' : 'format_align_right'}
                                                </span>
                                            </button>
                                        ))}
                                        
                                        {/* Other formatting buttons */}
                                        {['code', 'link', 'image'].map(cmd => (
                                            <button
                                                key={cmd}
                                                type="button"
                                                className="toolbar-button"
                                                onClick={() => formatText(cmd)}
                                                title={`Insert ${cmd}`}
                                                tabIndex={0}
                                                style={{ background: 'none', border: 'none', color: '#7ae2cf', fontSize: '1.1rem', borderRadius: 4, padding: '0.25rem 0.5rem' }}
                                            >
                                                <span className="material-symbols-outlined">
                                                    {cmd === 'code' ? 'code' : 
                                                     cmd === 'link' ? 'link' : 'image'}
                                                </span>
                                            </button>
                                        ))}
                                        
                                        {/* Emoji picker button */}
                                        <div style={{ position: 'relative' }} ref={emojiPickerRef}>
                                            <button
                                                type="button"
                                                className="toolbar-button"
                                                onClick={() => setShowEmojiPicker(prev => !prev)}
                                                title="Insert emoji"
                                                style={{ background: 'none', border: 'none', color: '#7ae2cf', fontSize: '1.1rem', borderRadius: 4, padding: '0.25rem 0.5rem' }}
                                            >
                                                <span className="material-symbols-outlined">sentiment_satisfied</span>
                                            </button>
                                            
                                            {/* Emoji picker dropdown */}
                                            {showEmojiPicker && (
                                                <div className="emoji-picker">
                                                    {/* Category tabs */}
                                                    <div className="emoji-category-tabs">
                                                        {Object.entries(EMOJI_CATEGORIES).map(([key, category]) => (
                                                            <button
                                                                key={key}
                                                                type="button"
                                                                className={`emoji-category-tab ${selectedEmojiCategory === key ? 'active' : ''}`}
                                                                onClick={() => setSelectedEmojiCategory(key)}
                                                            >
                                                                {category.name.split(' ')[0]}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    
                                                    {/* Emoji grid */}
                                                    <div className="emoji-grid">
                                                        {EMOJI_CATEGORIES[selectedEmojiCategory].emojis.map((emoji, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                className="emoji-button"
                                                                onClick={() => handleEmojiInsert(emoji)}
                                                                title={emoji}
                                                            >
                                                                {emoji}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Preview toggle button */}
                                        <button
                                            type="button"
                                            className="toolbar-button"
                                            onClick={() => setShowPreview(prev => !prev)}
                                            title="Toggle Markdown Preview"
                                            style={{ background: 'none', border: 'none', color: '#7ae2cf', fontSize: '1.1rem', borderRadius: 4, padding: '0.25rem 0.5rem' }}
                                        >
                                            <span className="material-symbols-outlined">visibility</span>
                                        </button>
                                    </div>
                                    <textarea
                                        ref={textAreaRef}
                                        id="content"
                                        name="content"
                                        className={`editor-content ${errors.content ? 'error' : ''}`}
                                        placeholder="Write your content here..."
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        required
                                        aria-invalid={!!errors.content}
                                        aria-describedby="content-error"
                                        style={{ minHeight: 180, fontSize: '1rem', borderRadius: '0 0 8px 8px', padding: '1rem', background: '#1a2e37', color: '#f5eed', border: 'none', width: '100%' }}
                                    />
                                </div>
                                {errors.content && <div className="error-message" id="content-error">{errors.content}</div>}
                                {showPreview && (
                                    <div className="markdown-preview" style={{ marginTop: '1rem', background: '#1a2e37', padding: '1rem', borderRadius: '6px', color: '#f5eed', border: '1px solid #2d3748' }}>
                                        <div dangerouslySetInnerHTML={renderMarkdownPreview()} />
                                    </div>
                                )}
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="tags" className="form-label" style={{ fontWeight: 500 }}>Tags</label>
                                <div className="tag-input-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        id="tags"
                                        name="tags"
                                        className={`form-input ${errors.tags ? 'error' : ''}`}
                                        placeholder="Type a tag and press Enter or Comma"
                                        value={tagInput}
                                        onChange={handleTagInput}
                                        onKeyDown={handleTagKeyDown}
                                        aria-describedby="tags-error"
                                        style={{ width: '100%', fontSize: '1rem' }}
                                    />
                                    <div className="tag-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        {tagList.map(tag => (
                                            <span className="tag-item" key={tag} style={{ background: '#7ae2cf', color: '#06202b', borderRadius: 16, padding: '0.25rem 0.75rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                {tag}
                                                <button type="button" className="remove-tag" onClick={() => removeTag(tag)} aria-label={`Remove tag ${tag}`} style={{ background: 'none', border: 'none', color: '#06202b', marginLeft: 4, fontSize: '1rem', cursor: 'pointer' }}>&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="popular-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem', alignItems: 'center' }}>
                                        <span style={{ color: '#888', fontSize: '0.85em', marginRight: 8 }}>Popular:</span>
                                        {POPULAR_TAGS.slice(0, 8).map(tagObj => (
                                            <button type="button" className="tag-suggestion" key={tagObj.name} onClick={() => handlePopularTagClick(tagObj.name)} style={{ background: '#243642', color: '#7ae2cf', border: 'none', borderRadius: 12, padding: '0.25rem 0.75rem', fontSize: '0.95em', cursor: 'pointer', fontWeight: 500 }}>
                                                {tagObj.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {errors.tags && <div className="error-message" id="tags-error">{errors.tags}</div>}
                            </div>
                            <div className="attachment-section" style={{ borderRadius: 8, border: '1px solid #2d3748', background: '#16232e', marginTop: '1rem', padding: '1rem' }}>
                                <div className="attachment-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined attachment-icon">attach_file</span>
                                    <h3 className="attachment-title" style={{ fontWeight: 500, color: '#f5eed', margin: 0 }}>Attachments</h3>
                                </div>
                                <div 
                                    className="upload-zone"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('file-input').click()}
                                    tabIndex={0}
                                    role="button"
                                    aria-label="Upload files"
                                    style={{ border: '2px dashed #7ae2cf', borderRadius: 8, padding: '1.5rem', textAlign: 'center', background: '#1a2e37', cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                    <div className="upload-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                                        <span className="material-symbols-outlined upload-icon" style={{ fontSize: '2.2rem', color: '#7ae2cf' }}>cloud_upload</span>
                                        <p className="upload-text" style={{ color: '#f5eed', margin: 0 }}>
                                            {files.length > 0 
                                                ? `${files.length} file(s) selected: ${files.map(f => f.name).join(', ')}` 
                                                : "Drag and drop files here or click to browse"
                                            }
                                        </p>
                                        <p className="upload-size" style={{ color: '#888', fontSize: '0.9em', margin: 0 }}>Max file size: 10MB</p>
                                        <input 
                                            type="file"
                                            id="file-input"
                                            className="hidden"
                                            multiple
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end', width: '100%' }}>
                                <button 
                                    type="button" 
                                    className="draft-button" 
                                    onClick={handleSaveDraft}
                                    disabled={isSubmitting}
                                    style={{ background: '#243642', color: '#7ae2cf', borderRadius: 6, padding: '0.75rem 1.5rem', fontWeight: 500, border: 'none', fontSize: '1rem', cursor: 'pointer' }}
                                >
                                    Save Draft
                                </button>
                                <button 
                                    type="submit" 
                                    className="publish-button"
                                    disabled={isSubmitting}
                                    style={{ background: '#7ae2cf', color: '#06202b', borderRadius: 6, padding: '0.75rem 1.5rem', fontWeight: 500, border: 'none', fontSize: '1rem', cursor: 'pointer' }}
                                >
                                    {isSubmitting ? 'Publishing...' : 'Publish Content'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default StackItUploadPage;
