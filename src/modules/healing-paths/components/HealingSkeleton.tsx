export default function HealingSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-1/2 bg-soft rounded"></div>
        <div className="h-4 w-2/3 bg-soft rounded"></div>
      </div>

      {/* Card Skeleton */}
      <div className="card space-y-3">
        <div className="h-5 w-1/3 bg-soft rounded"></div>
        <div className="h-4 w-full bg-soft rounded"></div>
        <div className="h-4 w-5/6 bg-soft rounded"></div>
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card space-y-3">
            <div className="h-40 bg-soft rounded"></div>
            <div className="h-4 w-3/4 bg-soft rounded"></div>
            <div className="h-3 w-full bg-soft rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
