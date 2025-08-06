import React, { useState } from "react";

export default function ContactFormPage() {
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

          {/* Course Selection Checkboxes */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Select Courses of Interest:</h2>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="courses[]"
                value="Creative Design"
                className="rounded text-yellow-500"
              />
              <span>Creative Design</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="courses[]"
                value="Web Development"
                className="rounded text-yellow-500"
              />
              <span>Web Development</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="courses[]"
                value="Video Editing"
                className="rounded text-yellow-500"
              />
              <span>Video Editing</span>
            </label>
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
