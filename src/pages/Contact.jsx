
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

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: 'info@skillzlab.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: '+880 1234-567890',
      description: 'Mon-Sun: 9 AM - 9 PM'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      details: '+880 1234-567890',
      description: 'Quick support via WhatsApp'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: 'Dhaka, Bangladesh',
      description: 'Visit our office'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage
    const contactData = {
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    const existingContacts = JSON.parse(localStorage.getItem('skillzlab_contacts') || '[]');
    existingContacts.push(contactData);
    localStorage.setItem('skillzlab_contacts', JSON.stringify(existingContacts));

    toast({
      title: "✅ Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - SkillzLab | Get in Touch</title>
        <meta name="description" content="Contact SkillzLab for support, questions, or enrollment assistance. We're here to help you start your mobile learning journey. Email, phone, and WhatsApp support available." />
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
              <span className="gradient-text">Contact Us</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Have questions about our courses? Need support? Want to learn more about mobile-first education? 
              We're here to help you every step of the way.
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
                  <Card className="glass-effect border-gray-700 text-center hover:neon-glow transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{info.title}</h3>
                      <p className="text-blue-400 font-semibold mb-2">{info.details}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-2xl gradient-text">Send us a Message</CardTitle>
                    <p className="text-gray-300">We'll get back to you within 24 hours</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-300">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-gray-800/50 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-gray-300">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-gray-800/50 border-gray-600 text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="bg-gray-800/50 border-gray-600 text-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-gray-300">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className="bg-gray-800/50 border-gray-600 text-white min-h-[120px]"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 neon-glow"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
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
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl">Our Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                      <img  
                        className="w-full h-full object-cover rounded-lg"
                        alt="SkillzLab office location map in Dhaka, Bangladesh"
                       src="https://images.unsplash.com/photo-1524661135-423995f22d0b" />
                    </div>
                    <div className="mt-4 space-y-2 text-gray-300">
                      <p className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        <span>Dhaka, Bangladesh</span>
                      </p>
                      <p className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span>Mon-Sun: 9:00 AM - 9:00 PM</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl">Office Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Monday - Friday</span>
                        <span className="text-blue-400 font-semibold">9:00 AM - 9:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Saturday</span>
                        <span className="text-blue-400 font-semibold">10:00 AM - 8:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Sunday</span>
                        <span className="text-blue-400 font-semibold">10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="border-t border-gray-600 pt-3 mt-3">
                        <p className="text-sm text-gray-400">
                          WhatsApp support available 24/7 for urgent queries
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card className="glass-effect border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-green-400 text-green-400 hover:bg-green-400 hover:text-white"
                        onClick={() => toast({
                          title: "🚧 WhatsApp Support",
                          description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                        })}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp Support
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                        onClick={() => toast({
                          title: "🚧 Email Support",
                          description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                        })}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Support
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                        onClick={() => toast({
                          title: "🚧 Phone Support",
                          description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
                        })}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us
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
              <h2 className="text-4xl font-bold mb-6">
                Common <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-xl text-gray-300">
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
                  question: "Can I schedule a call with an advisor?",
                  answer: "Yes! Contact us to schedule a free consultation call to discuss your learning goals and course options."
                },
                {
                  question: "Do you offer technical support during courses?",
                  answer: "Absolutely! We provide technical support via WhatsApp, email, and our community forum throughout your learning journey."
                },
                {
                  question: "Can I visit your office in person?",
                  answer: "Yes, you can visit our office in Dhaka. Please contact us in advance to schedule an appointment."
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

export default Contact;
