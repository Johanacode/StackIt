import { Routes, Route } from 'react-router-dom';
import StackItInterface from '../pages/StackItInterface';
import StackItUploadPage from '../pages/add';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<StackItInterface />} />
            <Route path="/add" element={<StackItUploadPage />} />
        </Routes>
    );
}
