import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Layers, 
  Zap, 
  CheckCircle2, 
  XCircle,
  BarChart,
  MousePointerClick,
  ArrowRight,
  MessageCircle,
  X,
  Loader2
} from 'lucide-react';

const SkillzLabLanding = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // সিস্টেম ফন্ট ফ্যামিলি
  const systemFont = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  };

  // ফর্ম সাবমিশন হ্যান্ডলার (AJAX/Fetch)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/mykdkwbz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        e.target.reset(); // ফর্ম ক্লিয়ার করা
        // ৩ সেকেন্ড পর মডাল অটো বন্ধ হবে
        setTimeout(() => {
          setIsSuccess(false);
          setIsFormOpen(false);
        }, 3000);
      } else {
        alert("দুঃখিত, কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (error) {
      alert("ইন্টারনেট সংযোগ চেক করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#0F172A]" style={systemFont}>
      
      {/* অডিট ফর্ম মডাল */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => { setIsFormOpen(false); setIsSuccess(false); }}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-900"
            >
              <X size={24} />
            </button>

            {isSuccess ? (
              /* Success Message */
              <div className="py-10 text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">সফলভাবে পাঠানো হয়েছে!</h3>
                <p className="text-slate-500 font-medium">আমরা আগামী ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব।</p>
              </div>
            ) : (
              /* Actual Form */
              <>
                <h3 className="text-2xl font-bold mb-2">ফ্রি অডিট বুক করুন</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium">আপনার ব্যবসার তথ্য দিন, আমরা অডিট রিপোর্ট তৈরি করে জানাব।</p>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold mb-1 ml-1">আপনার নাম *</label>
                    <input 
                      type="text" 
                      name="Full_Name" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition" 
                      placeholder="উদা: রহিম আহমেদ" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-1 ml-1">ইমেইল/ফোন নাম্বার *</label>
                    <input 
                      type="text" 
                      name="Contact_Info" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition" 
                      placeholder="উদা: 018XXXXXXXX" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1 ml-1">ওয়েবসাইট/স্টোর লিঙ্ক *</label>
                    <input 
                      type="url" 
                      name="Store_Link" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition" 
                      placeholder="https://yourstore.com" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1 ml-1">মাসিক অ্যাড বাজেট (আনুমানিক)</label>
                    <select 
                      name="Ad_Budget" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 outline-none transition bg-white"
                    >
                      <option value="$৫০ - $১০০">$৫০ - $১০০</option>
                      <option value="$১০০ - $৫০০">$১০০ - $৫০০</option>
                      <option value="$৫০০ - $২০০০">$৫০০ - $২০০০</option>
                      <option value="$২০০০+">$২০০০+</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all mt-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" size={20} /> পাঠানো হচ্ছে...</>
                    ) : (
                      "সাবমিট করুন"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Top Status Bar */}
      <div className="bg-blue-600 text-white text-[12px] py-2.5 text-center font-semibold tracking-wide">
        স্ট্যাটাস: ফেব্রুয়ারি ২০২৬ সেশনের জন্য মাত্র ২টি ই-কমার্স স্লট খালি আছে
      </div>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <nav className="flex justify-between items-center mb-16">
          <div className="font-bold text-2xl tracking-tighter">
            SKILLZ<span className="text-blue-600">LAB_</span>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-slate-900 text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-slate-800 transition-all"
          >
            ফ্রি অডিট বুক করুন
          </button>
        </nav>

        {/* HERO SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-20">
          <div className="md:col-span-8 bg-white border border-slate-200 p-10 rounded-[2rem] flex flex-col justify-center shadow-sm">
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.2] mb-6 text-slate-900">
              শুধুমাত্র ট্রাফিক নয়, <br />
              আপনার ব্যবসাকে <span className="text-blue-600 underline decoration-4 underline-offset-8">প্রফিটেবল সেলে</span> রূপান্তর করুন।
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed font-medium">
              আমরা মেটা অ্যাডসের মাধ্যমে ই-কমার্স ব্যবসার জন্য এমন একটি গ্রোথ সিস্টেম তৈরি করি যা শুধুমাত্র ROAS-এর ওপর ফোকাস করে।
            </p>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 text-white w-fit px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 transition-transform hover:scale-105"
            >
              ফ্রি অডিট কল শুরু করুন <ArrowRight size={20} />
            </button>
          </div>

          <div className="md:col-span-4 grid grid-rows-2 gap-5">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between overflow-hidden relative">
              <TrendingUp size={40} className="text-blue-400 mb-4" />
              <div>
                <p className="text-slate-400 text-sm font-medium italic">গড় পার্টনার ROAS</p>
                <p className="text-5xl font-bold tracking-tight mt-1">4.2x — 8.9x</p>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-8 flex flex-col justify-between">
              <BarChart size={32} className="text-blue-600" />
              <p className="text-slate-900 text-xl font-bold italic leading-snug">"আমরা শুধু ক্লিক গুনি না, আমরা রেভিনিউ হিসাব করি।"</p>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="mb-24">
          <h2 className="text-center text-sm font-bold tracking-[0.2em] uppercase text-slate-400 mb-10">পার্থক্য কেন জরুরি?</h2>
          <div className="grid md:grid-cols-2 gap-0 border border-slate-200 rounded-[2.5rem] overflow-hidden bg-white shadow-xl">
            <div className="p-12 border-b md:border-b-0 md:border-r border-slate-100">
              <div className="flex items-center gap-3 mb-8 text-red-400">
                <XCircle size={24} />
                <span className="font-bold text-sm tracking-widest uppercase">সাধারণ ডিজিটাল মার্কেটার</span>
              </div>
              <ul className="space-y-8">
                <li className="flex flex-col">
                  <span className="font-bold text-slate-800 text-lg">অগোছালো পোস্ট বুস্টিং</span>
                  <span className="text-slate-500 italic">সিস্টেম ছাড়াই শুধু টাকা খরচ করা।</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-slate-800 text-lg">ফোকাস: লাইক ও রিঅ্যাকশন</span>
                  <span className="text-slate-500 italic">যা দিনশেষে কোনো সেল এনে দেয় না।</span>
                </li>
              </ul>
            </div>
            <div className="p-12 bg-slate-50">
              <div className="flex items-center gap-3 mb-8 text-blue-600">
                <CheckCircle2 size={24} />
                <span className="font-bold text-sm tracking-widest uppercase">আমাদের গ্রোথ সিস্টেম</span>
              </div>
              <ul className="space-y-8 text-slate-900">
                <li className="flex flex-col">
                  <span className="font-bold text-lg underline decoration-blue-200 decoration-4">সাইকোলজি-ড্রিভেন ক্রিয়েটিভ</span>
                  <span className="text-blue-600 font-medium italic">ক্রেতার কেনার আগ্রহ তৈরি করার ডিজাইন।</span>
                </li>
                <li className="flex flex-col">
                  <span className="font-bold text-lg underline decoration-blue-200 decoration-4">ডাটা-ব্যাকড ডিসিশন</span>
                  <span className="text-blue-600 font-medium italic">প্রতি সপ্তাহে পারফরম্যান্স ট্র্যাক করে স্কেলিং।</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 italic leading-tight text-white">ব্যবসা বাড়াতে কি আপনি প্রস্তুত?</h2>
            <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              আমরা সবার সাথে কাজ করি না। যদি আপনার প্রোডাক্টের স্কেল করার ক্ষমতা থাকে, তবেই আমরা দায়িত্ব নেই। আমাদের ফ্রি অডিট কল বুক করুন।
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-5 font-bold">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-12 py-5 rounded-2xl text-xl hover:scale-105 transition-transform shadow-lg shadow-blue-600/20"
              >
                ফ্রি অডিট কল বুক করুন
              </button>
              <button className="bg-white text-slate-900 px-12 py-5 rounded-2xl text-xl hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-2">
                <MessageCircle size={24} className="text-blue-600" /> আমাদের পেজে মেসেজ দিন
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 text-center font-bold">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">© ২০২৬ SKILLZLAB সব অধিকার সংরক্ষিত।</p>
      </footer>
    </div>
  );
};

export default SkillzLabLanding;