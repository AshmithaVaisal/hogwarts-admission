import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatName } from "../utils/stringUtils";

const CommonCard = ({ name }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animation on mount
    const card = document.getElementById("common-card");
    if (card) {
      card.classList.remove("opacity-0", "scale-90");
      card.classList.add("opacity-100", "scale-100");
    }
  }, []);

  const admissionHandleClick = () => {
    navigate("/admission");
  };

  return (
    <div
      className="flex items-center justify-center p-4 min-h-screen bg-cover bg-center sm:bg-[length:100%_100%] md:bg-cover"
      style={{ backgroundImage: "url('/images/Hogwarts.jpg')" }}
    >
      {/* Animated Card Container */}
      <div
        id="common-card"
        className="opacity-0 scale-90 transform transition-all duration-700 ease-out-back w-full max-w-md bg-gray-900/80 rounded-xl shadow-2xl p-8 border border-[#d4af37]/50 backdrop-blur-sm"
      >
        {/* Crest & Header */}
        <div className="text-center mb-6">
          <div className="text-[#d4af37] text-4xl mb-2">⚯</div>
          <h1 className="text-2xl font-semibold text-[#d4af37] font-serif tracking-wide">
            Curious About Hogwarts, {formatName(name)}?
          </h1>
        </div>

        {/* Text */}
        <div className="mb-8 px-2">
          <p className="text-[#f8f5e6] text-center text-balance leading-relaxed italic">
            You've taken your first step into the wizarding world! Hogwarts
            School of Witchcraft and Wizardry is accepting applications for the
            coming term. Join our magical community and discover your true
            potential.
          </p>
        </div>

        {/* House Crests */}
        <div className="flex justify-evenly mb-8">
          <span className="text-3xl hover:scale-110 transition-transform">
            🦁
          </span>
          <span className="text-3xl hover:scale-110 transition-transform">
            🐍
          </span>
          <span className="text-3xl hover:scale-110 transition-transform">
            🦡
          </span>
          <span className="text-3xl hover:scale-110 transition-transform">
            🦅
          </span>
        </div>

        {/* Button */}
        <button
          onClick={admissionHandleClick}
          className="w-full py-3 bg-gradient-to-r from-[#740001] to-[#ae0001] text-[#eeba30] font-bold rounded-lg border border-[#d4af37] hover:shadow-[0_0_15px_#d4af37] transition-all"
        >
          Begin Your Admission Process
        </button>
      </div>
    </div>
  );
};

export default CommonCard;
