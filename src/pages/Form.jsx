import React from "react";

export default function ContactFormPage() { return ( <div className="min-h-screen flex items-center justify-center bg-blue-50 p-6"> <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-yellow-400"> <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Contact Form</h1> <form action="https://formspree.io/f/xgvzylzd" method="POST" className="space-y-4"> <div> <label className="block text-blue-800 mb-1">Name</label> <input
type="text"
name="name"
required
className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/> </div> <div> <label className="block text-blue-800 mb-1">WhatsApp</label> <input
type="text"
name="whatsapp"
required
className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/> </div> <div> <label className="block text-blue-800 mb-1">Address</label> <input
type="text"
name="address"
required
className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/> </div> <div> <label className="block text-blue-800 mb-1">Institution</label> <input
type="text"
name="institution"
required
className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
/> </div> <button
type="submit"
className="w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
> Submit </button> </form> </div> </div> ); }

