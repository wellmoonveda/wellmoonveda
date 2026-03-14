import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  isUnlocked: boolean;
  children: ReactNode;
}

export default function LockedContentGate({ isUnlocked, children }: Props) {
  if (isUnlocked) return <>{children}</>;

  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none">{children}</div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-lg text-center p-6">
        <h3 className="text-lg font-semibold text-main">
          Continue your healing journey
        </h3>

        <p className="text-muted mt-2">
          Subscribe to unlock the full healing program
        </p>

        <Link to="/user/subscription" className="btn-primary mt-4">
          Subscribe Now
        </Link>
      </div>
    </div>
  );
}
