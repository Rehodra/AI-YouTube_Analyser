import { Sparkles } from 'lucide-react';
import FadeIn from './FadeIn';

const PageHeader = ({ category, title, description }) => (
  <div className="pt-32 pb-16 text-center max-w-4xl mx-auto px-6">
    <FadeIn>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-[9px] font-bold uppercase tracking-widest mb-6 border border-sky-100">
        <Sparkles size={12} /> {category}
      </div>
    </FadeIn>
    <FadeIn delay={100}>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{title}</h1>
    </FadeIn>
    <FadeIn delay={200}>
      <p className="text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">{description}</p>
    </FadeIn>
  </div>
);

export default PageHeader;
