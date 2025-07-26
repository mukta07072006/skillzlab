
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const JoinNow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    course: '',
    paymentMethod: ''
  });

  const courses = [
    { id: 'creative-design', name: 'Creative Design using Phone', price: '৳399' },
    { id: 'web-development', name: 'Web Development with AI', price: '৳699' },
    { id: 'skill-pack', name: 'Advanced Video Editing', price: '৳499' }
  ];

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', icon: 'bKash mobile payment logo' },
    { id: 'nagad', name: 'Nagad', icon: 'Nagad mobile payment logo' },
    { id: 'rocket', name: 'Rocket', icon: 'Rocket mobile payment logo' },
    { id: 'bank', name: 'Bank Transfer', icon: 'Bank transfer icon' }
  ];

  const benefits = [
    'Lifetime access to course materials',
    'Mobile-optimized learning experience',
    'Community support and networking',
    'Certificate of completion',
    '24/7 student support'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.course) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    const enrollmentData = {
      ...formData,
      enrollmentDate: new Date().toISOString(),
      status: 'pending'
    };

    const existingEnrollments = JSON.parse(localStorage.getItem('skillzlab_enrollments') || '[]');
    existingEnrollments.push(enrollmentData);
    localStorage.setItem('skillzlab_enrollments', JSON.stringify(existingEnrollments));

    toast({
      title: "Our Team Will Contact You Soon",
      description: "Thanks for your Interest",
    });

    // Simulate WhatsApp redirect
    setTimeout(() => {
      toast({
        title: "🚧 WhatsApp Integration",
        description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      });
    }, 2000);

    // Reset form
    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      course: '',
      paymentMethod: ''
    });
  };

  const selectedCourse = courses.find(course => course.id === formData.course);

  return (
    <>
      <Helmet>
        <title>Join Now - SkillzLab | Start Your Mobile Learning Journey</title>
        <meta name="description" content="Enroll in SkillzLab courses and start learning professional skills on your mobile. Choose from Creative Design, Web Development, or Complete Skill Pack." />
      </Helmet>

      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="gradient-text">Join SkillzLab</span> Today
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Start your mobile-first learning journey today. Choose your course, complete enrollment, 
              and begin transforming your career with just your smartphone.
            </motion.p>
          </div>
        </section>

        {/* Enrollment Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-2xl gradient-text">Enrollment Form</CardTitle>
                    <p className="text-gray-300">Fill in your details to get started</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="whatsapp" className="text-gray-300">WhatsApp Number *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                              id="whatsapp"
                              name="whatsapp"
                              type="tel"
                              placeholder="+880 1234-567890"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Course Selection */}
                      <div>
                        <Label className="text-gray-300 mb-3 block">Select Course *</Label>
                        <div className="space-y-3">
                          {courses.map((course) => (
                            <div key={course.id} className="relative">
                              <input
                                type="radio"
                                id={course.id}
                                name="course"
                                value={course.id}
                                checked={formData.course === course.id}
                                onChange={handleInputChange}
                                className="sr-only"
                              />
                              <label
                                htmlFor={course.id}
                                className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                                  formData.course === course.id
                                    ? 'border-blue-400 bg-blue-500/10'
                                    : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-semibold text-white">{course.name}</h3>
                                  </div>
                                  <div className="text-xl font-bold gradient-text">
                                    {course.price}
                                  </div>
                                </div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method */}
                      {formData.course && selectedCourse?.price !== 'Free' && (
                        <div>
                          <Label className="text-gray-300 mb-3 block">Payment Method *</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {paymentMethods.map((method) => (
                              <div key={method.id} className="relative">
                                <input
                                  type="radio"
                                  id={method.id}
                                  name="paymentMethod"
                                  value={method.id}
                                  checked={formData.paymentMethod === method.id}
                                  onChange={handleInputChange}
                                  className="sr-only"
                                />
                                <label
                                  htmlFor={method.id}
                                  className={`block p-3 rounded-lg border cursor-pointer transition-all text-center ${
                                    formData.paymentMethod === method.id
                                      ? 'border-blue-400 bg-blue-500/10'
                                      : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                                  }`}
                                >
                                  <img  
                                    className="w-8 h-8 mx-auto mb-2"
                                    alt={`${method.name} payment method`}
                                   src="https://images.unsplash.com/photo-1563013544-824ae1b704d3" />
                                  <span className="text-sm text-white">{method.name}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 neon-glow"
                      >
                        {selectedCourse?.price === 'Free' ? 'Enroll for Free' : `Enroll Now - ${selectedCourse?.price || ''}`}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits & Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* What You Get */}
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl">What You Get</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Course Preview */}
                {selectedCourse && (
                  <Card className="glass-effect border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-xl">Selected Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">{selectedCourse.name}</h3>
                        <div className="text-3xl font-bold gradient-text">{selectedCourse.price}</div>
                        {selectedCourse.price !== 'Free' && (
                          <p className="text-gray-400 text-sm">One-time payment • Lifetime access</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Info */}
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl">Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-300">
                      <p>• Secure payment processing</p>
                      <p>• Lifetime Support</p>
                      <p>• Instant course access after payment</p>
                      <p>• WhatsApp confirmation within 5 minutes</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Support */}
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-300">
                      <p>📧 Email: skillzlab.io@gmail.com</p>
                      <p>📱 WhatsApp: +880 1234-567890</p>
                      <p>🕒 Support Hours: 9 AM - 9 PM (Daily)</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "Do I really only need a smartphone?",
                  answer: "Yes! All our courses are designed for mobile-first learning. You can complete everything using just your smartphone."
                },
                {
                  question: "What if I'm a complete beginner?",
                  answer: "Perfect! Our courses start from the very basics. No prior experience needed - just enthusiasm to learn."
                },
                {
                  question: "How long do I have access to the course?",
                  answer: "Lifetime access! Once you enroll, you can access the course materials forever, including future updates."
                },
                {
                  question: "Is there a money-back guarantee?",
                  answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment."
                },
                {
                  question: "Will I get a certificate?",
                  answer: "Yes! You'll receive a certificate of completion that you can share on LinkedIn and with employers."
                },
                {
                  question: "How do I get support during the course?",
                  answer: "You'll have access to our WhatsApp community, email support, and regular live Q&A sessions."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gray-700 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-300">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JoinNow;
