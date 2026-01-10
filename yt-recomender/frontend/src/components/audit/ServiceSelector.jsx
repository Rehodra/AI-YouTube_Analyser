import { CheckCircle2, ArrowRight } from "lucide-react";

const ServiceSelector = ({ formData, setFormData, onNext }) => {
  const categories = [
    {
      title: "🎯 Content Optimization",
      items: [
        { id: "1", title: "Semantic Title Engine", desc: "LLM-driven headline generation." },
        { id: "2", title: "Predictive CTR Analysis", desc: "Thumbnail saliency mapping." },
        { id: "3", title: "Multi-Platform Mastery", desc: "Cross-platform algorithm alignment." }
      ]
    },
    {
      title: "🛡️ Legal & Compliance",
      items: [
        { id: "7", title: "Copyright Protection", desc: "Content ID scanning pre-upload." },
        { id: "8", title: "Fair Use Analysis", desc: "Transformative content assessment." }
      ]
    },
    {
      title: "📊 Strategic Intelligence",
      items: [
        { id: "10", title: "Trend Intelligence", desc: "48-hour early trend detection." }
      ]
    }
  ];

  const toggleService = (id) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(id)
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Configure Intelligence Suite</h2>
        <p className="text-slate-500 mt-2">
          Select modules to deploy for this audit.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-400">
              {cat.title}
            </h3>

            {cat.items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleService(item.id)}
                className={`p-6 rounded-xl border cursor-pointer transition ${
                  formData.selectedServices.includes(item.id)
                    ? "border-sky-500 ring-2 ring-sky-100"
                    : "border-slate-200"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold">{item.title}</h4>
                  {formData.selectedServices.includes(item.id) && (
                    <CheckCircle2 size={16} className="text-sky-500" />
                  )}
                </div>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          disabled={formData.selectedServices.length === 0}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-10 py-4 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase disabled:bg-slate-200"
        >
          Initialize Deployment <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ServiceSelector;
