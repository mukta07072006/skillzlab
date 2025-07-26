
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Award, Users, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SuccessStories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const successStories = [
    {
      id: 1,
      name: 'Fatima Khatun',
      role: 'Freelance Designer',
      category: 'design',
      course: 'Creative Design using Phone',
      story: 'Started as a housewife with no design experience. Now earning ৳25,000+ monthly through freelance design work.',
      beforeImage: 'Before: Woman at home with basic smartphone setup',
      afterImage: 'After: Professional female designer working on multiple design projects',
      earnings: '৳25,000+/month',
      timeframe: '3 months',
      rating: 5,
      testimonial: 'SkillzLab changed my life completely. I never thought I could become a professional designer using just my phone. The instructors were amazing and the community support was incredible.',
      achievements: ['500+ designs created', '50+ happy clients', 'Featured on Fiverr Pro']
    },
    {
      id: 2,
      name: 'Md. Karim Ahmed',
      role: 'Web Developer',
      category: 'development',
      course: 'Web Development with AI',
      story: 'College student who built his first website on mobile and now runs a web development agency.',
      beforeImage: 'Before: College student with basic mobile phone',
      afterImage: 'After: Young professional developer with multiple screens and projects',
      earnings: '৳40,000+/month',
      timeframe: '4 months',
      rating: 5,
      testimonial: 'I was skeptical about learning web development on a phone, but SkillzLab proved me wrong. The AI tools they taught us are game-changers. I now have my own agency!',
      achievements: ['15+ websites built', 'Own development agency', '10+ team members']
    },
    {
      id: 3,
      name: 'Rashida Begum',
      role: 'Digital Entrepreneur',
      category: 'business',
      course: 'Complete Skill Pack',
      story: 'Rural entrepreneur who learned design and development to start her own digital marketing agency.',
      beforeImage: 'Before: Rural woman with traditional business setup',
      afterImage: 'After: Successful entrepreneur in modern office with team',
      earnings: '৳60,000+/month',
      timeframe: '6 months',
      rating: 5,
      testimonial: 'The Complete Skill Pack gave me everything I needed. From design to development to business skills - I learned it all on my phone and built a successful agency.',
      achievements: ['Digital marketing agency', '20+ clients', 'Team of 8 people']
    },
    {
      id: 4,
      name: 'Sakib Hassan',
      role: 'Social Media Manager',
      category: 'design',
      course: 'Creative Design using Phone',
      story: 'Unemployed graduate who became a sought-after social media manager for local businesses.',
      beforeImage: 'Before: Recent graduate looking for opportunities',
      afterImage: 'After: Professional social media manager with multiple brand accounts',
      earnings: '৳30,000+/month',
      timeframe: '2 months',
      rating: 5,
      testimonial: 'The mobile design course was exactly what I needed. I learned to create stunning social media content and now manage accounts for 15+ businesses.',
      achievements: ['15+ business clients', 'Social media expert', '1M+ content views']
    },
    {
      id: 5,
      name: 'Nasir Uddin',
      role: 'App Developer',
      category: 'development',
      course: 'Web Development with AI',
      story: 'Factory worker who learned coding on his phone during breaks and now develops mobile apps.',
      beforeImage: 'Before: Factory worker with basic mobile phone during break',
      afterImage: 'After: Professional app developer in modern workspace',
      earnings: '৳50,000+/month',
      timeframe: '5 months',
      rating: 5,
      testimonial: 'Learning to code on my phone during factory breaks seemed impossible, but SkillzLab made it happen. I now develop apps and have my own tech startup.',
      achievements: ['3 published apps', 'Tech startup founder', '100K+ app downloads']
    },
    {
      id: 6,
      name: 'Amina Rahman',
      role: 'Brand Designer',
      category: 'design',
      course: 'Creative Design using Phone',
      story: 'Stay-at-home mom who became a brand designer for international clients.',
      beforeImage: 'Before: Mother at home managing household duties',
      afterImage: 'After: Professional brand designer working with international clients',
      earnings: '৳35,000+/month',
      timeframe: '3 months',
      rating: 5,
      testimonial: 'As a mother, I needed flexible work. SkillzLab taught me brand design on my phone, and now I work with clients from USA, UK, and Australia.',
      achievements: ['International clients', 'Brand design expert', 'Work-life balance']
    }
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
      title: "🚧 Video Testimonials",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const stats = [
    { number: '250+', label: 'Success Stories', icon: <Users className="w-6 h-6" /> },
    { number: '95%', label: 'Job Placement Rate', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '৳25K', label: 'Average Monthly Earnings', icon: <Award className="w-6 h-6" /> },
    { number: '3.2x', label: 'Income Increase', icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <>
      <Helmet>
        <title>Success Stories - SkillzLab | Real Student Achievements</title>
        <meta name="description" content="Read inspiring success stories from SkillzLab students who transformed their careers using mobile-first learning. Real results, real people, real success." />
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
              <span className="gradient-text">Success Stories</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Real students, real results, real transformations. Discover how our mobile-first approach 
              has changed lives and created successful careers.
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
                  <Card className="glass-effect border-gray-700 p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                      {stat.number}
                    </div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white neon-glow'
                      : 'glass-effect text-gray-300 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gray-700 hover:neon-glow transition-all duration-300 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <img  
                            className="w-16 h-16 rounded-full object-cover"
                            alt={`${story.name} success story`}
                           src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                          <div>
                            <CardTitle className="text-xl text-white">{story.name}</CardTitle>
                            <p className="text-blue-400 font-semibold">{story.role}</p>
                            <p className="text-gray-400 text-sm">{story.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold gradient-text">{story.earnings}</div>
                          <p className="text-gray-400 text-sm">in {story.timeframe}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Before/After Images */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-2">Before</p>
                          <img  
                            className="w-full h-32 object-cover rounded-lg"
                            alt={`${story.name} before SkillzLab`}
                           src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-400 mb-2">After</p>
                          <img  
                            className="w-full h-32 object-cover rounded-lg"
                            alt={`${story.name} after SkillzLab success`}
                           src="https://images.unsplash.com/photo-1626447857058-2ba6a8868cb5" />
                        </div>
                      </div>

                      {/* Story */}
                      <p className="text-gray-300">{story.story}</p>

                      {/* Testimonial */}
                      <div className="bg-blue-500/10 rounded-lg p-4 border-l-4 border-blue-400">
                        <Quote className="w-6 h-6 text-blue-400 mb-2" />
                        <p className="text-gray-300 italic">"{story.testimonial}"</p>
                      </div>

                      {/* Achievements */}
                      <div>
                        <p className="font-semibold text-gray-300 mb-2">Key Achievements:</p>
                        <div className="flex flex-wrap gap-2">
                          {story.achievements.map((achievement, i) => (
                            <span 
                              key={i}
                              className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>

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
                          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Video
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Feedback Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">
                Real <span className="gradient-text">WhatsApp Feedback</span>
              </h2>
              <p className="text-xl text-gray-300">
                Authentic messages from our students sharing their success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gray-700">
                    <CardContent className="p-4">
                      <img  
                        className="w-full h-48 object-cover rounded-lg"
                        alt={`WhatsApp feedback screenshot ${index}`}
                       src="https://images.unsplash.com/photo-1685586784800-42bac9c32db9" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="gradient-text">Certificates</span> & Achievements
              </h2>
              <p className="text-xl text-gray-300">
                Our students proudly showcase their SkillzLab certifications
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gray-700 hover:neon-glow transition-all duration-300">
                    <CardContent className="p-4">
                      <img  
                        className="w-full h-64 object-cover rounded-lg"
                        alt={`SkillzLab certificate ${index}`}
                       src="https://images.unsplash.com/photo-1563085812-a173a3218c4b" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Write Your <span className="gradient-text">Success Story?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of successful students who transformed their careers with mobile-first learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 neon-glow text-lg px-12 py-4">
                  Start Your Journey
                </Button>
                <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white text-lg px-12 py-4">
                  View Courses
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
