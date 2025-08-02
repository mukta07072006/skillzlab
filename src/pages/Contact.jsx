import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Contact information with WhatsApp integration
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: 'Email Us',
      details: 'skillzlab.io@gmail.com',
      description: 'Send us an email anytime',
      action: () => window.location.href = 'mailto:skillzlab.io@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: 'Call Us',
      details: '+880 1877538505',
      description: 'Mon-Sun: 9 AM - 9 PM',
      action: () => window.location.href = 'tel:+8801877538505'
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      title: 'WhatsApp',
      details: '+880 1877538505',
      description: 'Instant messaging support',
      action: () => window.open('https://wa.me/8801877538505', '_blank')
    },
    {
      icon: <MapPin className="w-6 h-6 text-white" />,
      title: 'Location',
      details: 'Chattagram, Bangladesh',
      description: 'Our headquarters',
      action: null
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Replace with your Formspree endpoint
      const response = await fetch('https://formspree.io/f/xgvzylzd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email // Ensure Formspree knows where to reply
        }),
      });

      if (response.ok) {
        toast({
          title: "✅ Message Sent!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: "❌ Submission Error",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
              <title>SkillzLab - Bangladesh's First Mobile-Based Skill Development Platform</title>
              <meta
                name="description"
                content="SkillzLab is Bangladesh's first mobile-based professional skill development platform. Learn Canva design, video editing, web development, freelancing, and more — all from your smartphone."
              />
              <meta
                name="keywords"
                content="SkillzLab, Skillz Lab, skill development Bangladesh, mobile learning Bangladesh, Canva course BD, video editing course BD, freelancing course, online course platform Bangladesh, mobile-based education"
              />
              <meta property="og:title" content="SkillzLab - Learn Skills from Your Smartphone" />
              <meta property="og:description" content="Join SkillzLab — the first mobile-based skill development platform in Bangladesh. Learn Canva, editing, and freelancing on your phone!" />
              <meta property="og:url" content="https://skillzlab.online" />
              <meta property="og:type" content="website" />
            </Helmet>

      <div className="min-h-screen pt-24 bg-white">
            <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            >
              <span className="gradient-text">Contact Us</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Have questions about our courses? Need support? We're here to help you every step of the way.
            </motion.p>
          </div>
        </section>
           {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card 
                    className="bg-white border border-gray-200 hover:shadow-lg transition-shadow h-full cursor-pointer"
                    onClick={info.action || undefined}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{info.title}</h3>
                      <p className="text-blue-600 font-semibold mb-2">{info.details}</p>
                      <p className="text-gray-600 text-sm">{info.description}</p>
                      {info.action && (
                        <Button variant="link" className="text-blue-600 mt-3">
                          Click to connect
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-700">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-white border-gray-300"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-gray-700">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-white border-gray-300"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="bg-white border-gray-300"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gray-700">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="bg-white border-gray-300 min-h-[120px]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Map */}
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Our Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14767.26101840732!2d91.833235!3d22.341799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd89a9627f345%3A0x564a98e9976a1a3!2sChattogram!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="SkillzLab Location in Chattagram"
                      ></iframe>
                    </div>
                    <div className="mt-4 space-y-2 text-gray-600">
                      <p className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>Chattagram, Bangladesh</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Mon-Sun: 9:00 AM - 9:00 PM</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Support */}
                <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Quick Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                        onClick={() => window.open('https://wa.me/8801877538505', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Support
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        onClick={() => window.location.href = 'mailto:skillzlab.io@gmail.com'}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Support
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        onClick={() => window.location.href = 'tel:+8801877538505'}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Common <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to frequently asked questions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "How quickly will you respond to my message?",
                  answer: "We typically respond within 2-4 hours during business hours, and within 24 hours on weekends."
                },
                {
                  question: "What's the best way to get quick support?",
                  answer: "For fastest response, use our WhatsApp support at +880 1877538505."
                },
                {
                  question: "Can I visit your office in Chattagram?",
                  answer: "Yes! We're located in Chattagram. Please contact us in advance to schedule a visit."
                },
                {
                  question: "Do you offer phone consultations?",
                  answer: "Absolutely! Call us at +880 1877538505 during business hours for immediate assistance."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow h-full">
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

export default Contact;