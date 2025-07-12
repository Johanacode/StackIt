import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_QUESTIONS, filterQuestions, searchQuestions } from '../utils/mockData';
import './StackItInterface.css';

export default function StackItInterface() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 5;
  const filters = ['Newest', 'Unanswered', 'Active', 'Votes'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setQuestions(MOCK_QUESTIONS);
      setFilteredQuestions(MOCK_QUESTIONS);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = [...questions];
    // Apply filter
    result = filterQuestions(result, selectedFilter);
    // Apply search
    result = searchQuestions(result, searchTerm);
    setFilteredQuestions(result);
    setCurrentPage(1); // Reset to first page when filter/search changes
  }, [selectedFilter, searchTerm, questions]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
    console.log('Searching for:', searchTerm);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`page-button ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  if (isLoading) {
    return (
      <div className="stackit-container">
        <div className="loading-screen">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="stackit-container">
      <header className="header">
        <div className="nav-section">
          <div className="top-bar">
            <h1 className="brand">StackIt</h1>
            <button className="login-button">Login</button>
          </div>

          <div className="nav-bar">
            <div className="nav-buttons">
              <button 
                className="ask-question-button"
                onClick={() => navigate('/add')}
              >
                Ask New Question
              </button>
              
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`filter-button ${selectedFilter === filter ? 'active' : ''}`}
                >
                  {filter}
                </button>
              ))}
              
              <button className="more-button">
                <span>more</span>
                <ChevronDown size={16} />
              </button>
            </div>

            <form className="search-container" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <Search size={18} className="search-icon" />
            </form>
          </div>

          <div className="section-labels">
            <div className="screen-label">Screen 1</div>
            <div className="page-label">Home Page</div>
            <div className="info-text">User can see questions without login</div>
            <div className="info-text">Filters</div>
          </div>
        </div>
      </header>

      <main className="questions-container">
        <div className="questions-grid">
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question) => (
              <article 
                key={question.id} 
                className="question-card"
                onClick={() => navigate(`/question/${question.id}`)}
              >
                <div className="question-header">
                  <h3 className="question-title">{question.title}</h3>
                  <span className="time-ago">{question.timeAgo}</span>
                </div>
                
                <p className="question-description">{question.description}</p>
                
                <div className="question-footer">
                  <div className="tags-container">
                    {question.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="tag"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchTerm(tag);
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="username">{question.username}</span>
                  </div>
                  
                  <div className="answers-count">
                    {question.answers} answers
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="no-results">
              No questions found matching your criteria
            </div>
          )}
        </div>

        {filteredQuestions.length > itemsPerPage && (
          <div className="pagination-container">
            <div className="pagination">
              <button 
                className="page-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={18} />
              </button>
              
              {renderPaginationButtons()}
              
              <button 
                className="page-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="pagination-label">Pagination</div>
          </div>
        )}
      </main>
    </div>
  );
}