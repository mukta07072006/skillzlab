import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, Users, Award, TrendingUp, Smartphone, Code, Package,
  Star, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

import poster1 from '@/assets/poster1.jpg';
import poster2 from '@/assets/poster2.jpg';
import poster3 from '@/assets/poster3.jpg';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({ students: 0, successRate: 0, courses: 0 });

  const testimonials = [
    {
      name: "Raihan Ahmed",
      role: "Freelance Designer",
      content: "SkillzLab changed my life! I learned Canva design on my phone and now I'm earning $500+ monthly as a freelancer.",
      rating: 5,
      image: "Young professional designer working on mobile device"
    },
    {
      name: "Neha Rahman",
      role: "Web Developer",
      content: "The AI web development course was amazing! I built my first website using just my phone. Incredible experience!",
      rating: 5,
      image: "Female developer coding on smartphone"
    },
    {
      name: "Sakib Hassan",
      role: "Digital Entrepreneur",
      content: "Complete skill pack gave me everything I needed. From design to development, all on mobile. Highly recommended!",
      rating: 5,
      image: "Young entrepreneur with mobile device"
    }
  ];

  const courses = [
    {
      id: 'creative-design',
      title: 'Creative Design using Phone',
      level: 'Beginner to Advanced',
      price: '৳399',
      thumbnail: poster1,
      icon: <Smartphone className="w-8 h-8 text-white" />,
      description: 'Master mobile design tools and create stunning visuals right from your smartphone.'
    },
    {
      id: 'web-development',
      title: 'Web Development with AI',
      level: 'Beginner Friendly',
      price: '৳699',
      thumbnail: poster2,
      icon: <Code className="w-8 h-8 text-white" />,
      description: 'Build websites using AI-powered tools without needing a computer.'
    },
    {
      id: 'video-editing',
      title: 'Basic to Pro Video Editing',
      level: 'All Levels',
      price: '৳499',
      thumbnail: poster3,
      icon: <Play className="w-8 h-8 text-white" />,
      description: 'Edit professional-quality videos using just your mobile device.'
    }
  ];

  useEffect(() => {
    const animateCounters = () => {
      const targets = { students: 250, successRate: 95, courses: 3 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounters({
          students: Math.floor(targets.students * progress),
          successRate: Math.floor(targets.successRate * progress),
          courses: Math.floor(targets.courses * progress)
        });
        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleVideoPlay = () => {
    toast({
      title: "🚧 Video Feature",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
     <Helmet>
        <title>SkillzLab - Bangladesh's First Mobile-Based Skill Development Platform</title>
        <meta
          name="description"
          content="Learn web design, development, video editing and more — all from your smartphone at SkillzLab."
        />
      </Helmet>

      <h1>Bangladesh’s First Mobile-Based Skill Development Platform</h1>

      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative min-h-screen pt-24 flex items-center justify-center hero-pattern overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/40"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
               SkillzLab, Bangladesh's First Mobile Based  — <span className="gradient-text">Skill Development Platform</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              >
               Master Creative Skills Right From Your Phone. No PC needed — just your smartphone and determination!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Link to="/join-now">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4">
                    Join Now
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4">
                    Explore Courses
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative max-w-2xl mx-auto"
              >
                <div className="relative bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/80">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center cursor-pointer" onClick={handleVideoPlay}>
                    <Play className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Registration Ongoing Section */}
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                🔥 <span className="gradient-text">Registration Ongoing</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Enroll now in our most popular skill-based courses — 100% mobile friendly.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="bg-card hover:shadow-lg border-border overflow-hidden h-full group">
                    <div className="h-48 relative overflow-hidden">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute bottom-2 left-2 bg-accent text-accent-foreground px-3 py-1 text-sm rounded">
                        {course.level}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary">{course.title}</h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="gradient-text font-bold text-lg">{course.price}</span>
                        <Link to={`/courses/${course.id}`}>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                            Join Now
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/courses">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Course Highlights */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="gradient-text">Popular Courses</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn in-demand skills using just your smartphone. All courses designed for mobile-first learning.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        {course.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-foreground">{course.title}</h3>
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                      <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                        {course.level}
                      </span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats-section" className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {counters.students.toLocaleString()}+
                </div>
                <p className="text-muted-foreground">Students Trained</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {counters.successRate}%
                </div>
                <p className="text-muted-foreground">Success Rate</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {counters.courses}
                </div>
                <p className="text-muted-foreground">Expert Courses</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-secondary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Our <span className="gradient-text">Students Say</span>
              </h2>
              <p className="text-xl text-muted-foreground">Real success stories from our mobile-first learners</p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <Card className="bg-card border-border p-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <div className="text-center flex-1">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl text-muted-foreground mb-6 italic">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-4">
                      <div>
                        <p className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</p>
                        <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex justify-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-primary' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your <span className="gradient-text">Mobile Learning Journey?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of students who are already building their future with mobile-first skills.
              </p>
              <Link to="/join-now">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-12 py-4">
                  Start Learning Today
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;