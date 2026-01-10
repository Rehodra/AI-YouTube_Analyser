import { ArrowRight, Mail } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

const AuditInputForm = ({ formData, setFormData, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <FadeIn>
                <div className="bg-white p-1 rounded-[32px] shadow-2xl border border-slate-200/50 overflow-hidden">
                    <div className="p-10">
                        <h2 className="text-[10px] font-bold tracking-[0.2em] text-slate-900 uppercase flex items-center gap-3 mb-10">
                            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                            Intelligence Request Engine
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                                    Asset ID / Handle
                                </label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 transition-all outline-none font-medium text-sm text-slate-900"
                                    placeholder="@username or Channel Name"
                                    value={formData.channelName || ''}
                                    onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Mail size={12} /> Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-sky-500 transition-all outline-none font-medium text-sm text-slate-900"
                                    placeholder="your@email.com"
                                    value={formData.email || ''}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <p className="text-[10px] text-slate-400 ml-1">Report will be sent to this email</p>
                            </div>
                            <button className="w-full bg-slate-900 text-white font-bold py-5 rounded-xl flex justify-center items-center gap-3 uppercase tracking-wider text-xs hover:bg-sky-600 transition-all mt-4">
                                Initiate Intelligence Scan <ArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                </div>
            </FadeIn>
        </div>
    );
};

export default AuditInputForm;
