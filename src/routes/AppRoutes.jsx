import { Routes, Route } from 'react-router-dom';
import StackItInterface from '../pages/StackItInterface';
import StackItUploadPage from '../pages/add';
import QuestionsList from '../pages/QuestionsList';
import QuestionDetail from '../pages/QuestionDetail';
import Tags from '../pages/Tags';
import Users from '../pages/Users';
import About from '../pages/About';
import LoginSignup from '../pages/LoginSignup';
import HamburgerNav from '../components/HamburgerNav';

const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch {
        return null;
    }
};

export default function AppRoutes() {
    const user = getUser();
    return (
        <>
            <HamburgerNav user={user} />
            <div style={{ minHeight: '100vh' }}>
                <Routes>
                    <Route path="/" element={<QuestionsList />} />
                    <Route path="/add" element={<StackItUploadPage />} />
                    <Route path="/question/:id" element={<QuestionDetail />} />
                    <Route path="/tags" element={<Tags />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<LoginSignup />} />
                    {/* Optionally, keep StackItInterface for legacy or extra page */}
                    {/* <Route path="/interface" element={<StackItInterface />} /> */}
                </Routes>
            </div>
        </>
    );
}
