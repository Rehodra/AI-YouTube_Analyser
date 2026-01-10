import { Brain, Sparkles, Target, TrendingUp, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

const AnalysisLoader = () => {
    const [currentStage, setCurrentStage] = useState(0);

    const stages = [
        { icon: Brain, label: "Analyzing Channel Data", color: "sky", duration: 3000 },
        { icon: Sparkles, label: "Processing Video Metadata", color: "purple", duration: 4500 },
        { icon: Target, label: "Generating Insights", color: "yellow", duration: 4000 },
        { icon: TrendingUp, label: "Predicting Trends", color: "pink", duration: 3500 },
        { icon: Shield, label: "Finalizing Report", color: "green", duration: 2000 }
    ];

    useEffect(() => {
        if (currentStage >= stages.length - 1) return;

        const timer = setTimeout(() => {
            setCurrentStage((prev) => prev + 1);
        }, stages[currentStage].duration);

        return () => clearTimeout(timer);
    }, [currentStage]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-slate-50 flex items-center justify-center py-20 px-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center animate-pulse">
                            <Brain className="text-white" size={40} />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-sky-500 animate-ping opacity-20"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">
                        AI Analysis in Progress
                    </h2>
                    <p className="text-slate-600 text-lg">
                        Our AI is analyzing your channel... This may take a minute
                    </p>
                </div>

                {/* Progress Stages */}
                <div className="space-y-4">
                    {stages.map((stage, index) => {
                        const IconComponent = stage.icon;
                        const isActive = index === currentStage;
                        const isCompleted = index < currentStage;

                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl border-2 p-6 transition-all duration-500 ${isActive
                                    ? `border-${stage.color}-500 shadow-lg shadow-${stage.color}-500/20`
                                    : isCompleted
                                        ? 'border-green-200'
                                        : 'border-slate-200'
                                    }`}
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <div className={`p-3 rounded-xl transition-all duration-500 ${isActive
                                        ? `bg-${stage.color}-100 animate-bounce`
                                        : isCompleted
                                            ? 'bg-green-100'
                                            : 'bg-slate-100'
                                        }`}>
                                        <IconComponent
                                            className={`transition-colors duration-500 ${isActive
                                                ? `text-${stage.color}-600`
                                                : isCompleted
                                                    ? 'text-green-600'
                                                    : 'text-slate-400'
                                                }`}
                                            size={24}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-bold transition-colors duration-500 ${isActive ? 'text-slate-900' : isCompleted ? 'text-green-700' : 'text-slate-500'
                                            }`}>
                                            {stage.label}
                                        </p>
                                    </div>
                                    {isCompleted && (
                                        <div className="text-green-600 font-semibold text-sm">✓ Complete</div>
                                    )}
                                </div>

                                {/* Horizontal Progress Bar */}
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ease-out ${isActive
                                            ? `bg-gradient-to-r from-${stage.color}-400 to-${stage.color}-600 w-full`
                                            : isCompleted
                                                ? 'bg-green-500 w-full'
                                                : 'w-0'
                                            }`}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Fun Fact */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-700 px-6 py-3 rounded-full text-sm border border-sky-200">
                        <Sparkles size={16} className="animate-pulse" />
                        <span className="font-semibold">Did you know?</span>
                        <span>AI is processing thousands of data points right now!</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisLoader;
