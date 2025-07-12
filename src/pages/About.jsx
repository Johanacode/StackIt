import React from 'react';

const About = () => (
    <div style={{ minHeight: '100vh', background: '#06202b', color: '#7ae2cf', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#1a2e37', padding: '2rem', borderRadius: 12, minWidth: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ marginBottom: '1rem' }}>About StackIt</h2>
            <p>StackIt is a minimal Q&amp;A forum platform for developers and learners. Post questions, share answers, and collaborate with the community.</p>
        </div>
    </div>
);

export default About;
