
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'How to Design Professional Graphics on Your Phone: A Complete Guide',
      excerpt: 'Learn the essential techniques for creating stunning graphics using just your smartphone. From Canva basics to advanced mobile design workflows.',
      category: 'design',
      author: 'Moshud Muktadir',
      date: '2024-01-15',
      readTime: '8 min read',
      thumbnail: 'Mobile design tutorial showing Canva interface on smartphone',
      tags: ['Mobile Design', 'Canva', 'Graphics', 'Tutorial']
    },
    {
      id: 2,
      title: 'AI in Skill Building: The Future of Mobile Learning',
      excerpt: 'Discover how artificial intelligence is revolutionizing education and making professional skills more accessible through mobile-first learning platforms.',
      category: 'ai',
      author: 'Moshud Muktadir',
      date: '2024-01-12',
      readTime: '6 min read',
      thumbnail: 'AI-powered learning interface on mobile device',
      tags: ['AI', 'Education', 'Mobile Learning', 'Future']
    },
    {
      id: 3,
      title: '10 Freelancing Tips for Mobile-First Designers',
      excerpt: 'Essential strategies for building a successful freelance career using mobile design tools. From client acquisition to project management.',
      category: 'freelancing',
      author: 'Moinur Rahman Sihan',
      date: '2024-01-10',
      readTime: '10 min read',
      thumbnail: 'Freelance designer working on mobile projects',
      tags: ['Freelancing', 'Design', 'Career', 'Tips']
    },
    {
      id: 4,
      title: 'Building Your First Website Using Only Your Phone',
      excerpt: 'Step-by-step guide to creating a professional website using mobile development tools and AI-powered platforms.',
      category: 'development',
      author: 'Moshud Muktadir',
      date: '2024-01-08',
      readTime: '12 min read',
      thumbnail: 'Mobile web development process on smartphone',
      tags: ['Web Development', 'Mobile', 'AI Tools', 'Beginner']
    },
    {
      id: 5,
      title: 'From Zero to Hero: Success Stories of Mobile Learners',
      excerpt: 'Inspiring journeys of students who transformed their careers by learning professional skills on their smartphones.',
      category: 'success',
      author: 'Mohammad Raihan',
      date: '2024-01-05',
      readTime: '7 min read',
      thumbnail: 'Successful mobile learners celebrating achievements',
      tags: ['Success Stories', 'Inspiration', 'Career Change', 'Mobile Learning']
    },
    {
      id: 6,
      title: 'The Psychology of Mobile Learning: Why It Works',
      excerpt: 'Understanding the science behind mobile-first education and why learning on smartphones can be more effective than traditional methods.',
      category: 'education',
      author: 'Dr. Fatima Khan',
      date: '2024-01-03',
      readTime: '9 min read',
      thumbnail: 'Educational psychology concepts illustrated on mobile screen',
      tags: ['Psychology', 'Education', 'Mobile Learning', 'Research']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'design', label: 'Design' },
    { id: 'development', label: 'Development' },
    { id: 'ai', label: 'AI & Tech' },
    { id: 'freelancing', label: 'Freelancing' },
    { id: 'success', label: 'Success Stories' },
    { id: 'education', label: 'Education' }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1, 4);

  return (
    <>
      <Helmet>
        <title>Blog - SkillzLab | Mobile Learning Tips & Insights</title>
        <meta name="description" content="Discover expert tips on mobile design, AI development, freelancing, and career growth. Learn from SkillzLab's educational blog covering mobile-first skill development." />
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
              SkillzLab <span className="gradient-text">Blog</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Expert insights, tips, and tutorials on mobile-first learning, design, development, 
              and building successful careers in the digital age.
            </motion.p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-600 text-white"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'glass-effect text-gray-300 hover:text-white'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="gradient-text">Featured Article</span>
              </h2>
              
              <Card className="glass-effect border-gray-700 overflow-hidden hover:neon-glow transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="h-64 lg:h-auto">
                    <img  
                      className="w-full h-full object-cover"
                      alt={`${featuredPost.title} featured article`}
                     src="https://images.unsplash.com/photo-1670231200760-efbbfc4a79e3" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                      <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                        {categories.find(cat => cat.id === featuredPost.category)?.label}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{featuredPost.title}</h3>
                    <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img  
                          className="w-10 h-10 rounded-full object-cover"
                          alt={`${featuredPost.author} author profile`}
                         src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                        <div>
                          <p className="text-white font-semibold">{featuredPost.author}</p>
                          <p className="text-gray-400 text-sm">Author</p>
                        </div>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6">
                Latest <span className="gradient-text">Articles</span>
              </h2>
              <p className="text-xl text-gray-300">
                Stay updated with the latest trends and tips in mobile-first learning
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(1).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gray-700 hover:neon-glow transition-all duration-300 h-full group">
                    <div className="relative h-48 overflow-hidden">
                      <img  
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        alt={`${post.title} article thumbnail`}
                       src="https://images.unsplash.com/photo-1670231200760-efbbfc4a79e3" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                          {categories.find(cat => cat.id === post.category)?.label}
                        </span>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm line-clamp-3">{post.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs"
                          >
                            <Tag className="w-3 h-3 inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                        <div className="flex items-center space-x-2">
                          <img  
                            className="w-8 h-8 rounded-full object-cover"
                            alt={`${post.author} author profile`}
                           src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                          <span className="text-gray-400 text-sm">{post.author}</span>
                        </div>
                        <Button size="sm" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                          Read More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">No articles found matching your search.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4"
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <Card className="glass-effect border-gray-700 neon-glow">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-4">
                    Stay Updated with <span className="gradient-text">SkillzLab</span>
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Get the latest articles, tips, and course updates delivered to your inbox weekly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="flex-1 bg-gray-800/50 border-gray-600 text-white"
                    />
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-4">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
