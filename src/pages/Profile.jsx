// Copy & paste this full code inside your component file
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Pencil,
  UploadCloud,
  CheckCircle2,
  Twitter,
  Linkedin,
  Facebook,
  Award,
  BookOpen,
  Trophy,
  Zap,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    avatar_url: '',
    social_links: { twitter: '', linkedin: '', facebook: '' },
  });
  const [darkMode, setDarkMode] = useState(false);
  const [coursesStats, setCoursesStats] = useState({ enrolled: 0, completed: 0 });
  const [uploading, setUploading] = useState(false);
  const [userCourses, setUserCourses] = useState([]);
  const [expandedSection, setExpandedSection] = useState('stats');

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
        setForm({
          name: data.name || '',
          phone: data.phone || '',
          avatar_url: data.avatar_url || '',
          social_links: data.social_links || { twitter: '', linkedin: '', facebook: '' },
        });
      }

      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id, completed')
        .eq('user_id', user.id);

      if (enrollments) {
        setCoursesStats({
          enrolled: enrollments.length,
          completed: enrollments.filter((e) => e.completed).length,
        });
        setUserCourses(enrollments.map((e) => e.course_id));
      }

      setLoading(false);
    };

    fetchProfile();

    const stored = localStorage.getItem('darkMode');
    if (stored) setDarkMode(stored === 'true');
    else setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleUpdate = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('profiles')
      .upsert({ id: user.id, ...form }, { onConflict: 'id' });

    if (!error) {
      setProfile({ ...profile, ...form });
      setEditMode(false);
    } else {
      alert('Update failed');
    }
    setLoading(false);
  };

  const uploadAvatar = async (file) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        alert('Upload failed');
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      setForm((prev) => ({ ...prev, avatar_url: data.publicUrl }));
      setUploading(false);
    } catch (err) {
      alert('Upload error');
      setUploading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return (
     <div className="flex items-center justify-center min-h-screen gap-2">
  {[0, 1, 2].map((i) => (
    <motion.div
      key={i}
      className="w-3 h-3 bg-blue-500 rounded-full"
      initial={{ y: 0, opacity: 0.5 }}
      animate={{ y: -6, opacity: 1 }}
      transition={{
        repeat: Infinity,
        duration: 0.6,
        repeatType: 'reverse',
        delay: i * 0.15,
      }}
    />
  ))}
</div>

    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                {form.avatar_url ? (
  <img src={form.avatar_url} className="w-full h-full object-cover" />
) : (
  <img src="/avatar.jpg" className="w-full h-full object-cover" />
)}
              </div>
              {editMode && (
                <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2 p-3 bg-blue-600 text-white rounded-full cursor-pointer shadow-md">
                  <UploadCloud className="w-4 h-4" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files.length > 0) uploadAvatar(e.target.files[0]);
                    }}
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{form.name || 'Unnamed User'}</h1>
              <p className="text-gray-600 dark:text-gray-300">{form.phone || 'No phone number'}</p>
              <div className="flex justify-center md:justify-start gap-4 mt-2">
                {Object.entries(form.social_links).map(
                  ([platform, url]) =>
                    url && (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
                        {platform === 'twitter' && <Twitter className="w-5 h-5 text-blue-400" />}
                        {platform === 'linkedin' && <Linkedin className="w-5 h-5 text-blue-700" />}
                        {platform === 'facebook' && <Facebook className="w-5 h-5 text-blue-600" />}
                      </a>
                    )
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-4 py-2 rounded-full font-medium ${editMode ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500 text-white'}`}
              >
                <Pencil className="w-4 h-4 inline mr-1" />
                {editMode ? 'Editing' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {[
              { icon: BookOpen, label: 'Courses Enrolled', value: coursesStats.enrolled, color: 'bg-blue-100' },
              { icon: CheckCircle2, label: 'Courses Completed', value: coursesStats.completed, color: 'bg-green-100' },
              { icon: Trophy, label: 'Achievements', value: 2, color: 'bg-yellow-100' },
              { icon: Zap, label: 'Points', value: 42, color: 'bg-purple-100' },
            ].map((stat, i) => (
              <div key={i} className={`p-4 rounded-xl ${stat.color} text-gray-800`}>
                <stat.icon className="w-5 h-5 mb-2" />
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Courses</h2>
          {userCourses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300">You are not enrolled in any course yet.</p>
          ) : (
           <div className="grid sm:grid-cols-2 gap-6">
  {userCourses.map((courseId, index) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="p-5 rounded-xl bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 shadow-md"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Course ID: {courseId}</h3>
        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-600 dark:text-white rounded-full">
          Enrolled
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        You're actively learning this course. Keep up the great work!
      </p>

      {/* Dummy progress bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-300 dark:bg-gray-600 h-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 w-[60%] rounded-full"></div>
        </div>
        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">60% completed</p>
      </div>
    </motion.div>
  ))}
</div>

          )}
        </div>

        {/* Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Your Badges</h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Consistent Learner', icon: <Award />, color: 'bg-blue-200 text-blue-800' },
              { label: 'Homework Hero', icon: <CheckCircle2 />, color: 'bg-green-200 text-green-800' },
              { label: 'Fast Finisher', icon: <Zap />, color: 'bg-purple-200 text-purple-800' },
            ].map((badge, i) => (
              <div key={i} className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${badge.color}`}>
                {badge.icon}
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {editMode && (
          <div className="flex justify-end gap-4 mt-6">
            <button onClick={() => setEditMode(false)} className="py-2 px-4 border rounded-full">
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="py-2 px-6 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full font-semibold shadow-md"
            >
              Save Changes
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
