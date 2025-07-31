import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Code, Package, Clock, Users, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import poster1 from '@/assets/poster1.jpg';
import poster2 from '@/assets/poster2.jpg';
import poster3 from '@/assets/poster3.jpg';

const Courses = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const courses = [
    {
      id: 'creative-design',
      title: 'Creative Design using Phone',
      category: 'design',
      level: 'Beginner to Advanced',
      duration: '6 weeks',
      students: 32,
      rating: 4.9,
      price: '৳399',
      thumbnail: poster1,
      description: 'Master Canva, Pixellab, Picsart & PSCC to create stunning graphics, logos, and social media content.',
      icon: <Smartphone className="w-6 h-6 text-white" />,
      highlights: ['Canva Pro techniques', 'Mobile design workflow', 'Social media graphics', 'Logo design', 'Banner Design', 'Certificate of completion']
    },
    {
      id: 'web-development',
      title: 'Web Development with AI',
      category: 'development',
      level: 'Beginner Friendly',
      duration: '6 weeks',
      students: 55,
      rating: 4.8,
      price: '৳699',
      thumbnail: poster2,
      description: 'Build websites using AI tools and mobile-friendly development environments. No PC required!',
      icon: <Code className="w-6 h-6 text-white" />,
      highlights: ['AI-powered coding', 'Mobile development', 'Responsive design', 'Deployment strategies', 'Certificate of completion']
    },
    {
      id: 'video-editing',
      title: 'Basic to Pro Video Editing',
      category: 'editing',
      level: 'All Levels',
      duration: '8 weeks',
      students: 25,
      rating: 5.0,
      price: '৳499',
      thumbnail: poster3,
      description: 'Everything you need from basic to advanced skills. Design, development, and business skills in one package.',
      icon: <Package className="w-6 h-6 text-white" />,
      highlights: ['Motion Graphics', 'Bonus content', 'Personal mentoring', 'Certificate of completion']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Courses' },
    { id: 'design', label: 'Creative Design' },
    { id: 'development', label: 'Web Development' },
    { id: 'editing', label: 'Video Editing' }
  ];

  const filteredCourses = selectedFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedFilter);

  return (
    <>
      <Helmet>
        <title>Courses - SkillzLab | Mobile-First Learning Platform</title>
        <meta name="description" content="Explore our mobile-first courses: Creative Design, Web Development with AI, and Complete Skill Pack. Learn professional skills using just your smartphone." />
      </Helmet>

      <div className="min-h-screen pt-24 bg-background">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-gray-900"
            >
              Our <span className="gradient-text">Courses</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Master in-demand skills using just your smartphone. All courses designed for mobile-first learning with practical, hands-on projects.
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="bg-white hover:shadow-lg border border-gray-200 transition-all duration-300 h-full overflow-hidden group">
                    {/* Course Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img  
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        alt={`${course.title} course thumbnail`}
                        src={course.thumbnail}
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-full p-2">
                          {course.icon}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                          {course.level}
                        </span>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </CardTitle>
                      <p className="text-gray-600 text-sm">{course.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Course Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-blue-600" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-gray-700">What you'll learn:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {course.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                          {course.price !== 'Free' && (
                            <span className="text-sm text-gray-500 ml-2">one-time</span>
                          )}
                        </div>
                        <Link to={`/courses/${course.id}`}>
                          <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white">
                            See Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
                Can't Decide? <span className="gradient-text">Start with Our Courses!</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Try our Creative Design courses and experience the SkillzLab difference.
              </p>
              <Link to="/courses/creative-design">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg px-12 py-4 mr-4">
                  Start Courses
                </Button>
              </Link>
              <Link to="/join-now">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-lg px-12 py-4">
                  Enroll Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Courses;