
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import moshud from '@/assets/moshud.jpg';

const About = () => {
  const team = [
    {
      name: 'Moshud Muktadir',
      role: 'Developer & Creative Designer',
      bio: 'Expert in mobile design with 5+ years of experience. Passionate about making design accessible to everyone.',
      image: moshud,
      expertise: ['Web Development', 'Design Expert', 'Brand Strategy']
    },
    {
      name: 'Raihan Ahmed',
      role: 'Co-Founder & Tech Lead',
      bio: 'Full-stack developer specializing in AI-powered development tools and mobile-first solutions.',
      image: 'Professional male tech lead and developer in modern workspace',
      expertise: ['Web Development', 'AI Tools', 'Mobile Tech']
    },
    {
      name: 'Sakib Hassan',
      role: 'Head of Student Success',
      bio: 'Dedicated to ensuring every student achieves their learning goals and career objectives.',
      image: 'Professional student success manager in educational environment',
      expertise: ['Student Mentoring', 'Career Guidance', 'Learning Strategy']
    }
  ];

  const values = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile-First Learning',
      description: 'We believe learning should be accessible anywhere, anytime, using just your smartphone.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Our supportive community helps every student succeed through peer learning and mentorship.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality Education',
      description: 'We provide industry-relevant skills that directly translate to career opportunities.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Student Success',
      description: 'Your success is our success. We are committed to helping you achieve your goals.'
    }
  ];

  const stats = [
    { number: '250+', label: 'Students Trained' },
    { number: '95%', label: 'Success Rate' },
    { number: '3', label: 'Expert Courses' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - SkillzLab | Mobile-First Learning Academy</title>
        <meta name="description" content="Learn about SkillzLab's mission to make quality education accessible through mobile-first learning. Meet our team and discover our story of empowering students worldwide." />
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
              About <span className="gradient-text">SkillzLab</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Empowering the next generation of digital creators through mobile-first education. 
              We believe that quality learning should be accessible to everyone, everywhere.
            </motion.p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    SkillzLab was born from a simple observation: millions of people worldwide have smartphones 
                    but lack access to quality digital education. Traditional learning methods often require 
                    expensive equipment and complex setups that many cannot afford.
                  </p>
                  <p>
                    In 2023, our founders Neha and Raihan decided to change this. They envisioned a platform 
                    where anyone with a smartphone could learn professional skills, from creative design to 
                    web development, without needing a computer or expensive software.
                  </p>
                  <p>
                    Today, SkillzLab has trained over 2,500 students across Bangladesh and beyond, with a 
                    95% success rate. Our graduates are working as freelancers, starting their own businesses, 
                    and building careers in the digital economy.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
          
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <Card className="glass-effect border-gray-700 h-full">
                  <CardHeader>
                    <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      To democratize digital education by making professional skills accessible 
                      to everyone through mobile-first learning experiences.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <Card className="glass-effect border-gray-700 h-full">
                  <CardHeader>
                    <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      A world where geographical location and economic status don't limit 
                      access to quality education and career opportunities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center"
              >
                <Card className="glass-effect border-gray-700 h-full">
                  <CardHeader>
                    <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <CardTitle className="text-2xl">Our Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">
                      Accessibility, innovation, community, and student success drive 
                      everything we do at SkillzLab.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">
                What We <span className="gradient-text">Stand For</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our core values guide every decision we make and every course we create.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="glass-effect border-gray-700 text-center h-full hover:neon-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                      <p className="text-gray-300 text-sm">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">
                Meet Our <span className="gradient-text">Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Passionate educators and industry experts dedicated to your success.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className="glass-effect border-gray-700 text-center hover:neon-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <img  
  className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
  alt={`${member.name} - ${member.role}`}
  src={member.image}
/>

                      <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                      <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                      <p className="text-gray-300 text-sm mb-4">{member.bio}</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="gradient-text">Impact</span>
              </h2>
              <p className="text-xl text-gray-300">
                Numbers that reflect our commitment to student success
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Message */}
        <section className="py-16 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img  
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-6"
                  alt="Neha Rahman - Founder of SkillzLab"
                 src="https://images.unsplash.com/photo-1686488594144-65fb516275e1" />
                <blockquote className="text-2xl md:text-3xl text-gray-300 italic mb-6">
                  "Education should never be limited by the device you own or where you live. 
                  At SkillzLab, we're proving that a smartphone is all you need to build a 
                  successful digital career."
                </blockquote>
                <p className="text-xl font-semibold gradient-text">
                  - Neha Rahman, Founder & Creative Director
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
