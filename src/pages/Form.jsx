import React, { useState } from "react";

export default function ContactFormPage() {
  const [selectedCourses, setSelectedCourses] = useState({
    creativeDesign: false,
    webDevelopment: false,
    videoEditing: false
  });

  const handleCourseChange = (course) => {
    setSelectedCourses(prev => ({
      ...prev,
      [course]: !prev[course]
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-yellow-400">
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Free Workshop Registration</h1>
        
        <form 
          action="https://formspree.io/f/xgvzylzd" 
          method="POST" 
          className="space-y-4"
        >
          {/* Personal Information Fields */}
          <div>
            <label className="block text-blue-800 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 mb-1">WhatsApp</label>
            <input
              type="text"
              name="whatsapp"
              required
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 mb-1">Address</label>
            <input
              type="text"
              name="address"
              required
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          
          <div>
            <label className="block text-blue-800 mb-1">Institution</label>
            <input
              type="text"
              name="institution"
              required
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Course Selection Dropdowns */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Select Courses of Interest:</h2>
            
            {/* Creative Design Dropdown */}
            <div className="border border-blue-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleCourseChange('creativeDesign')}
                className={`w-full flex justify-between items-center p-3 ${selectedCourses.creativeDesign ? 'bg-blue-50' : ''}`}
              >
                <span className="font-medium text-blue-800">Creative Design</span>
                <svg
                  className={`w-5 h-5 transition-transform ${selectedCourses.creativeDesign ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedCourses.creativeDesign && (
                <div className="p-3 bg-blue-50 border-t border-blue-100">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="Canva Design"
                        className="rounded text-yellow-500"
                      />
                      <span>Creative Design</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="Photo Editing"
                        className="rounded text-yellow-500"
                      />
                      <span>Manipulation</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="Logo Design"
                        className="rounded text-yellow-500"
                      />
                      <span>Logo Design</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Web Development Dropdown */}
            <div className="border border-blue-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleCourseChange('webDevelopment')}
                className={`w-full flex justify-between items-center p-3 ${selectedCourses.webDevelopment ? 'bg-blue-50' : ''}`}
              >
                <span className="font-medium text-blue-800">Web Development</span>
                <svg
                  className={`w-5 h-5 transition-transform ${selectedCourses.webDevelopment ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedCourses.webDevelopment && (
                <div className="p-3 bg-blue-50 border-t border-blue-100">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="HTML/CSS"
                        className="rounded text-yellow-500"
                      />
                      <span>HTML/CSS</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="JavaScript"
                        className="rounded text-yellow-500"
                      />
                      <span>JavaScript</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="React"
                        className="rounded text-yellow-500"
                      />
                      <span>React</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Video Editing Dropdown */}
            <div className="border border-blue-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleCourseChange('videoEditing')}
                className={`w-full flex justify-between items-center p-3 ${selectedCourses.videoEditing ? 'bg-blue-50' : ''}`}
              >
                <span className="font-medium text-blue-800">Video Editing</span>
                <svg
                  className={`w-5 h-5 transition-transform ${selectedCourses.videoEditing ? 'transform rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedCourses.videoEditing && (
                <div className="p-3 bg-blue-50 border-t border-blue-100">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="CapCut Editing"
                        className="rounded text-yellow-500"
                      />
                      <span>CapCut</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="courses[]"
                        value="Premiere Pro"
                        className="rounded text-yellow-500"
                      />
                      <span>Alight Motion</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
