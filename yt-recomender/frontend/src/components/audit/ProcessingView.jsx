import { Loader2 } from 'lucide-react';

const ProcessingView = () => {
    return (
        <div className="py-24 text-center">
            <Loader2 size={48} className="animate-spin text-sky-500 mx-auto mb-8" />
            <h2 className="text-3xl font-bold">Ecosystem Synthesis...</h2>
        </div>
    );
};

export default ProcessingView;
