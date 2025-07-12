import React from 'react';
import { POPULAR_TAGS } from '../utils/mockData';

const Tags = () => (
    <div style={{ minHeight: '100vh', background: '#06202b', color: '#7ae2cf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#1a2e37', padding: '2rem', borderRadius: 12, minWidth: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '1rem' }}>Popular Tags</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {POPULAR_TAGS.map(tagObj => (
                    <span key={tagObj.name} style={{ background: '#7ae2cf', color: '#06202b', borderRadius: 12, padding: '0.25rem 0.75rem', fontWeight: 500 }}>{tagObj.name}</span>
                ))}
            </div>
        </div>
    </div>
);

export default Tags;
