import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAssessments from "./pages/student/StudentAssessments";
import TakeExam from "./pages/student/TakeExam";
import StudentCertificates from "./pages/student/StudentCertificates";
import CreateExam from "./pages/teacher/CreateExam";
import Leaderboard from "./pages/Leaderboard";
import Notes from "./pages/Notes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/teachers" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/students" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/notes" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="/admin/leaderboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Leaderboard />
              </ProtectedRoute>
            } />
            
            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            <Route path="/teacher/exams" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } />
            <Route path="/teacher/create-exam" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <CreateExam />
              </ProtectedRoute>
            } />
            <Route path="/teacher/notes" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="/teacher/leaderboard" element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <Leaderboard />
              </ProtectedRoute>
            } />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/assessments" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentAssessments />
              </ProtectedRoute>
            } />
            <Route path="/student/exam/:examId" element={
              <ProtectedRoute allowedRoles={['student']}>
                <TakeExam />
              </ProtectedRoute>
            } />
            <Route path="/student/certificates" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentCertificates />
              </ProtectedRoute>
            } />
            <Route path="/student/notes" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="/student/leaderboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <Leaderboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
