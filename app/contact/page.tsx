"use client";

import { useState } from "react";
import { Mail, Send, MessageSquare, User } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#22C55E] bg-[#1A1740] px-3 py-1.5 rounded-md mb-4">
            Contact
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#ECFDE8] tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-lg text-[#9BD69B] max-w-xl mx-auto">
            Have a question, suggestion, or know an AI resource we should add?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#ECFDE8] mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-[#1A1740] border border-[#22C55E]/30 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-[#22C55E]" />
                  </div>
                  <p className="text-[#ECFDE8] font-semibold text-lg mb-1">Message Sent!</p>
                  <p className="text-[#9BD69B] text-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#9BD69B] mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5FA06D]" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#0B0A1A] border border-[#3A5A2A] rounded-lg text-[#ECFDE8] placeholder:text-[#5FA06D] focus:border-[#22C55E] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9BD69B] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5FA06D]" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#0B0A1A] border border-[#3A5A2A] rounded-lg text-[#ECFDE8] placeholder:text-[#5FA06D] focus:border-[#22C55E] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#9BD69B] mb-1.5">
                      Message
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-[#5FA06D]" />
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-[#0B0A1A] border border-[#3A5A2A] rounded-lg text-[#ECFDE8] placeholder:text-[#5FA06D] focus:border-[#22C55E] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#22C55E] hover:bg-[#6D28D9] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#ECFDE8] mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#22C55E]" />
                Email Us
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-[#9BD69B]">
                  <strong className="text-[#ECFDE8]">General Inquiries:</strong>
                  <br />
                  <a
                    href="mailto:info@officepicks.net"
                    className="text-[#22C55E] hover:underline break-all"
                  >
                    info@officepicks.net
                  </a>
                </p>
                <p className="text-sm text-[#9BD69B]">
                  <strong className="text-[#ECFDE8]">Resource Suggestions:</strong>
                  <br />
                  <a
                    href="mailto:info@officepicks.net"
                    className="text-[#22C55E] hover:underline break-all"
                  >
                    info@officepicks.net
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-[#12102A] border border-[#3A5A2A] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#ECFDE8] mb-3 flex items-center gap-2">
                <Send className="w-4 h-4 text-[#22C55E]" />
                Response Time
              </h3>
              <p className="text-sm text-[#9BD69B]">
                We typically respond within{" "}
                <strong className="text-[#ECFDE8]">24 hours</strong> during
                business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
