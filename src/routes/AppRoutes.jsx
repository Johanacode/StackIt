import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StackItInterface from '../pages/StackItInterface';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StackItInterface />} />
      </Routes>
    </BrowserRouter>
  );
}
