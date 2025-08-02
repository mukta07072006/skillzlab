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
  Plus,
  Trash2,
  Activity,
  CreditCard,
  User,
  Bookmark,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [pendingEnrollments, setPendingEnrollments] = useState([]);
  const [approvingId, setApprovingId] = useState(null);
  const [stats, setStats] = useState({ totalPending: 0, approvedToday: 0, totalCourses: 0 });
  const [activeUsers, setActiveUsers] = useState([]);
  const [loadingActiveUsers, setLoadingActiveUsers] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [loadingCoupons, setLoadingCoupons] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount_percent: '' });

  const navigate = useNavigate();

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate('/');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !profile || profile.role !== 'admin') {
        return navigate('/');
      }

      setAuthChecking(false);
    };

    checkAdmin();
  }, [navigate]);

  // Fetch pending enrollments and stats
  useEffect(() => {
    if (authChecking) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from('pending_enrollments')
        .select('*')
        .eq('status', 'pending');

      if (!error) {
        setPendingEnrollments(data);
        setStats((prev) => ({ ...prev, totalPending: data.length }));
      }

      const { count: approvedToday } = await supabase
        .from('pending_enrollments')
        .select('*', { count: 'exact' })
        .eq('status', 'approved')
        .gte('created_at', new Date().toISOString().split('T')[0]);

      const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact' });

      setStats((prev) => ({
        ...prev,
        approvedToday: approvedToday || 0,
        totalCourses: totalCourses || 0,
      }));
    };

    fetchData();
  }, [authChecking]);

  // Fetch active logged-in users when activeTab is 'activeUsers'
  useEffect(() => {
    if (activeTab !== 'activeUsers') return;

    const fetchActiveUsers = async () => {
      setLoadingActiveUsers(true);

      const { data: sessions, error } = await supabase
        .from('sessions')
        .select('id, last_seen, user_id, user:auth.users (id, email, user_metadata)');

      if (error) {
        console.error('Error fetching sessions:', error);
        setLoadingActiveUsers(false);
        return;
      }

      const userIds = sessions.map((s) => s.user_id);
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('user_id, course_id')
        .in('user_id', userIds);

      const enrollmentsMap = enrollments?.reduce((acc, cur) => {
        if (!acc[cur.user_id]) acc[cur.user_id] = [];
        acc[cur.user_id].push(cur.course_id);
        return acc;
      }, {}) || {};

      const combined = sessions.map((session) => ({
        id: session.id,
        last_seen: session.last_seen,
        user_id: session.user_id,
        email: session.user?.email || 'No email',
        name: session.user?.user_metadata?.full_name || 'No name',
        enrolledCoursesCount: enrollmentsMap[session.user_id]?.length || 0,
      }));

      setActiveUsers(combined);
      setLoadingActiveUsers(false);
    };

    fetchActiveUsers();
  }, [activeTab]);

  // Fetch active coupons when activeTab is 'coupons'
  useEffect(() => {
    if (activeTab !== 'coupons') return;

    const fetchCoupons = async () => {
      setLoadingCoupons(true);
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!error) setCoupons(data || []);
      setLoadingCoupons(false);
    };

    fetchCoupons();
  }, [activeTab]);

  // Approve enrollment
  const confirmEnrollment = async (id) => {
    setApprovingId(id);

    const { data: pending, error: fetchError } = await supabase
      .from('pending_enrollments')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !pending) {
      alert('Error fetching enrollment');
      setApprovingId(null);
      return;
    }

    const { data: exists } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', pending.user_id)
      .eq('course_id', pending.course_id)
      .maybeSingle();

    if (exists) {
      alert('User already enrolled');
      setApprovingId(null);
      return;
    }

    await supabase.from('enrollments').insert([
      { user_id: pending.user_id, course_id: pending.course_id },
    ]);

    await supabase
      .from('pending_enrollments')
      .update({ status: 'approved' })
      .eq('id', id);

    setPendingEnrollments((prev) => prev.filter((e) => e.id !== id));
    setStats((prev) => ({ ...prev, totalPending: prev.totalPending - 1, approvedToday: prev.approvedToday + 1 }));
    setApprovingId(null);
  };

  // Reject enrollment
  const rejectEnrollment = async (id) => {
    if (!confirm('Are you sure you want to reject this enrollment?')) return;

    await supabase
      .from('pending_enrollments')
      .update({ status: 'rejected' })
      .eq('id', id);

    setPendingEnrollments((prev) => prev.filter((e) => e.id !== id));
    setStats((prev) => ({ ...prev, totalPending: prev.totalPending - 1 }));
  };

  // Add a new coupon
  const handleAddCoupon = async () => {
    const { code, discount_percent } = newCoupon;

    if (!code || !discount_percent) return alert('Fill all fields');

    const { error } = await supabase.from('coupons').insert([
      {
        code: code.trim().toUpperCase(),
        discount_percent: parseInt(discount_percent),
      },
    ]);

    if (!error) {
      setNewCoupon({ code: '', discount_percent: '' });
      // Refresh coupons list
      const { data, error: fetchError } = await supabase
        .from('coupons')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (!fetchError) setCoupons(data || []);
      setActiveTab('coupons');
    } else {
      alert('Coupon already exists or invalid');
    }
  };

  // Soft-delete coupon (deactivate)
  const deleteCoupon = async (id) => {
    if (!confirm('Delete this coupon?')) return;

    const { error } = await supabase
      .from('coupons')
      .update({ is_active: false })
      .eq('id', id);

    if (!error) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  if (authChecking) return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Admin Dashboard
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'pending', icon: <Clock className="w-4 h-4" />, label: 'Pending' },
            { id: 'activeUsers', icon: <UserCheck className="w-4 h-4" />, label: 'Active Users' },
            { id: 'stats', icon: <Activity className="w-4 h-4" />, label: 'Statistics' },
            { id: 'coupons', icon: <CreditCard className="w-4 h-4" />, label: 'Coupons' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'pending' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Pending Enrollments
                    </h2>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {stats.totalPending} pending
                    </div>
                  </div>
                  
                  {pendingEnrollments.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No pending enrollments
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pendingEnrollments.map((e) => (
                        <motion.div 
                          key={e.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-5 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Name</p>
                              <p className="font-medium">{e.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{e.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Course</p>
                              <p className="font-medium">{e.course_id}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Payment</p>
                              <p className="font-medium">{e.payment_method} - {e.transaction_id}</p>
                            </div>
                          </div>
                          <div className="flex gap-3 justify-end">
                            <button
                              onClick={() => rejectEnrollment(e.id)}
                              className="flex items-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                            <button
                              onClick={() => confirmEnrollment(e.id)}
                              disabled={approvingId === e.id}
                              className="flex items-center gap-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-70"
                            >
                              {approvingId === e.id ? (
                                <>
                                  <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full"
                                  />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  Approve
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'activeUsers' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Active Logged-in Users
                    </h2>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {activeUsers.length} active
                    </div>
                  </div>
                  
                  {loadingActiveUsers ? (
                    <div className="flex justify-center py-12">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : activeUsers.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No active users currently
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activeUsers.map((user) => (
                        <motion.div 
                          key={user.id}
                          whileHover={{ y: -2 }}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              <User className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <p className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              Last active: {new Date(user.last_seen).toLocaleString()}
                            </p>
                            <p className="flex items-center gap-2">
                              <Bookmark className="w-4 h-4 text-gray-400" />
                              Enrolled in {user.enrolledCoursesCount} courses
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'stats' && (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Statistics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500">Pending Enrollments</h3>
                        <Clock className="w-5 h-5 text-blue-400" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">{stats.totalPending}</p>
                    </div>
                    <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500">Approved Today</h3>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">{stats.approvedToday}</p>
                    </div>
                    <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-gray-500">Total Courses</h3>
                        <BookOpen className="w-5 h-5 text-purple-400" />
                      </div>
                      <p className="text-3xl font-bold text-purple-600">{stats.totalCourses}</p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'coupons' && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      Manage Coupons
                    </h2>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {coupons.length} active
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-8">
                    <h3 className="font-medium text-gray-700 mb-3">Create New Coupon</h3>
                    <div className="flex flex-col md:flex-row gap-3">
                      <input
                        type="text"
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                        placeholder="Coupon code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                      <input
                        type="number"
                        value={newCoupon.discount_percent}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discount_percent: e.target.value })}
                        placeholder="Discount %"
                        className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        min={1}
                        max={100}
                      />
                      <button
                        onClick={handleAddCoupon}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Coupon
                      </button>
                    </div>
                  </div>

                  {loadingCoupons ? (
                    <div className="flex justify-center py-12">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : coupons.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No active coupons available
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {coupons.map((coupon) => (
                        <motion.div 
                          key={coupon.id}
                          whileHover={{ y: -2 }}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center"
                        >
                          <div>
                            <p className="font-bold text-lg text-blue-600">{coupon.code}</p>
                            <p className="text-gray-600">{coupon.discount_percent}% discount</p>
                            <p className="text-xs text-gray-400">
                              Created: {new Date(coupon.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <button 
                            onClick={() => deleteCoupon(coupon.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}