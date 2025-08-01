import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  UserCheck,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const [pendingEnrollments, setPendingEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
  const [stats, setStats] = useState({
    totalPending: 0,
    approvedToday: 0,
    totalCourses: 0,
  });
  const [activeTab, setActiveTab] = useState('pending');

  // New state for logged in users data and loading
  const [activeUsers, setActiveUsers] = useState([]);
  const [loadingActiveUsers, setLoadingActiveUsers] = useState(false);

  const navigate = useNavigate();

  // Check admin permission on mount
  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate('/');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !profile || profile.role !== 'admin') {
        navigate('/');
        return;
      }

      setAuthChecking(false);
    };

    checkAdmin();
  }, [navigate]);

  // Fetch data after permission check
  useEffect(() => {
    if (authChecking) return;

    async function fetchData() {
      // Fetch pending enrollments
      const { data, error } = await supabase
        .from('pending_enrollments')
        .select(`
          id,
          user_id,
          course_id,
          name,
          phone,
          payment_method,
          transaction_id,
          status,
          created_at
        `)
        .eq('status', 'pending');

      if (!error) {
        setPendingEnrollments(data);
        setStats(prev => ({ ...prev, totalPending: data.length }));
      }

      // Fetch stats
      const { count: approvedToday } = await supabase
        .from('pending_enrollments')
        .select('*', { count: 'exact' })
        .eq('status', 'approved')
        .gte('created_at', new Date().toISOString().split('T')[0]);

      const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact' });

      setStats(prev => ({
        ...prev,
        approvedToday: approvedToday || 0,
        totalCourses: totalCourses || 0,
      }));

      setLoading(false);
    }

    fetchData();
  }, [authChecking]);

  // Fetch active logged-in users and their enrollments when tab changes to activeUsers
  useEffect(() => {
    if (activeTab !== 'activeUsers') return;

    async function fetchActiveUsers() {
      setLoadingActiveUsers(true);

      // 1. Get sessions + user info
      const { data: sessions, error: sessionsError } = await supabase
        .from('sessions')
        .select(`
          id,
          last_seen,
          user_id,
          user:auth.users (
            id,
            email,
            user_metadata
          )
        `);

      if (sessionsError) {
        console.error('Error fetching sessions', sessionsError);
        setLoadingActiveUsers(false);
        return;
      }

      const userIds = sessions.map(s => s.user_id);

      if (userIds.length === 0) {
        setActiveUsers([]);
        setLoadingActiveUsers(false);
        return;
      }

      // 2. Fetch enrollments for those user_ids
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('user_id, course_id')
        .in('user_id', userIds);

      if (enrollmentsError) {
        console.error('Error fetching enrollments', enrollmentsError);
        setLoadingActiveUsers(false);
        return;
      }

      // 3. Map user_id to courses array
      const enrollmentsMap = enrollments.reduce((acc, cur) => {
        if (!acc[cur.user_id]) acc[cur.user_id] = [];
        acc[cur.user_id].push(cur.course_id);
        return acc;
      }, {});

      // 4. Combine sessions + user data + enrolled courses count
      const combined = sessions.map(session => ({
        id: session.id,
        last_seen: session.last_seen,
        user_id: session.user_id,
        email: session.user?.email || 'No email',
        name: session.user?.user_metadata?.full_name || 'No name',
        enrolledCoursesCount: enrollmentsMap[session.user_id]?.length || 0,
      }));

      setActiveUsers(combined);
      setLoadingActiveUsers(false);
    }

    fetchActiveUsers();
  }, [activeTab]);

  const confirmEnrollment = async (pendingId) => {
    setApprovingId(pendingId);

    try {
      // 1. Fetch pending enrollment
      const { data: pending, error: fetchError } = await supabase
        .from('pending_enrollments')
        .select('*')
        .eq('id', pendingId)
        .single();

      if (fetchError || !pending) throw new Error('Pending enrollment not found');

      // 2. Check if already enrolled
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', pending.user_id)
        .eq('course_id', pending.course_id)
        .maybeSingle();

      if (existingEnrollment) throw new Error('User is already enrolled');

      // 3. Insert confirmed enrollment
      const { error: insertError } = await supabase.from('enrollments').insert([
        {
          user_id: pending.user_id,
          course_id: pending.course_id,
        },
      ]);

      if (insertError) throw new Error('Failed to confirm enrollment');

      // 4. Update pending status
      const { error: updateError } = await supabase
        .from('pending_enrollments')
        .update({ status: 'approved' })
        .eq('id', pendingId);

      if (updateError) throw new Error('Failed to update status');

      // 5. Update UI
      setPendingEnrollments((prev) => prev.filter((enroll) => enroll.id !== pendingId));
      setStats((prev) => ({
        ...prev,
        totalPending: prev.totalPending - 1,
        approvedToday: prev.approvedToday + 1,
      }));
    } catch (error) {
      alert(error.message);
    } finally {
      setApprovingId(null);
    }
  };

  const rejectEnrollment = async (pendingId) => {
    if (!confirm('Are you sure you want to reject this enrollment?')) return;

    try {
      const { error } = await supabase
        .from('pending_enrollments')
        .update({ status: 'rejected' })
        .eq('id', pendingId);

      if (error) throw error;

      setPendingEnrollments((prev) => prev.filter((enroll) => enroll.id !== pendingId));
      setStats((prev) => ({ ...prev, totalPending: prev.totalPending - 1 }));
    } catch (error) {
      alert('Failed to reject enrollment');
    }
  };

  if (authChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-[#2a74ff] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'pending'
                    ? 'bg-[#2a74ff] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveTab('activeUsers')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'activeUsers'
                    ? 'bg-[#2a74ff] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Logged In Users
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === 'stats'
                    ? 'bg-[#2a74ff] text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Statistics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'pending' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                Pending Enrollments ({pendingEnrollments.length})
              </h2>
              {loading && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="w-4 h-4 border-2 border-[#2a74ff] border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </div>
              )}
            </div>

            {pendingEnrollments.length === 0 && !loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center"
              >
                <Users className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No pending enrollments</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  All enrollment requests have been processed.
                </p>
              </motion.div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {pendingEnrollments.map((enroll) => (
                    <motion.div
                      key={enroll.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {enroll.name || 'No name provided'}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              User ID: {enroll.user_id}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            PENDING
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <BookOpen className="flex-shrink-0 h-4 w-4 text-[#2a74ff] mr-2" />
                            <span>Course ID: {enroll.course_id}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <span>{enroll.payment_method}: {enroll.transaction_id}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <span>{enroll.phone || 'No phone provided'}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            disabled={approvingId === enroll.id}
                            onClick={() => confirmEnrollment(enroll.id)}
                            className={`flex-1 flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                              approvingId === enroll.id ? 'bg-yellow-500' : 'bg-[#2a74ff] hover:bg-[#195dc6]'
                            }`}
                          >
                            {approvingId === enroll.id ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Approving...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </>
                            )}
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => rejectEnrollment(enroll.id)}
                            className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {activeTab === 'activeUsers' && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Logged In Users ({activeUsers.length})
            </h2>

            {loadingActiveUsers ? (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <div className="w-4 h-4 border-2 border-[#2a74ff] border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            ) : activeUsers.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No users are currently logged in.</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {activeUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email: {user.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Last Seen: {new Date(user.last_seen).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
                        Enrolled Courses: {user.enrolledCoursesCount}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {activeTab === 'stats' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-[#2a74ff]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Enrollments</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalPending}</p>
                  </div>
                  <div className="p-3 rounded-full bg-[#2a74ff]/10">
                    <Clock className="h-6 w-6 text-[#2a74ff]" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Approved Today</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.approvedToday}</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-500/10">
                    <UserCheck className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Courses</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCourses}</p>
                  </div>
                  <div className="p-3 rounded-full bg-purple-500/10">
                    <BookOpen className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
