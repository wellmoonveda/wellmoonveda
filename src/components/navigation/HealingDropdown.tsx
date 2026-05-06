import { useState } from "react";
import { Link } from "react-router-dom";

const healingPaths = [
  {
    name: "Aura Healing & Biofield Alignment",
    to: "/healing-path/aura-healing-biofield-alignment",
  },
  {
    name: "Cognitive Balance Practice",
    to: "/healing-path/cognitive-balance-practice",
  },
  { name: "Mudra Healing", to: "/healing-path/mudra-healing" },
  { name: "Sound Healing", to: "/healing-path/sound-healing" },
  {
    name: "Virtual Nature Healing",
    to: "/healing-path/virtual-nature-healing",
  },
  {
    name: "Visual Wellness Practice",
    to: "/healing-path/visual-wellness-eye-exercises",
  },
  { name: "Wellness Yoga", to: "/healing-path/wellness-yoga" },
];

function HealingDropdown() {
  const [open, setOpen] = useState(false);
  // We can remove the click-outside logic since hover handles the state naturally

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <button className="font-body text-lg font-medium cursor-pointer text-primary-dark hover:text-accent transition-colors pb-4 -mb-4">
        Healing Path
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute left-0 mt-2 w-72 rounded-2xl bg-white shadow-xl border border-[#e5d8c8] p-3 z-50
          transition-all duration-200 ease-in-out
          ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible"}
        `}
      >
        <ul className="space-y-2">
          {healingPaths.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-lg text-primary hover:!text-primary hover:bg-card-sand/30 transition"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HealingDropdown;
