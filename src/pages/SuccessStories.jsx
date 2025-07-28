import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, Play, Users, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SuccessStories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add your success stories here following this structure:
  const successStories = [
    // Example story (uncomment and modify when ready):
    /*
    {
      id: 1,
      name: 'Student Name',
      role: 'Their Profession',
      category: 'design', // or 'development', 'business'
      course: 'Course Taken',
      story: 'Brief success story description',
      earnings: '৳25,000+/month',
      timeframe: '3 months',
      rating: 5,
      testimonial: 'Their testimonial quote',
      achievements: [
        'Achievement 1',
        'Achievement 2',
        'Achievement 3'
      ],
      beforeImage: '/path/to/before-image.jpg',
      afterImage: '/path/to/after-image.jpg'
    }
    */
  ];

  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'design', label: 'Design Success' },
    { id: 'development', label: 'Development Success' },
    { id: 'business', label: 'Business Success' }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory);

  const handleVideoTestimonial = () => {
    toast({
      title: "Video Testimonials Coming Soon",
      description: "We're working on adding video testimonials from our students!",
    });
  };

  // Update these stats with your actual numbers
  const stats = [
    { number: successStories.length > 0 ? successStories.length : '-', label: 'Success Stories', icon: <Users className="w-6 h-6" /> },
    { number: '-', label: 'Success Rate', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '-', label: 'Avg Earnings', icon: <Award className="w-6 h-6" /> },
    { number: '-', label: 'Income Growth', icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <>
      <Helmet>
        <title>Success Stories - SkillzLab | Student Achievements</title>
        <meta name="description" content="Inspiring success stories from SkillzLab students who transformed their careers through mobile-first learning." />
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
              <span className="gradient-text">Success Stories</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Real students achieving real results with mobile-first learning
            </motion.p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow p-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filters - Only show if there are stories */}
        {successStories.length > 0 && (
          <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Success Stories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {successStories.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200">
                              {/* Add student image here */}
                            </div>
                            <div>
                              <CardTitle className="text-xl text-gray-900">{story.name}</CardTitle>
                              <p className="text-blue-600 font-semibold">{story.role}</p>
                              <p className="text-gray-500 text-sm">{story.course}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{story.earnings}</div>
                            <p className="text-gray-500 text-sm">in {story.timeframe}</p>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <p className="text-gray-700">{story.story}</p>

                        {/* Testimonial */}
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                          <Quote className="w-6 h-6 text-blue-400 mb-2" />
                          <p className="text-gray-700 italic">"{story.testimonial}"</p>
                        </div>

                        {/* Achievements */}
                        {story.achievements && story.achievements.length > 0 && (
                          <div>
                            <p className="font-semibold text-gray-700 mb-2">Achievements:</p>
                            <div className="flex flex-wrap gap-2">
                              {story.achievements.map((achievement, i) => (
                                <span 
                                  key={i}
                                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rating */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {[...Array(story.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={handleVideoTestimonial}
                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Watch Story
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium text-gray-600 mb-4">No success stories yet</h3>
                <p className="text-gray-500 mb-6">Be the first to share your success story!</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Share Your Story
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Ready to Create Your Success Story?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our community and start your journey to success today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  Explore Courses
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4">
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SuccessStories;