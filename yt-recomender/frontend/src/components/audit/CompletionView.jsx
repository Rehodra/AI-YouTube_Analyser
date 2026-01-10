import { CheckCircle2, Mail, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FadeIn from '../ui/FadeIn';

const CompletionView = ({ email, jobId }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-2xl w-full">
                <FadeIn>
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 text-center">
                        {/* Success Icon */}
                        <div className="inline-block mb-6">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2 mx-auto">
                                <CheckCircle2 className="text-emerald-600" size={32} />
                            </div>
                        </div>

                        {/* Success Message */}
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 font-display">
                            Analysis Complete
                        </h2>
                        <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
                            Your comprehensive intelligence report has been generated successfully and stored in your dashboard.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-xs border border-slate-100 mb-8">
                            <Mail size={14} />
                            <span>Report sent to <strong className="text-slate-900">{email}</strong></span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => navigate(jobId ? `/reports/${jobId}` : '/reports')}
                                className="group flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3 px-8 rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all"
                            >
                                <FileText size={16} />
                                <span>{jobId ? 'View Intelligence Report' : 'Dashboard'}</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => navigate('/audit')}
                                className="flex items-center justify-center gap-2 bg-white text-slate-700 font-bold py-3 px-8 rounded-xl text-[10px] uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all"
                            >
                                <Sparkles size={16} />
                                <span>Initiate New Analysis</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-8">
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                            Secure Data Transmission Active
                        </p>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
};

export default CompletionView;
