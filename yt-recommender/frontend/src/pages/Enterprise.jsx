import { Fingerprint, Cpu, Terminal } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import FadeIn from '../components/ui/FadeIn';

const Enterprise = () => {
  const features = [
    { label: "Security", title: "Biometric Access", desc: "Encryption standards used by financial institutions to protect your metadata.", icon: Fingerprint },
    { label: "Efficiency", title: "Automated Workflows", desc: "Deploy content across 12+ platforms with one click.", icon: Cpu },
    { label: "Insight", title: "Custom Neural Training", desc: "We train models specifically on your audience data.", icon: Terminal }
  ];

  return (
    <div className="bg-slate-900 text-white pb-20 min-h-screen">
      <PageHeader
        category="Institutional Grade"
        title="Media Powerhouse OS."
        description="Scale your content operations with military-grade security and predictive modeling."
      />
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((item, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all h-full">
                <item.icon className="text-sky-400 mb-6" size={28} />
                <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-3">{item.label}</h4>
                <h3 className="text-base font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="bg-sky-600 p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
          <h2 className="text-2xl md:text-3xl font-bold mb-8 relative z-10">Scale Your Organization</h2>
          <button className="bg-white text-slate-900 font-bold px-8 py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all relative z-10">Schedule Briefing</button>
        </div>
      </div>
    </div>
  );
};

export default Enterprise;
