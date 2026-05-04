import { useNavigate } from "react-router-dom";
import type { HealingPath } from "@/services/supabase/healingPathService";

interface Props {
  healingPaths: HealingPath[];
  isSubscribed: boolean;
}

const HealingPathResults = ({ healingPaths, isSubscribed }: Props) => {
  const navigate = useNavigate();

  if (healingPaths.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Healing Paths</h2>

      <div className="space-y-3">
        {healingPaths.map((path) => (
          <div
            key={path.id}
            onClick={() => navigate(`/healing-path/${path.slug}`)}
            className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
          >
            <h3 className="font-medium">{path.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {path.description}
            </p>
            {/* MUDRAS */}
            {path.mudras && path.mudras.length > 0 && (
              <div className="mt-3">
                <div
                  className={!isSubscribed ? "blur-sm pointer-events-none" : ""}
                >
                  <div className="flex gap-2 overflow-x-auto">
                    {path.mudras.map((mudra) => (
                      <div key={mudra.id} className="w-20 text-center">
                        <img
                          src={mudra.image}
                          alt={mudra.title}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <p className="text-xs mt-1">{mudra.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SESSIONS */}
            {path.sessions && path.sessions.length > 0 && (
              <div className="mt-3">
                <div
                  className={!isSubscribed ? "blur-sm pointer-events-none" : ""}
                >
                  <ul className="space-y-1">
                    {path.sessions.slice(0, 3).map((session) => (
                      <li key={session.id} className="text-sm">
                        {session.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* MESSAGE */}
            {!isSubscribed &&
              (path.mudras?.length || path.sessions?.length) && (
                <p className="text-xs text-muted mt-2 underline">
                  Subscribe to unlock full access
                </p>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealingPathResults;
