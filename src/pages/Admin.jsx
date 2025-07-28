import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function Admin() {
  const [stories, setStories] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', story: '', course: '', earnings: '' });

  const fetchStories = async () => {
    const snapshot = await getDocs(collection(db, 'successStories'));
    setStories(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const submit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'successStories'), form);
    setForm({ name: '', role: '', story: '', course: '', earnings: '' });
    fetchStories();
  };

  const remove = async (id) => {
    await deleteDoc(doc(db, 'successStories', id));
    fetchStories();
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">SkillzLab CMS</h1>
        <button onClick={() => signOut(auth)} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      <form onSubmit={submit} className="space-y-4 mb-8 bg-blue-50 p-4 rounded">
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2 border rounded" />
        <input type="text" placeholder="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="w-full px-4 py-2 border rounded" />
        <input type="text" placeholder="Course" value={form.course} onChange={e => setForm({ ...form, course: e.target.value })} className="w-full px-4 py-2 border rounded" />
        <input type="text" placeholder="Earnings" value={form.earnings} onChange={e => setForm({ ...form, earnings: e.target.value })} className="w-full px-4 py-2 border rounded" />
        <textarea placeholder="Story" value={form.story} onChange={e => setForm({ ...form, story: e.target.value })} className="w-full px-4 py-2 border rounded"></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Story</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map(s => (
          <div key={s.id} className="border p-4 rounded bg-gray-50">
            <h2 className="text-lg font-bold">{s.name} - {s.role}</h2>
            <p className="text-sm text-gray-600">{s.course}</p>
            <p>{s.story}</p>
            <p className="text-green-700 font-semibold mt-2">{s.earnings}</p>
            <button onClick={() => remove(s.id)} className="mt-2 text-red-600 underline">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
