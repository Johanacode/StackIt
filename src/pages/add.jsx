import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, formatMarkdown, generateSlug } from '../utils/mockData';
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
    const textAreaRef = useRef(null);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }
        if (formData.tags && !formData.tags.split(',').some(tag => tag.trim())) {
            newErrors.tags = 'Please enter valid tags';
        }
        return newErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(file => {
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
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

    const handleSaveDraft = async () => {
        // Simulate saving to localStorage
        try {
            const draft = {
                ...formData,
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const formattedTags = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(Boolean);

            const questionData = {
                ...formData,
                tags: formattedTags,
                files: files,
                slug: generateSlug(formData.title),
                createdAt: new Date().toISOString()
            };

            // Clear draft after successful submission
            localStorage.removeItem('questionDraft');
            
            // Simulate successful submission
            console.log('Submitted question:', questionData);
            alert('Question posted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error submitting question:', error);
            alert('Failed to post question. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

        // Set cursor position after formatting
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start, start + newText.length);
        }, 0);
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
                        <button className="icon-button" onClick={() => navigate('/')}>
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="ask-button" onClick={() => navigate('/add')}>Ask Question</button>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <aside className="sidebar">
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

                <section className="main-section">
                    <div className="content-box">
                        <h2 className="content-title">Upload Content</h2>
                        <form onSubmit={handleSubmit} className="form-content">
                            <div className="form-group">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className={`form-input ${errors.title ? 'error' : ''}`}
                                    placeholder="Enter a descriptive title for your content"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    maxLength={150}
                                />
                                {errors.title && <div className="error-message">{errors.title}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select 
                                    id="category"
                                    name="category"
                                    className={`form-input ${errors.category ? 'error' : ''}`}
                                    value={formData.category}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.value} value={cat.value}>
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <div className="error-message">{errors.category}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content" className="form-label">Content</label>
                                <div className="editor-container">
                                    <div className="editor-toolbar">
                                        {['bold', 'italic', 'bullet', 'number', 'code', 'link', 'image'].map(cmd => (
                                            <button
                                                key={cmd}
                                                type="button"
                                                className="toolbar-button"
                                                onClick={() => formatText(cmd)}
                                                title={`Insert ${cmd}`}
                                            >
                                                <span className="material-symbols-outlined">
                                                    {cmd === 'bullet' ? 'format_list_bulleted' :
                                                     cmd === 'number' ? 'format_list_numbered' :
                                                     `format_${cmd}`}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <textarea
                                        ref={textAreaRef}
                                        id="content"
                                        name="content"
                                        className={`editor-content ${errors.content ? 'error' : ''}`}
                                        placeholder="Write your content here..."
                                        value={formData.content}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {errors.content && <div className="error-message">{errors.content}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="tags" className="form-label">Tags</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    className={`form-input ${errors.tags ? 'error' : ''}`}
                                    placeholder="Add tags separated by commas (e.g., javascript, react, node.js)"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                />
                                {errors.tags && <div className="error-message">{errors.tags}</div>}
                            </div>

                            <div className="attachment-section">
                                <div className="attachment-header">
                                    <span className="material-symbols-outlined attachment-icon">attach_file</span>
                                    <h3 className="attachment-title">Attachments</h3>
                                </div>
                                <div 
                                    className="upload-zone"
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('file-input').click()}
                                >
                                    <div className="upload-content">
                                        <span className="material-symbols-outlined upload-icon">cloud_upload</span>
                                        <p className="upload-text">
                                            {files.length > 0 
                                                ? `${files.length} file(s) selected: ${files.map(f => f.name).join(', ')}` 
                                                : "Drag and drop files here or click to browse"
                                            }
                                        </p>
                                        <p className="upload-size">Max file size: 10MB</p>
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

                            <div className="form-actions">
                                <button 
                                    type="button" 
                                    className="draft-button" 
                                    onClick={handleSaveDraft}
                                    disabled={isSubmitting}
                                >
                                    Save Draft
                                </button>
                                <button 
                                    type="submit" 
                                    className="publish-button"
                                    disabled={isSubmitting}
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