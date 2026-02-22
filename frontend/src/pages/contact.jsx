import { useState } from "react";
import { submitContactForm } from "../lib/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const res = await submitContactForm(form);
      setStatus(res.message || "Message sent successfully!");
      setForm({ name: "", email: "", project: "", message: "" });
    } catch {
      setStatus("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 p-6">
      <div className="bg-gradient-to-br from-indigo-800 via-purple-900 to-pink-900 shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
          Contact Form
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow"
          />
          <select
            name="project"
            value={form.project}
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow"
          >
            <option value="" >Select Project Type</option>
            <option value="Personal Portfolio">Personal Portfolio</option>
            <option value="Business Website">Business Website</option>
            <option value="Landing Page">Landing Page</option>
            <option value="E-Commerce Store">E-Commerce Store</option>
            <option value="Web Application">Web Application</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="message"
            placeholder="Project Description"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="px-4 py-2 rounded-lg bg-purple-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow resize-none"
          />
          <button
            type="submit"
            disabled={sending}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-105 transform transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sending ? "Sending..." : "Send Query"}
          </button>
        </form>
        {status && (
          <p className="mt-4 text-center text-white font-medium drop-shadow-lg">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;