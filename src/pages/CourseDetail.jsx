import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  Smartphone, 
  Award, 
  Download, 
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Check,
  Sparkles,
  Package,
  Code
} from 'lucide-react';
import poster1 from '@/assets/poster1.jpg';
import poster2 from '@/assets/poster2.jpg';
import poster3 from '@/assets/poster3.jpg';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // State for enrollment check
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(true);

  const courseData = {
    'creative-design': {
      title: 'Creative Design using Phone',
      subtitle: 'Master Canva, Pixellab, Picsart & PSCC',
      level: 'Beginner to Advanced',
      duration: '6 weeks',
      students: 32,
      rating: 4.9,
      price: '৳399',
      originalPrice: '৳999',
      discount: '60% OFF',
      instructor: 'Moinur Rahman Sihan and Moshud Muktadir',
      thumbnail: poster1,
      description: 'Master Canva, Pixellab, Picsart & PSCC to create stunning graphics, logos, and social media content.',
      targetAudience: [
        'Complete beginners with no design experience',
        'Small business owners wanting to create their own graphics',
        'Students looking to develop creative skills',
        'Anyone wanting to start freelancing in design'
      ],
      requirements: [
        'Smartphone (Android or iOS)',
        'Stable internet connection',
        'Willingness to practice and learn'
      ],
      curriculum: [
        {
          module: 'Module 1: Design Fundamentals',
          lessons: [
            'Introduction to design principles',
            'Color theory for mobile',
            'Typography basics',
            'Composition and layout'
          ]
        },
        {
          module: 'Module 2: Canva Mastery',
          lessons: [
            'Canva interface walkthrough',
            'Templates and customization',
            'Working with elements and graphics',
            'Text effects and styling'
          ]
        },
        {
          module: 'Module 3: Social Media Graphics',
          lessons: [
            'Instagram post designs',
            'Facebook cover creation',
            'Story templates',
            'Brand consistency'
          ]
        },
        {
          module: 'Mastering Pixellab, Picsart & PSCC',
          lessons: []
        },
        {
          module: 'Module 4: Logo and Branding',
          lessons: [
            'Logo design principles',
            'Creating brand identity',
            'Business card design',
            'Letterhead and stationery'
          ]
        },
        {
          module: 'Module 5: Advanced Techniques',
          lessons: [
            'Photo editing',
            'Print design basics',
            'Product Manipulation',
            'Presentation design'
          ]
        },
        {
          module: 'Module 6: Freelancing & Business',
          lessons: [
            'Building a portfolio',
            'Finding clients',
            'Pricing your work',
            'Client communication'
          ]
        }
      ],
      features: [
        'Lifetime access to course materials',
        'Mobile-optimized learning experience',
        'Practical projects and assignments',
        'Community support and feedback',
        'Certificate of completion',
        'Bonus templates and resources'
      ]
    },
    'web-development': {
      title: 'Web Development with AI',
      subtitle: 'Build websites using AI tools - no PC required',
      level: 'Beginner Friendly',
      duration: '8 weeks',
      students: 32,
      rating: 4.8,
      price: '৳699',
      originalPrice: '৳1499',
      discount: '53% OFF',
      instructor: 'Moshud Muktadir',
      thumbnail: poster2,
      description: 'Learn to build professional websites using AI-powered tools and mobile development environments. Perfect for beginners who want to enter web development without a computer.',
      targetAudience: [
        'Beginners with no coding experience',
        'Students interested in web development',
        'Entrepreneurs wanting to build their own websites',
        'Anyone curious about AI in development'
      ],
      requirements: [
        'Smartphone with good performance',
        'Reliable internet connection',
        'Basic computer literacy',
        'Enthusiasm to learn coding concepts'
      ],
      curriculum: [
        {
          module: 'Module 1: Web Development Basics',
          lessons: [
            'Introduction of Website',
            'How websites work',
            'HTML fundamentals',
            'CSS styling basics',
            'Mobile development setup'
          ]
        },
        {
          module: 'Module 2: AI Tools Introduction',
          lessons: [
            'AI coding assistants',
            'Code generation tools',
            'Mobile IDEs and editors',
            'Mastering Promt',
            'Version control basics'
          ]
        },
        {
          module: 'Module 3: Building Your First Site',
          lessons: [
            'Project planning',
            'Creating layouts',
            'Adding interactivity',
            'Responsive design'
          ]
        },
        {
          module: 'Module 4: Advanced Features',
          lessons: [
            'Forms and user input',
            'Database integration'
          ]
        },
        {
          module: 'Module 5: Deployment & Hosting',
          lessons: [
            'Domain and hosting',
            'Deployment strategies',
            'Maintenance and updates'
          ]
        },
        {
          module: 'Module 6: Career & Freelancing',
          lessons: [
            'Building a portfolio',
            'Finding development work',
            'Client projects',
            'Continuous learning'
          ]
        }
      ],
      features: [
        'AI-powered learning assistance',
        'Real-world project portfolio',
        'Mobile development environment',
      ]
    },
    'video-editing': {
      title: 'Basic to Advanced Video Editing',
      subtitle: 'Everything from basic to advanced skills in one package',
      level: 'Video Editing',
      duration: '8 weeks',
      students: 25,
      rating: 5.0,
      price: '৳499',
      originalPrice: '৳1299',
      discount: '62% OFF',
      instructor: 'Mohammad Raihan',
      thumbnail: poster3,
      description: 'The ultimate learning package that includes all our courses plus exclusive content. Perfect for those who want to master multiple skills and build a comprehensive digital skillset.',
      targetAudience: [
        'Serious learners wanting comprehensive skills',
        'Career changers entering digital fields',
        'Entrepreneurs building digital businesses',
        'Students preparing for the future job market'
      ],
      requirements: [
        'Smartphone (With Good SoC)',
        'Stable high-speed internet',
        'Commitment to 8-week program',
        'Willingness to complete assignments'
      ],
      curriculum: [
        {
          module: 'Basics of Editing',
          lessons: [
            'Interface walkthrough',
            'Basic cuts, trims, split, timeline',
            'First edit: A 15 sec daily vlog'
          ]
        },
        {
          module: 'The Art of Storytelling',
          lessons: [
            'The Art of Storytelling',
            'What makes a video hooky?',
            'Scene planning, clip order',
            'Assignment: Script & shoot a basic story'
          ]
        },
        {
          module: 'Music & Beat Syncing',
          lessons: [
            'Adding royalty-free music',
            'Syncing clips to beats',
            'Beat-cutting tricks for reels/shorts'
          ]
        },
        {
          module: 'Text, Subtitles & Auto-Captions',
          lessons: [
            'Creating engaging subtitles for reels',
            'Highlighting keywords with pop effects',
            'Auto-caption tools + manual override'
          ]
        },
        {
          module: 'Transitions & Smoothness',
          lessons: [
            'Professional vs amateur transitions',
            'Speed ramping + motion blu',
            'Assignment: Create a 30-sec montage with smooth transitions'
          ]
        },
        {
          module: 'Filters, LUTs & Color Vibes',
          lessons: [
            'How to set mood using color',
            'LUTs, custom color grading',
            '"Viral Look" filter secrets'
          ]
        },
        {
          module: 'Green Screen, Overlays & AI Tools',
          lessons: [
            'Removing background',
            'Layering videos and photos',
            'Using CapCut AI tools smartly'
          ]
        },
        {
          module: 'Voiceover, SFX, and Audio Clean-up',
          lessons: [
            'Record clean voiceovers using mobile',
           'Use CapCut\'s audio tools (fade, volume, etc.)',
            'Add background sounds (wind, typing, rain)'
          ]
        },
        {
          module: 'Motion Graphics',
          lessons: [
            'Introduction to Motion Graphics',
            'Learn basics of Motion Graphics',
            'Visualize your thought into Motion Graphics'
          ]
        }
      ],
      features: [
        'Where to get freelance clients (Fiverr, Insta, offline)',
        'How to charge',
        'How to use video editing to grow a personal brand',
        'Priority community access',
        'Advanced certificates',
        'Lifetime updates and support'
      ]
    }
  };

  const course = courseData[courseId];

  // Check if course exists
  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link to="/courses">
            <Button className="bg-blue-600 hover:bg-blue-700">Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Effect: Check if user is enrolled for this course
  useEffect(() => {
    const checkEnrollment = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setIsEnrolled(false);
        setLoadingCheck(false);
        return;
      }

      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      setIsEnrolled(!!data);
      setLoadingCheck(false);
    };

    checkEnrollment();
  }, [courseId]);

  const handleEnroll = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to enroll in this course.',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    navigate(`/enroll/${courseId}`);
  };

  const handleVideoPreview = () => {
    toast({
      title: "Course Preview Coming Soon",
      description: "We're preparing sample lessons for this course",
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

      <div className="min-h-screen pt-24 bg-white">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" /> Mobile-First Learning
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  {course.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">{course.subtitle}</p>
                <p className="text-muted-foreground mb-8">{course.description}</p>

                {/* Temporary Enrollment Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded"
                >
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800">Temporary Enrollment Process</p>
                      <p className="text-yellow-700 text-sm">
                        After form submission, we'll contact you within 24 hours..
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span>{course.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-4xl font-bold text-primary">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {course.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={handleEnroll}
                    disabled={isEnrolled || loadingCheck}
                    className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-600 text-primary-foreground"
                  >
                    {loadingCheck
                      ? 'Checking enrollment...'
                      : isEnrolled
                        ? 'Already Enrolled'
                        : 'Enroll Now'}
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <Card className="bg-card border-border hover:shadow-lg transition-all overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img  
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      alt={`${course.title} course thumbnail`}
                      src={course.thumbnail}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-full p-2 shadow-md">
                        {course.category === 'design' ? (
                          <Smartphone className="w-6 h-6 text-white" />
                        ) : course.category === 'development' ? (
                          <Code className="w-6 h-6 text-white" />
                        ) : (
                          <Package className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Instructor:</strong> {course.instructor}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* What You'll Learn */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-foreground">What You'll Learn</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Curriculum */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-foreground">Course Curriculum</h2>
                  <div className="space-y-4">
                    {course.curriculum.map((module, index) => (
                      <Card key={index} className="bg-card border-border hover:shadow-lg transition-all">
                        <CardHeader>
                          <CardTitle className="text-xl text-primary">{module.module}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center space-x-3 text-muted-foreground">
                                <Play className="w-4 h-4 text-primary" />
                                <span>{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Target Audience */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-foreground">Who This Course Is For</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.targetAudience.map((audience, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{audience}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Requirements */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="bg-card border-border hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">Requirements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {course.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-3 text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Course Features */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Card className="bg-card border-border hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl text-foreground">Course Includes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{course.duration} of content</span>
                        </div>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <Smartphone className="w-4 h-4 text-primary" />
                          <span>Mobile-optimized learning</span>
                        </div>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <Award className="w-4 h-4 text-primary" />
                          <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center space-x-3 text-muted-foreground">
                          <Download className="w-4 h-4 text-primary" />
                          <span>Downloadable resources</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Enroll CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Card className="bg-card border-border hover:shadow-lg transition-all text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {course.price}
                      </div>
                      {course.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through mb-4">
                          {course.originalPrice}
                        </p>
                      )}
                      <Button
                        onClick={handleEnroll}
                        disabled={isEnrolled || loadingCheck}
                        className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-600 text-primary-foreground"
                      >
                        {loadingCheck
                          ? 'Checking enrollment...'
                          : isEnrolled
                            ? 'Already Enrolled'
                            : 'Enroll Now'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Courses */}
        <section className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Explore More <span className="gradient-text">Courses</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Continue your learning journey with our other courses
              </p>
            </motion.div>

            <div className="text-center">
              <Link to="/courses">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View All Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseDetail;