import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import {
  Play, Users, Award, TrendingUp, Smartphone, Code, Package,
  Star, ChevronLeft, ChevronRight, ArrowRight, Check, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

import poster1 from '@/assets/poster1.jpg';
import poster2 from '@/assets/poster2.jpg';
import poster3 from '@/assets/poster3.jpg';
import heroVideo from '@/assets/skillzlab-intro.mp4';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [counters, setCounters] = useState({ students: 0, successRate: 0, courses: 0 });
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const controls = useAnimation();

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
      originalPrice: '৳999',
      discount: '60% OFF',
      thumbnail: poster1,
      icon: <Smartphone className="w-8 h-8 text-white" />,
      description: 'Master mobile design tools and create stunning visuals right from your smartphone.',
      features: ['Canva Pro Training', 'Mobile Design Techniques', 'Freelance Guide', 'Certificate']
    },
    {
      id: 'web-development',
      title: 'Web Development with AI',
      level: 'Beginner Friendly',
      price: '৳699',
      originalPrice: '৳1499',
      discount: '53% OFF',
      thumbnail: poster2,
      icon: <Code className="w-8 h-8 text-white" />,
      description: 'Build websites using AI-powered tools without needing a computer.',
      features: ['AI Website Builder', 'Mobile Coding', 'Hosting Guide', 'Certificate']
    },
    {
      id: 'video-editing',
      title: 'Basic to Pro Video Editing',
      level: 'All Levels',
      price: '৳499',
      originalPrice: '৳1299',
      discount: '62% OFF',
      thumbnail: poster3,
      icon: <Play className="w-8 h-8 text-white" />,
      description: 'Edit professional-quality videos using just your mobile device.',
      features: ['CapCut Mastery', 'Mobile Editing', 'Content Creation', 'Certificate']
    }
  ];

  const features = [
    {
      title: "Mobile-First Learning",
      description: "All courses designed specifically for smartphone learning",
      icon: <Smartphone className="w-6 h-6 text-primary" />
    },
    {
      title: "Bangladeshi Context",
      description: "Content tailored for Bangladeshi learners and market",
      icon: <Award className="w-6 h-6 text-primary" />
    },
    {
      title: "Practical Projects",
      description: "Learn by doing with real-world projects",
      icon: <Code className="w-6 h-6 text-primary" />
    },
    {
      title: "Freelance Guidance",
      description: "Get tips on how to earn from your new skills",
      icon: <TrendingUp className="w-6 h-6 text-primary" />
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
    }, { threshold: 0.1 });

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
      title: "🚀 Exciting Feature Coming Soon!",
      description: "We're working hard to bring you this video feature. Stay tuned!",
      action: (
        <Link to="/courses">
          <Button variant="outline" size="sm" className="border-primary text-primary">
            Explore Courses
          </Button>
        </Link>
      ),
    });
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const startHoverAnimation = () => {
    setIsVideoHovered(true);
    controls.start({
      scale: 1.05,
      transition: { duration: 0.3 }
    });
  };

  const endHoverAnimation = () => {
    setIsVideoHovered(false);
    controls.start({
      scale: 1,
      transition: { duration: 0.3 }
    });
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

      <div className="min-h-screen bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative min-h-screen pt-24 flex items-center justify-center bg-gradient-to-b from-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" /> Bangladesh's First Mobile Learning Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Learn <span className="gradient-text">Professional Skills</span> <br /> Right From Your <span className="text-primary">Smartphone</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              >
                No computer needed! Master in-demand skills like design, development, and video editing using just your mobile device.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Link to="/join-now">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 shadow-lg hover:shadow-primary/30 transition-all">
                    <span className="mr-2">Start Learning</span>
                    <ArrowRight className="w-5 h-5" />
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
                <motion.div
                  animate={controls}
                  onHoverStart={startHoverAnimation}
                  onHoverEnd={endHoverAnimation}
                  className="aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-primary/20 relative"
                >
                  <div className={`absolute inset-0 flex items-center justify-center z-10 ${isVideoHovered ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Button 
                        onClick={handleVideoPlay}
                        size="lg" 
                        className="rounded-full w-16 h-16 bg-primary/90 hover:bg-primary backdrop-blur-sm"
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </Button>
                    </div>
                  </div>
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="gradient-text">SkillzLab?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our mobile-first approach makes skill development accessible to everyone
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-card hover:bg-card/80 border-border h-full group transition-all hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Ongoing Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Limited Time Offers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                🔥 <span className="gradient-text">Enrollment Open Now</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join our most popular courses with special discounts. Limited seats available!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="bg-card hover:shadow-xl border-border overflow-hidden h-full transition-all duration-300 relative">
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full font-medium z-10">
                      {course.discount}
                    </div>
                    <div className="h-48 relative overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-accent text-accent-foreground px-3 py-1 text-sm rounded">
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary">{course.title}</h3>
                        <div className="text-right">
                          <span className="text-muted-foreground line-through text-sm">{course.originalPrice}</span>
                          <span className="gradient-text font-bold text-lg block">{course.price}</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-6">
                        {course.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <Check className="w-4 h-4 text-primary mr-2" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Link to={`/courses/${course.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-lg transition-all">
                          Enroll Now
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/courses">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8">
                  View All Courses
                </Button>
              </Link>
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
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {counters.students.toLocaleString()}+
                </div>
                <p className="text-muted-foreground">Students Trained</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {counters.successRate}%
                </div>
                <p className="text-muted-foreground">Success Rate</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-primary" />
                </div>
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
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Success <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-xl text-muted-foreground">Hear from our students who transformed their lives</p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card border-border p-8 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={prevTestimonial}
                      className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors text-primary"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <div className="text-center flex-1 px-4">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-xl md:text-2xl text-muted-foreground mb-6 italic">
                        "{testimonials[currentTestimonial].content}"
                      </blockquote>
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
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
              </motion.div>
            </div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Start Your <span className="gradient-text">Mobile Learning</span> Journey Today!
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of Bangladeshi students who are building their future with mobile-first skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/join-now">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 shadow-lg hover:shadow-primary/30 transition-all">
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4">
                    Browse Courses
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

export default Home;