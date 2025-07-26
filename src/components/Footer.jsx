
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold gradient-text">SkillzLab</span>
            </div>
            <p className="text-gray-400 text-sm">
              Master Creative & AI Skills — Right From Your Phone. Join thousands of students learning mobile-first skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Quick Links</span>
            <div className="space-y-2">
              <Link to="/courses" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                All Courses
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/success-stories" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Success Stories
              </Link>
           <Link to="/blog" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Blog 
              </Link>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Popular Courses</span>
            <div className="space-y-2">
              <Link to="/courses/creative-design" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Creative Design
              </Link>
              <Link to="/courses/web-development" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Web Development with AI
              </Link>
              <Link to="/courses/skill-pack" className="block text-gray-400 hover:text-blue-400 transition-colors text-sm">
                Basic to Advance Video Editing
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-white">Contact Info</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail size={16} />
                <span>skillzlab.io@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone size={16} />
                <span>+880 1972887181 . +8801813311034 . +8801877538505</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 text-sm">
                <MapPin size={16} />
                <span>Chattagram, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 SkillzLab. All rights reserved. | Empowering mobile-first learning.
          </p>
        </div>
        </div>
    </footer>
  );
};

export default Footer;
