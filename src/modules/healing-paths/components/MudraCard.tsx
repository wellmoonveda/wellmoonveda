import { useState } from "react";

export default function MudraCard({ mudra }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card cursor-pointer" onClick={() => setOpen(!open)}>
      <img src={mudra.image} alt={mudra.title} className="rounded-md mb-3" />

      <h3 className="font-semibold">{mudra.title}</h3>

      {open && (
        <div className="mt-3 text-sm text-sub">
          <p>
            <strong>Instructions:</strong> {mudra.instructions}
          </p>

          <p className="mt-2">
            <strong>Benefits:</strong> {mudra.benefits}
          </p>
        </div>
      )}
    </div>
  );
}
