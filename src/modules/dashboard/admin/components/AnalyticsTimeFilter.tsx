import type { AnalyticsTimeRange } from "@/shared/types/analytics.types";

interface Props {
  value: AnalyticsTimeRange;
  onChange: (value: AnalyticsTimeRange) => void;
}

const AnalyticsTimeFilter = ({ value, onChange }: Props) => {
  const options: { label: string; value: AnalyticsTimeRange }[] = [
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "90 Days", value: "90d" },
    { label: "All Time", value: "all" },
  ];

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 rounded text-sm border border-main ${
            value === option.value
              ? "bg-[#d4af37] text-white"
              : "bg-white text-main"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default AnalyticsTimeFilter;
