import { useState } from 'react';
import { submitAudit, getJobStatus } from '../services/api';
import { useReports } from '../context/ReportsContext';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Target,
  BarChart3,
  Globe,
  Shield,
  Scale,
  TrendingUp,
  Youtube,
  Mail,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import ProcessingView from '../components/audit/ProcessingView';
import CompletionView from '../components/audit/CompletionView';
import AnalysisLoader from '../components/ui/AnalysisLoader';
import FadeIn from '../components/ui/FadeIn';

const Audit = () => {
  const [step, setStep] = useState('input');
  const [error, setError] = useState(null);
  const { addReport } = useReports();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    channelName: '',
    email: user?.email || '',
    selectedServices: []
  });
  const [currentJobId, setCurrentJobId] = useState(null);

  // Pre-fill email if user status changes
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user, formData.email]);

  const services = [
    {
      id: "1",
      category: "Content Optimization",
      name: "Semantic Title Engine",
      description: "LLM-driven headline generation",
      icon: Target,
      color: "sky"
    },
    {
      id: "2",
      category: "Content Optimization",
      name: "Predictive CTR Analysis",
      description: "Thumbnail saliency mapping",
      icon: BarChart3,
      color: "purple"
    },
    {
      id: "3",
      category: "Content Optimization",
      name: "Multi-Platform Mastery",
      description: "Cross-platform algorithm alignment",
      icon: Globe,
      color: "indigo"
    },
    {
      id: "7",
      category: "Legal & Compliance",
      name: "Copyright Protection",
      description: "Content ID scanning pre-upload",
      icon: Shield,
      color: "emerald"
    },
    {
      id: "8",
      category: "Legal & Compliance",
      name: "Fair Use Analysis",
      description: "Transformative content assessment",
      icon: Scale,
      color: "amber"
    },
    {
      id: "10",
      category: "Strategic Intelligence",
      name: "Trend Intelligence",
      description: "48-hour early trend detection",
      icon: TrendingUp,
      color: "rose"
    }
  ];

  const toggleService = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const selectAllServices = () => {
    const allIds = services.map(s => s.id);
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.length === allIds.length ? [] : allIds
    }));
  };

  const pollJobStatus = async (jobId) => {
    const maxAttempts = 60;
    let attempts = 0;

    const poll = async () => {
      try {
        const result = await getJobStatus(jobId);

        if (result.status === 'completed') {
          addReport({
            id: result.jobId,
            jobId: result.jobId,
            channelName: result.channelName || formData.channelName,
            channelId: result.channelId,
            email: formData.email,
            status: 'completed',
            aiReport: result.aiReport,
            videos: result.videos,
            services: formData.selectedServices,
            timestamp: new Date().toISOString()
          });

          setStep('complete');
          return;
        } else if (result.status === 'failed') {
          setError(result.error || 'Job processing failed');
          setStep('error');
          return;
        }

        attempts++;
        if (attempts < maxAttempts) {
          // Dynamic polling: faster at start, slows down later
          const interval = attempts < 5 ? 1000 : 3000;
          setTimeout(poll, interval);
        } else {
          setError('Job processing timed out. Please check back later.');
          setStep('error');
        }
      } catch (err) {
        attempts++;
        if (attempts < maxAttempts) {
          setTimeout(poll, 3000);
        } else {
          setError('Failed to retrieve job status');
          setStep('error');
        }
      }
    };

    poll();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.channelName || !formData.email) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.selectedServices.length === 0) {
      setError('Please select at least one service');
      return;
    }

    setStep('processing');
    setError(null);

    const payload = {
      email: formData.email,
      channelName: formData.channelName,
      services: formData.selectedServices
    };

    try {
      const result = await submitAudit(payload);
      setCurrentJobId(result.jobId);
      pollJobStatus(result.jobId);
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to submit request. Please try again.");
      setStep('error');
    }
  };

  const handleRetry = () => {
    setError(null);
    setStep('input');
  };

  const getColorClasses = (color, isSelected) => {
    const map = {
      sky: {
        border: isSelected ? 'border-sky-500' : 'border-slate-200',
        bg: isSelected ? 'bg-sky-50' : 'bg-white',
        iconBg: isSelected ? 'bg-sky-100' : 'bg-slate-100',
        icon: isSelected ? 'text-sky-600' : 'text-slate-500',
        text: isSelected ? 'text-sky-700/80' : 'text-slate-400'
      },
      purple: {
        border: isSelected ? 'border-purple-500' : 'border-slate-200',
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        iconBg: isSelected ? 'bg-purple-100' : 'bg-slate-100',
        icon: isSelected ? 'text-purple-600' : 'text-slate-500',
        text: isSelected ? 'text-purple-700/80' : 'text-slate-400'
      },
      indigo: {
        border: isSelected ? 'border-indigo-500' : 'border-slate-200',
        bg: isSelected ? 'bg-indigo-50' : 'bg-white',
        iconBg: isSelected ? 'bg-indigo-100' : 'bg-slate-100',
        icon: isSelected ? 'text-indigo-600' : 'text-slate-500',
        text: isSelected ? 'text-indigo-700/80' : 'text-slate-400'
      },
      emerald: {
        border: isSelected ? 'border-emerald-500' : 'border-slate-200',
        bg: isSelected ? 'bg-emerald-50' : 'bg-white',
        iconBg: isSelected ? 'bg-emerald-100' : 'bg-slate-100',
        icon: isSelected ? 'text-emerald-600' : 'text-slate-500',
        text: isSelected ? 'text-emerald-700/80' : 'text-slate-400'
      },
      amber: {
        border: isSelected ? 'border-amber-500' : 'border-slate-200',
        bg: isSelected ? 'bg-amber-50' : 'bg-white',
        iconBg: isSelected ? 'bg-amber-100' : 'bg-slate-100',
        icon: isSelected ? 'text-amber-600' : 'text-slate-500',
        text: isSelected ? 'text-amber-700/80' : 'text-slate-400'
      },
      rose: {
        border: isSelected ? 'border-rose-500' : 'border-slate-200',
        bg: isSelected ? 'bg-rose-50' : 'bg-white',
        iconBg: isSelected ? 'bg-rose-100' : 'bg-slate-100',
        icon: isSelected ? 'text-rose-600' : 'text-slate-500',
        text: isSelected ? 'text-rose-700/80' : 'text-slate-400'
      }
    };
    return map[color] || map.sky;
  };

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) acc[service.category] = [];
    acc[service.category].push(service);
    return acc;
  }, {});

  if (step === 'processing') return <AnalysisLoader />;

  if (step === 'complete') {
    return <CompletionView email={formData.email} jobId={currentJobId} />;
  }

  if (step === 'error') {
    return (
      <div className="py-20 px-6 min-h-screen bg-slate-50 flex items-center justify-center">
        <FadeIn>
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">{error}</p>
            <button
              onClick={handleRetry}
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
              Try Again
            </button>
          </div>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
            <Sparkles size={12} />
            <span>New Audit</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            Configure Analysis
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto">
            Select intelligence modules for your channel audit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Channel Details Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-wide">
              <Youtube size={16} className="text-slate-400" />
              Channel Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                  YouTube Channel
                </label>
                <div className="relative">
                  <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={formData.channelName}
                    onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
                    placeholder="@channelname"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Intelligence Suite Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                  <Zap size={16} className="text-slate-400" />
                  Intelligence Suite
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {formData.selectedServices.length > 0 && (
                  <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-100">
                    {formData.selectedServices.length} Selected
                  </span>
                )}
                <button
                  type="button"
                  onClick={selectAllServices}
                  className="text-[10px] font-bold text-sky-600 hover:text-sky-700 uppercase tracking-widest transition-colors"
                >
                  {formData.selectedServices.length === services.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedServices).map(([category, categoryServices]) => (
                <div key={category}>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 ml-1">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryServices.map((service) => {
                      const IconComponent = service.icon;
                      const isSelected = formData.selectedServices.includes(service.id);
                      const styles = getColorClasses(service.color, isSelected);

                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          className={`relative p-4 rounded-xl border-2 text-left transition-all h-full flex flex-col items-start min-h-[140px] group ${styles.border} ${styles.bg} ${isSelected ? 'shadow-sm' : 'hover:border-slate-300 hover:shadow-sm'}`}
                        >
                          {isSelected && (
                            <div className="absolute top-3 right-3">
                              <CheckCircle2 className={styles.icon} size={16} />
                            </div>
                          )}

                          <div className={`p-1.5 rounded-lg inline-block mb-3 transition-colors ${styles.iconBg}`}>
                            <IconComponent
                              className={styles.icon}
                              size={18}
                            />
                          </div>

                          <h4 className={`font-bold mb-1 text-xs ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>{service.name}</h4>
                          <p className={`text-[11px] leading-relaxed ${styles.text}`}>{service.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.channelName || !formData.email || formData.selectedServices.length === 0}
            className="w-full bg-gradient-to-r from-sky-600 to-sky-500 text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            Initiate Scan
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Audit;
