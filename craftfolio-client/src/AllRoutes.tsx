import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import BuilderPage from './pages/Builder/BuilderPage';
import ProfessionPage from './pages/Templates/ProfessionPage';
import TemplateSelectionPage from './pages/Templates/TemplateSelectionPage';
import TemplatePreviewPage from './pages/Templates/TemplatePreviewPage';
import PostBuilderPreviewPage from './pages/Builder/PostBuilderPreviewPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import SetPasswordPage from './pages/Auth/SetPasswordPage';
import ProfilePage from './pages/Profile/ProfilePage';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

export default function AllRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        
        {/* Public-only routes (redirect to profile if logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/select-profession" element={<ProfessionPage />} />
          <Route path="/templates/:professionId" element={<TemplateSelectionPage />} />
        {/* </Route> */}
      </Route>

      {/* Protected Builder Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/builder/:templateId" element={<BuilderPage />} />
        <Route path="/final-preview/:templateId" element={<PostBuilderPreviewPage />} />
      </Route>
        <Route path="/set-password" element={<SetPasswordPage />} />

      {/* Public Preview */}
      <Route path="/preview/:templateId" element={<TemplatePreviewPage />} />
    </Routes>
  );
}
