import { Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-24 px-6 text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500 rounded-lg"><Youtube size={20} /></div>
            <span className="font-bold text-2xl tracking-tighter">TubeIntelligence</span>
          </div>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            Deploying institutional-grade content technology for the world's most influential digital organizations.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          {[
            { title: 'Platform', links: ['Landing Page', 'Audit Tool', 'Network Status'] },
            { title: 'Solutions', links: ['Creators', 'Agencies', 'Enterprise'] },
            { title: 'Company', links: ['About', 'Privacy', 'Security'] }
          ].map(cat => (
            <div key={cat.title} className="space-y-4">
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-600">{cat.title}</h5>
              <div className="flex flex-col gap-3 text-xs font-bold text-slate-400">
                {cat.links.map(link => (
                  <button key={link} className="text-left hover:text-sky-400 transition-colors">{link}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-700 gap-4">
        <div>© 2024 TubeIntelligence Global. Authorized Personnel Only.</div>
        <div className="flex gap-6"><span>Status: Operational</span><span>TLS 1.3 Active</span></div>
      </div>
    </footer>
  );
};

export default Footer;
