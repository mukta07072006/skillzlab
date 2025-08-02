import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useState } from 'react';

export default function EnrollForm() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const courseDetails = {
    'creative-design': { name: 'Graphics Design', price: 399 },
    'video-editing': { name: 'Video Editing', price: 499 },
    'web-development': { name: 'Web Development', price: 699 },
  };

  const course = courseDetails[courseId];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    transactionId: '',
    paymentMethod: 'bKash',
  });

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const validateCoupon = async () => {
    if (!couponCode) return;

    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.trim())
      .eq('is_active', true)
      .single();

    if (data && !error) {
      setDiscount(data.discount_percent);
      setCouponStatus('success');
    } else {
      setDiscount(0);
      setCouponStatus('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setMessage("You must be logged in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('pending_enrollments').insert([
      {
        user_id: user.id,
        course_id: courseId,
        name: formData.name,
        phone: formData.phone,
        payment_method: formData.paymentMethod,
        transaction_id: formData.transactionId,
        status: 'pending',
        coupon_code: couponCode || null,
      },
    ]);

    if (!error) {
      setMessage("✅ Enrollment submitted successfully!");
      setTimeout(() => navigate('/profile'), 1500);
    } else {
      setMessage("❌ Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  if (!course) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-red-600 font-semibold text-xl">
        Invalid course selected.
      </div>
    );
  }

  const discountedPrice = Math.round(course.price * (1 - discount / 100));

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-2xl mt-10 border border-[#2a74ff]/20 animate-fade-in">
      <h2 className=" text-center text-4xl font-semibold text-gray-800 tracking-tight mb-1">
        Enroll Now in
      </h2>

      <div className="mb-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-[#2a74ff] mb-2 animate-pulse-slow">
          {course.name}
        </h3>
        <div className="inline-flex items-center justify-center mt-2 bg-yellow-100 border border-yellow-300 text-yellow-700 font-semibold px-4 py-1.5 rounded-full shadow-sm">
          💰 Course Price:
          <span className="ml-2 text-[#2a74ff] font-bold line-through">
            ৳{course.price}
          </span>
          {discount > 0 && (
            <span className="ml-2 text-green-600 font-bold">
              ৳{discountedPrice}
            </span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Full Name"
          value={formData.name}
          onChange={(val) => setFormData({ ...formData, name: val })}
        />

        <InputField
          label="Phone Number"
          value={formData.phone}
          type="tel"
          onChange={(val) => setFormData({ ...formData, phone: val })}
        />

        <div className="flex items-center space-x-2">
          <InputField
            label="Coupon Code"
            value={couponCode}
            onChange={setCouponCode}
          />
          <button
            type="button"
            onClick={validateCoupon}
            className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
          >
            Apply
          </button>
        </div>
        {couponStatus === 'success' && (
          <p className="text-sm text-green-600 mt-1">✅ Coupon applied! {discount}% discount.</p>
        )}
        {couponStatus === 'error' && (
          <p className="text-sm text-red-600 mt-1">❌ Invalid or expired coupon.</p>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Payment Method</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            value={formData.paymentMethod}
            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
          >
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
            <option value="Bank">Bank Transfer</option>
          </select>
        </div>

        <InputField
          label="Transaction ID"
          value={formData.transactionId}
          onChange={(val) => setFormData({ ...formData, transactionId: val })}
        />

        <div className="bg-[#2a74ff]/10 p-4 rounded-md border border-[#2a74ff]/30 text-sm">
          <h3 className="font-semibold mb-2 text-[#2a74ff]">📌 Payment Instructions</h3>
          <p>Send <strong className="text-yellow-500">৳{discount > 0 ? discountedPrice : course.price}</strong> to:</p>
          <p><strong>bKash:</strong> 01813311034</p>
          <p><strong>Nagad:</strong> 01877538505</p>
          <p>Use this course code in the reference/message: <strong>{courseId}</strong></p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-semibold transition-all duration-300 shadow-md ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#2a74ff] hover:bg-yellow-400 hover:text-black'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Enrollment'}
        </button>
      </form>

      {message && (
        <p className="mt-5 text-center text-md font-medium text-green-600 animate-pulse">{message}</p>
      )}
    </div>
  );
}

// Reusable Input Field
function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div className="group w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a74ff] transition duration-200 group-hover:shadow-md"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
