import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Phone, BookOpen, CreditCard, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

// Import payment method icons
import BkashIcon from '@/assets/bkash.png';
import NagadIcon from '@/assets/nagad.png';
import RocketIcon from '@/assets/rocket.png';
import BankIcon from '@/assets/bank.png';

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
    { id: 'bkash', name: 'bKash', icon: BkashIcon },
    { id: 'nagad', name: 'Nagad', icon: NagadIcon },
    { id: 'rocket', name: 'Rocket', icon: RocketIcon },
    { id: 'bank', name: 'Bank Transfer', icon: BankIcon }
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

      <div className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            >
              <span className="gradient-text">Join SkillzLab</span> Today
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
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
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">Enrollment Form</CardTitle>
                    <p className="text-gray-600">Fill in your details to get started</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            <Input
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="pl-10 bg-white border-gray-300"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="pl-10 bg-white border-gray-300"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="whatsapp" className="text-gray-700">WhatsApp Number *</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            <Input
                              id="whatsapp"
                              name="whatsapp"
                              type="tel"
                              placeholder="+880 1234-567890"
                              value={formData.whatsapp}
                              onChange={handleInputChange}
                              className="pl-10 bg-white border-gray-300"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Course Selection */}
                      <div>
                        <Label className="text-gray-700 mb-3 block">Select Course *</Label>
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
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 bg-white hover:border-gray-400'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h3 className="font-semibold text-gray-900">{course.name}</h3>
                                  </div>
                                  <div className="text-xl font-bold text-blue-600">
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
                          <Label className="text-gray-700 mb-3 block">Payment Method *</Label>
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
                                      ? 'border-blue-500 bg-blue-50'
                                      : 'border-gray-300 bg-white hover:border-gray-400'
                                  }`}
                                >
                                  <img 
                                    src={method.icon} 
                                    alt={`${method.name} payment method`}
                                    className="w-10 h-10 mx-auto mb-2 object-contain"
                                  />
                                  <span className="text-sm text-gray-800">{method.name}</span>
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
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
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
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">What You Get</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Selected Course */}
                {selectedCourse && (
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900">Selected Course</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">{selectedCourse.name}</h3>
                        <div className="text-3xl font-bold text-blue-600">{selectedCourse.price}</div>
                        {selectedCourse.price !== 'Free' && (
                          <p className="text-gray-500 text-sm">One-time payment • Lifetime access</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Instructions */}
                {formData.paymentMethod && (
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900">Payment Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm text-gray-700">
                        {formData.paymentMethod === 'bkash' && (
                          <>
                            <p>1. Go to bKash Mobile Menu</p>
                            <p>2. Select "Send Money"</p>
                            <p>3. Enter Number: <span className="font-bold">01877538505</span></p>
                            <p>4. Enter Amount: <span className="font-bold">{selectedCourse?.price}</span></p>
                            <p>5. Enter Reference: <span className="font-bold">SKILLZLAB</span></p>
                          </>
                        )}
                        {formData.paymentMethod === 'nagad' && (
                          <>
                            <p>1. Go to Nagad Mobile Menu</p>
                            <p>2. Select "Send Money"</p>
                            <p>3. Enter Number: <span className="font-bold">01877538505</span></p>
                            <p>4. Enter Amount: <span className="font-bold">{selectedCourse?.price}</span></p>
                            <p>5. Enter Reference: <span className="font-bold">SKILLZLAB</span></p>
                          </>
                        )}
                        {formData.paymentMethod === 'rocket' && (
                          <>
                            <p>1. Go to Rocket Mobile Menu</p>
                            <p>2. Select "Send Money"</p>
                            <p>3. Enter Number: <span className="font-bold">01877538505</span></p>
                            <p>4. Enter Amount: <span className="font-bold">{selectedCourse?.price}</span></p>
                            <p>5. Enter Reference: <span className="font-bold">SKILLZLAB</span></p>
                          </>
                        )}
                        {formData.paymentMethod === 'bank' && (
                          <>
                            <p>1. Bank Name: <span className="font-bold">Your Bank Name</span></p>
                            <p>2. Account Name: <span className="font-bold">SkillzLab</span></p>
                            <p>3. Account Number: <span className="font-bold">1234567890</span></p>
                            <p>4. Amount: <span className="font-bold">{selectedCourse?.price}</span></p>
                            <p>5. Reference: <span className="font-bold">SKILLZLAB</span></p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Contact Support */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-blue-600" />
                        <span>Email: skillzlab.io@gmail.com</span>
                      </p>
                      <p className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-blue-600" />
                        <span>WhatsApp: +880 1877538505</span>
                      </p>
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-600" />
                        <span>Support Hours: 9 AM - 9 PM (Daily)</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
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
                  <Card className="bg-white border border-gray-200 shadow-sm h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
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