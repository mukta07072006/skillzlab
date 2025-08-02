import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check auth state
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navItems = ['Home', 'Courses', 'About', 'Success Stories', 'Contact'].map(name => ({
    name,
    path: name === 'Home' ? '/' : `/${name.toLowerCase().replace(/\s+/g, '-')}`
  }));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-white/90 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo with animation */}
          <Link 
            to="/" 
            className="flex items-center"
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            <motion.div
              animate={{
                scale: isHoveringLogo ? [1, 1.05, 1] : 1,
                rotate: isHoveringLogo ? [0, 5, -5, 0] : 0
              }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={logo} 
                alt="SkillzLab Logo" 
                className={`h-10 w-auto transition-all ${isScrolled ? 'h-9' : 'h-10'}`} 
              />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.span 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      layoutId="underline"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Auth Buttons - Desktop */}
            {user ? (
              <motion.div 
                className="flex items-center space-x-4 ml-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 group"
                >
                  <div className="relative">
                    <User size={18} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
                    <motion.span
                      className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                    Profile
                  </span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-sm border-gray-300 hover:border-blue-600 hover:text-blue-600"
                >
                  Logout
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center space-x-4 ml-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                >
                  <span>Login</span>
                  <ChevronDown className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform" />
                </Link>
                <Link to="/signup">
                  <Button className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
                    <span className="relative z-10">Sign Up</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <Sparkles className="absolute -right-2 -top-2 w-5 h-5 text-yellow-300 opacity-70" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 focus:outline-none group"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              {isOpen ? (
                <X 
                  size={24} 
                  className="text-gray-800 group-hover:text-blue-600 transition-colors absolute inset-0" 
                />
              ) : (
                <Menu 
                  size={24} 
                  className="text-gray-800 group-hover:text-blue-600 transition-colors absolute inset-0" 
                />
              )}
            </div>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-xl rounded-lg overflow-hidden mt-2"
          >
            <div className="divide-y divide-gray-100">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Auth Buttons - Mobile */}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3"
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-lg shadow-sm">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;