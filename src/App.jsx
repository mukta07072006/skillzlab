import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Home from '@/pages/Home';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import About from '@/pages/About';
import SuccessStories from '@/pages/SuccessStories';
import JoinNow from '@/pages/JoinNow';
import Contact from '@/pages/Contact';
import Login from '@/pages/LogIn'; // Add this import
import Signup from '@/pages/SignUp'; // Add this import
import Profile from '@/pages/Profile'; // Add this import
import ProtectedRoute from '@/components/ProtectedRoute'; // Recommended for auth protection
import EnrollForm from '@/pages/EnrollForm';
import Admin from '@/pages/Admin';
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/join-now" element={<JoinNow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/enroll/:courseId" element={<EnrollForm />} />
            <Route path="/admin" element={<Admin />} />

            {/* Protected Routes (require authentication) */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* Add more protected routes as needed */}
            {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} */}
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;