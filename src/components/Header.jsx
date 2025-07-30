import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User } from 'lucide-react'; // Added User icon
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { supabase } from '@/lib/supabase'; // Make sure you have this setup

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="SkillzLab Logo" 
              className="h-10 w-auto" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth Buttons - Desktop */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-1">
                  <User size={18} />
                  <span className="text-sm font-medium">Profile</span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-md shadow-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-gray-800 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white shadow-lg rounded-lg p-4 mb-4"
          >
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 text-sm font-medium transition-colors rounded-md ${
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
                  className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="block mt-2"
                >
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-md shadow-sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;