import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function MobileMenu({ isOpen, onClose }: Props) {
  const [healingOpen, setHealingOpen] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="lg:hidden mt-4 border-t pt-4  flex flex-col space-y-4">
      {/*Home */}
      <Link
        to="/"
        onClick={onClose}
        className="text-base hover:bg-card-sand hover:!text-primary-dark  w-fit p-1 p rounded-lg"
      >
        Home
      </Link>

      {/* HEALING PATH COLLAPSIBLE */}
      <div>
        <button
          onClick={() => setHealingOpen(!healingOpen)}
          className="text-base flex justify-between text-primary hover:bg-card-sand hover:!text-primary-dark w-full p-1 rounded-lg"
        >
          Healing Path
          <span className="text-primary">{healingOpen ? "-" : "+"}</span>
        </button>

        {healingOpen && (
          <div className="ml-4 mt-2 flex flex-col space-y-2">
            <Link
              to="/healing-path/aura-healing-biofield-alignment"
              onClick={onClose}
              className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 rounded-lg"
            >
              Aura Healing & Biofield Alignment
            </Link>

            <Link
              to="/healing-path/cognitive-balance-practice"
              onClick={onClose}
              className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 rounded-lg"
            >
              Cognitive Balance Practice
            </Link>

            <Link
              to="/healing-path/mudra-healing"
              onClick={onClose}
              className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 rounded-lg"
            >
              Mudra Healing
            </Link>

            <Link
              to="/healing-path/sound-healing"
              onClick={onClose}
              className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 rounded-lg"
            >
              Sound Healing
            </Link>

            <Link
              to="/healing-path/virtual-nature-healing"
              onClick={onClose}
              className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 rounded-lg"
            >
              Virtual Nature Healing
            </Link>

            <Link
              to="/healing-path/visual-wellness-eye-exercises"
              onClick={onClose}
              className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 rounded-lg"
            >
              Visual Wellness Practice
            </Link>

            <Link
              to="/healing-path/wellness-yoga"
              onClick={onClose}
              className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 rounded-lg"
            >
              Wellness Yoga
            </Link>
          </div>
        )}
      </div>
      {/* OTHER LINKS */}
      <Link
        to="/pricing"
        onClick={onClose}
        className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 p rounded-lg"
      >
        Pricing
      </Link>

      <Link
        to="/about"
        onClick={onClose}
        className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 p rounded-lg"
      >
        About
      </Link>

      <Link
        to="/blog"
        onClick={onClose}
        className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 p rounded-lg"
      >
        Blog
      </Link>

      <Link
        to="/contact"
        onClick={onClose}
        className="hover:bg-card-sand hover:!text-primary-dark w-fit p-1 p rounded-lg"
      >
        Contact
      </Link>

      {/* AUTH */}
      <div className="flex flex-col space-y-3 pt-2">
        <Button
          variant="primary"
          onClick={() => {
            navigate("/auth/login");
            onClose();
          }}
        >
          Login
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate("/auth/signup");
            onClose();
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default MobileMenu;
