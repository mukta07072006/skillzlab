// src/pages/Profile.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [manualCourses, setManualCourses] = useState([]);
  const navigate = useNavigate();

  // Mock data - replace with your actual course data
  const availableCourses = {
    'creative-design': {
      id: 'creative-design',
      title: 'Creative Design using Phone',
      description: 'Master Canva, Pixellab, Picsart & PSCC',
      thumbnail: '/poster1.jpg',
      duration: '6 weeks',
      level: 'Beginner to Advanced'
    },
    'web-development': {
      id: 'web-development',
      title: 'Web Development with AI',
      description: 'Build websites using AI tools',
      thumbnail: '/poster2.jpg',
      duration: '8 weeks',
      level: 'Beginner Friendly'
    },
    'video-editing': {
      id: 'video-editing',
      title: 'Basic to Advanced Video Editing',
      description: 'Master video editing on mobile',
      thumbnail: '/poster3.jpg',
      duration: '8 weeks',
      level: 'Intermediate'
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Get current user
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          navigate('/login');
          return;
        }

        // 2. Get profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        setProfile(profile);

      // 3. Load manual enrollments (replace with your actual data loading)
const userCourses = JSON.parse(localStorage.getItem('userCourses') || []);
const enrolledCourses = userCourses
  .filter(course => course.userId === user.id)
  .map(course => ({
    ...course,
    courseData: availableCourses[course.courseId]
  }));

setManualCourses(enrolledCourses);
        
      } catch (error) {
        toast({
          title: "Error loading profile",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Error loading profile</div>;

  return (
    <div className="profile-page">
      <h1>Welcome, {profile.username || profile.email}!</h1>
      
      <div className="profile-details">
        <h2>Your Info</h2>
        <p>Email: {profile.email}</p>
        {profile.full_name && <p>Name: {profile.full_name}</p>}
      </div>

      <div className="enrolled-courses">
        <h2>Your Courses</h2>
        {manualCourses.length > 0 ? (
          <div className="course-grid">
            {manualCourses.map((enrollment, index) => (
              <div key={index} className="course-card">
                <img 
                  src={enrollment.courseData.thumbnail} 
                  alt={enrollment.courseData.title}
                />
                <h3>{enrollment.courseData.title}</h3>
                <p>{enrollment.courseData.description}</p>
                <p>Status: {enrollment.paymentStatus || 'Pending'}</p>
                <p>Enrolled on: {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-courses">
            <p>You haven't enrolled in any courses yet.</p>
            <button onClick={() => navigate('/courses')}>
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}