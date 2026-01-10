import { useState } from 'react';
import { Mail, Github, Linkedin, Send, Sparkles } from 'lucide-react';
import FadeIn from '../components/ui/FadeIn';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <FadeIn delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
              <Sparkles size={12} />
              About Us
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              AI-Powered YouTube Intelligence
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              TubeIntelligence leverages cutting-edge AI to help content creators optimize their YouTube strategy.
              From semantic title analysis to copyright protection.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission Section */}
          <FadeIn delay={100}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                We believe every content creator deserves access to professional-grade analytics and AI-powered insights.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-sky-100 rounded text-sky-600">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-0.5">AI-Driven Analysis</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Advanced machine learning models analyze your strategy</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-purple-100 rounded text-purple-600">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-0.5">Actionable Insights</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Get specific recommendations, not just generic advice</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-emerald-100 rounded text-emerald-600">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-0.5">Copyright Protection</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Ensure your content is safe from copyright claims</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-amber-100 rounded text-amber-600">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-0.5">Multi-Platform Strategy</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Optimize content for YouTube, Twitter, and LinkedIn</p>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">Platform Impact</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-sky-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-sky-600">10K+</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">Videos Analyzed</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-600">95%</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide">CTR Improvement</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <a
                  href="/audit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-600 to-sky-500 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:shadow-lg transition-all"
                >
                  <Sparkles size={14} />
                  Start Your Free Audit
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={200}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 text-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Get in Touch</h2>
              <p className="text-slate-500 mb-6">Have feedback or questions? We'd love to hear from you.</p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center">
                  <h3 className="font-bold text-emerald-900 mb-1">Message Sent!</h3>
                  <p className="text-[11px] text-emerald-700">Thank you for your feedback.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Message</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-sky-500 transition-all outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    Send Message
                  </button>
                </form>
              )}

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">Connect with Developer</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/Rehodra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all font-bold text-[10px] uppercase"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mounasuvra-banerjee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all font-bold text-[10px] uppercase"
                  >
                    <Linkedin size={14} />
                    LinkedIn
                  </a>
                  <a
                    href="mailto:mounasuvra.banerjee@gmail.com"
                    className="flex items-center gap-2 px-3 py-1.5 bg-sky-100 text-sky-700 rounded-md hover:bg-sky-200 transition-all font-bold text-[10px] uppercase"
                  >
                    <Mail size={14} />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default About;
