import React, { useState } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StackItInterface() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('Newest');
  const [searchTerm, setSearchTerm] = useState('');

  const questions = [
    {
      title: "How to join 2 columns in a data set to make a separate column in SQL",
      description: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine ...",
      username: "User Name",
      tags: ["Tags", "Tags"],
      timeAgo: "5 ans",
      answers: 0
    },
    {
      title: "Question.....",
      description: "Descriptions.....",
      username: "User Name",
      tags: ["Tags", "Tags"],
      timeAgo: "3 ans",
      answers: 0
    },
    {
      title: "Question.....",
      description: "Descriptions.....",
      username: "User Name",
      tags: ["Tags", "Tags"],
      timeAgo: "2 ans",
      answers: 0
    }
  ];

  const filters = ['Newest', 'Unanswered', 'Active', 'Votes'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#06202B' }}>
      {/* Header */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#F5EEDD' }}>
            StackIt
          </h1>
          <button 
            className="px-6 py-2 rounded-full border-2 text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ 
              borderColor: '#7AE2CF',
              color: '#7AE2CF'
            }}
          >
            Login
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            className="px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ 
              backgroundColor: '#077A7D',
              color: '#F5EEDD'
            }}
          >
            Ask New Question
          </button>
          
          <div className="flex items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedFilter === filter 
                    ? 'opacity-100' 
                    : 'opacity-70 hover:opacity-90'
                }`}
                style={{ 
                  backgroundColor: selectedFilter === filter ? '#077A7D' : 'transparent',
                  color: '#F5EEDD',
                  border: selectedFilter === filter ? 'none' : `1px solid #7AE2CF`
                }}
              >
                {filter}
              </button>
            ))}
            
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm opacity-70 hover:opacity-90 transition-opacity">
              <span style={{ color: '#F5EEDD' }}>more</span>
              <ChevronDown size={16} style={{ color: '#F5EEDD' }} />
            </button>
          </div>

          <div className="ml-auto relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 rounded-lg border text-sm w-64 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                backgroundColor: '#F5EEDD',
                borderColor: '#7AE2CF',
                color: '#06202B'
              }}
            />
            <Search 
              size={18} 
              className="absolute right-3 top-2.5 opacity-60"
              style={{ color: '#06202B' }}
            />
          </div>
        </div>

        {/* Screen 1 Home Page Label */}
        <div className="text-lg font-medium mb-4" style={{ color: '#F5EEDD' }}>
          Screen 1
        </div>
        <div className="text-base mb-4" style={{ color: '#7AE2CF' }}>
          Home Page
        </div>
        
        {/* User can see questions without login note */}
        <div className="text-sm mb-4 opacity-80" style={{ color: '#F5EEDD' }}>
          User can see questions without login
        </div>
        
        {/* Filters label */}
        <div className="text-sm mb-6 opacity-80" style={{ color: '#F5EEDD' }}>
          Filters
        </div>
      </div>

      {/* Questions List */}
      <div className="p-6">
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border hover:opacity-90 transition-opacity cursor-pointer"
              style={{ 
                backgroundColor: '#077A7D',
                borderColor: '#7AE2CF'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-medium pr-4" style={{ color: '#F5EEDD' }}>
                  {question.title}
                </h3>
                <div className="flex items-center gap-2 text-sm shrink-0">
                  <span style={{ color: '#F5EEDD' }}>{question.timeAgo}</span>
                </div>
              </div>
              
              <p className="text-sm mb-3 opacity-90" style={{ color: '#F5EEDD' }}>
                {question.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    {question.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 rounded text-xs border"
                        style={{ 
                          backgroundColor: 'transparent',
                          borderColor: '#7AE2CF',
                          color: '#7AE2CF'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm opacity-80" style={{ color: '#F5EEDD' }}>
                    {question.username}
                  </span>
                </div>
                
                <div className="text-sm" style={{ color: '#7AE2CF' }}>
                  {question.answers} answers
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button 
            className="p-2 rounded hover:opacity-80 transition-opacity"
            style={{ color: '#7AE2CF' }}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft size={18} />
          </button>
          
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                currentPage === page 
                  ? 'opacity-100' 
                  : 'opacity-70 hover:opacity-90'
              }`}
              style={{ 
                backgroundColor: currentPage === page ? '#7AE2CF' : 'transparent',
                color: currentPage === page ? '#06202B' : '#F5EEDD'
              }}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="p-2 rounded hover:opacity-80 transition-opacity"
            style={{ color: '#7AE2CF' }}
            onClick={() => setCurrentPage(Math.min(7, currentPage + 1))}
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Pagination Label */}
        <div className="text-center text-sm mt-2 opacity-80" style={{ color: '#F5EEDD' }}>
          Pagination
        </div>
      </div>
    </div>
  );
}