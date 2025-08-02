import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Code, 
  Package, 
  Clock, 
  Users, 
  Star, 
  Filter, 
  ChevronRight, 
  Check, 
  Award, 
  Sparkles,
  Play,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import poster1 from '@/assets/poster1.jpg';
import poster2 from '@/assets/poster2.jpg';
import poster3 from '@/assets/poster3.jpg';

const Courses = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredCourse, setHoveredCourse] = useState(null);

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
      originalPrice: '৳999',
      discount: '60% OFF',
      thumbnail: poster1,
      description: 'Master Canva, Pixellab, Picsart & PSCC to create stunning graphics, logos, and social media content.',
      icon: <Smartphone className="w-6 h-6 text-white" />,
      highlights: ['Canva Pro techniques', 'Mobile design workflow', 'Social media graphics', 'Logo design', 'Banner Design', 'Certificate of completion'],
      features: ['40+ Video Lessons', '10 Practical Projects', 'Lifetime Access', 'Community Support']
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
      originalPrice: '৳1499',
      discount: '53% OFF',
      thumbnail: poster2,
      description: 'Build websites using AI tools and mobile-friendly development environments. No PC required!',
      icon: <Code className="w-6 h-6 text-white" />,
      highlights: ['AI-powered coding', 'Mobile development', 'Responsive design', 'Deployment strategies', 'Certificate of completion'],
      features: ['35+ Video Lessons', '8 Practical Projects', 'Lifetime Access', 'Community Support']
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
      originalPrice: '৳1299',
      discount: '62% OFF',
      thumbnail: poster3,
      description: 'Everything you need from basic to advanced skills. Design, development, and business skills in one package.',
      icon: <Package className="w-6 h-6 text-white" />,
      highlights: ['Motion Graphics', 'Bonus content', 'Personal mentoring', 'Certificate of completion'],
      features: ['50+ Video Lessons', '12 Practical Projects', 'Lifetime Access', 'Community Support']
    }
  ];

  const filters = [
    { id: 'all', label: 'All Courses', icon: <Package className="w-4 h-4" /> },
    { id: 'design', label: 'Creative Design', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'development', label: 'Web Development', icon: <Code className="w-4 h-4" /> },
    { id: 'editing', label: 'Video Editing', icon: <Play className="w-4 h-4" /> }
  ];

  const filteredCourses = selectedFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedFilter);

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

      <div className="min-h-screen pt-24 bg-background">
        {/* Header */}
        <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" /> Mobile-First Learning
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
            >
              Transform Your <span className="gradient-text">Skills</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Master in-demand skills using just your smartphone. All courses designed for mobile-first learning with practical, hands-on projects.
            </motion.p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 top-16 bg-background/95 backdrop-blur-sm z-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-primary-foreground shadow-md'
                      : 'bg-card hover:bg-card/80 text-muted-foreground border border-border'
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <AnimatePresence>
              {filteredCourses.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-20"
                >
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No courses found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We don't have any courses in this category yet. Check back soon or browse our other offerings.
                  </p>
                  <Button 
                    onClick={() => setSelectedFilter('all')} 
                    variant="outline" 
                    className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    View All Courses
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      exit={{ opacity: 0 }}
                      layout
                      onMouseEnter={() => setHoveredCourse(course.id)}
                      onMouseLeave={() => setHoveredCourse(null)}
                    >
                      <Card className="bg-card hover:shadow-xl border-border transition-all duration-300 h-full overflow-hidden group relative">
                        {/* Discount Badge */}
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium z-10">
                          {course.discount}
                        </div>
                        
                        {/* Course Thumbnail */}
                        <div className="relative h-48 overflow-hidden">
                          <img  
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            alt={`${course.title} course thumbnail`}
                            src={course.thumbnail}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute top-4 left-4">
                            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-full p-2 shadow-md">
                              {course.icon}
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                              {course.level}
                            </span>
                          </div>
                        </div>

                        <CardHeader className="pb-0">
                          <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4 pt-4">
                          {/* Course Stats */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-primary" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4 text-primary" />
                              <span>{course.students}+ students</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{course.rating}</span>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-foreground">What you'll learn:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {course.highlights.slice(0, 3).map((highlight, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <Check className="w-4 h-4 text-primary" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                              {hoveredCourse === course.id && course.highlights.length > 3 && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  {course.highlights.slice(3).map((highlight, i) => (
                                    <li key={i + 3} className="flex items-center space-x-2">
                                      <Check className="w-4 h-4 text-primary" />
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </motion.div>
                              )}
                              {course.highlights.length > 3 && hoveredCourse !== course.id && (
                                <li className="text-primary text-sm font-medium">
                                  +{course.highlights.length - 3} more
                                </li>
                              )}
                            </ul>
                          </div>

                          {/* Price and CTA */}
                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div>
                              <span className="text-2xl font-bold text-primary">{course.price}</span>
                              <span className="text-sm text-muted-foreground line-through ml-2">{course.originalPrice}</span>
                            </div>
                            <Link to={`/courses/${course.id}`}>
                              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-600 text-primary-foreground group">
                                <span>Details</span>
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Ready to <span className="gradient-text">Transform</span> Your Skills?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students who are building their future with mobile-first skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/join-now">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-600 text-primary-foreground text-lg px-8 py-4 shadow-lg hover:shadow-primary/30 transition-all">
                    <span className="mr-2">Enroll Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/courses/creative-design">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4">
                    Browse Popular Courses
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Courses;