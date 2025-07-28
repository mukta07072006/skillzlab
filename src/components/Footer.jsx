import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png'; // Import your logo

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="SkillzLab Logo" 
                className="h-10 w-auto" 
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Master Creative & AI Skills — Right From Your Phone. Join thousands of students learning mobile-first skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-900">Quick Links</span>
            <div className="space-y-2">
              <Link to="/courses" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">
                All Courses
              </Link>
              <Link to="/about" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/success-stories" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Success Stories
              </Link>
            </div>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-900">Popular Courses</span>
            <div className="space-y-2">
              <Link to="/courses/creative-design" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Creative Design
              </Link>
              <Link to="/courses/web-development" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Web Development with AI
              </Link>
              <Link to="/courses/skill-pack" className="block text-gray-600 hover:text-blue-600 transition-colors text-sm">
                Basic to Advance Video Editing
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <span className="text-lg font-semibold text-gray-900">Contact Info</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 text-sm">
                <Mail size={16} className="text-blue-600" />
                <span>skillzlab.io@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 text-sm">
                <Phone size={16} className="text-blue-600" />
                <span>+880 1972887181 . +8801813311034 . +8801877538505</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 text-sm">
                <MapPin size={16} className="text-blue-600" />
                <span>Chattagram, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 SkillzLab. All rights reserved. | Empowering mobile-first learning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;