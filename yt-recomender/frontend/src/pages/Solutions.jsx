import { Workflow, Network, DollarSign, ShieldAlert, ChevronRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import FadeIn from '../components/ui/FadeIn';

const Solutions = () => {
  const solutions = [
    { title: "Retention Mastery", icon: Workflow, desc: "Analyze second-by-second drop-off points using our proprietary technology." },
    { title: "Ecosystem Portability", icon: Network, desc: "Migrate audiences between platforms with minimal friction." },
    { title: "Revenue Optimization", icon: DollarSign, desc: "Institutional ad-placement logic designed to maximize RPM." },
    { title: "Risk Mitigation", icon: ShieldAlert, desc: "Detect policy violations and Content ID conflicts before they impact you." }
  ];

  return (
    <div className="pb-16 bg-slate-50 min-h-screen">
      <PageHeader
        category="Vertical Solutions"
        title="Engineered for Every Stage."
        description="Whether you are a solo creator or a global media house, our protocols adapt to your specific growth trajectory."
      />
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-4">
        {solutions.map((s, i) => (
          <FadeIn key={i} delay={i * 100} className="group">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all hover:shadow-md flex gap-6 items-start">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                <s.icon size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">{s.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{s.desc}</p>
                <button className="text-[9px] font-bold uppercase tracking-widest text-sky-600 flex items-center gap-1.5 hover:gap-2 transition-all">Technical Specs <ChevronRight size={12} /></button>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default Solutions;
