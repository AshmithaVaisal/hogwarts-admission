import { useState, useRef, useEffect } from "react";
import CommonCard from "../Components/CommonCard";
import { formatName } from "../utils/stringUtils";

const LOCAL_STORAGE_KEY = "hogwarts_landing_name";

const Landing = () => {
  const [name, setName] = useState(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || "";
  });

  const [showCommonCard, setShowCommonCard] = useState(false);
  const landingCardRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, name);
  }, [name]);

  const handleClick = (e) => {
    if (name.trim()) {
      const formattedName = formatName(name);
      setName(formattedName);

      if (landingCardRef.current) {
        landingCardRef.current.classList.add("opacity-0", "scale-110");
      }

      setTimeout(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY); // optional: clear on entry
        setShowCommonCard(true);
      }, 500);
    }
  };

  if (showCommonCard) {
    return <CommonCard name={name} />;
  }

  return (
    <div
      className="flex items-center justify-center p-4 min-h-screen bg-cover bg-center sm:bg-[length:100%_100%] md:bg-cover"
      style={{ backgroundImage: "url('/images/Hogwarts.jpg')" }}
    >
      <div
        ref={landingCardRef}
        className="w-full max-w-md bg-gray-900/50 rounded-xl shadow-2xl p-8 border border-[#d4af37]/20 backdrop-blur-sm transform transition-all duration-500 ease-in-out"
      >
        {/* Header with Crest */}
        <div className="text-[#d4af37] text-4xl mb-4 text-center animate-pulse-slow">
          ⚯
        </div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#d4af37] font-serif tracking-wide">
            Hogwarts Visitor Entrance
          </h1>
        </div>

        <div className="space-y-8">
          {/* Name Input */}
          <div>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-800/70 border-2 border-[#d4af37]/20 rounded-lg 
                text-[#f8f5e6] placeholder-[#d4af37]/60 focus:outline-none focus:ring-1 
                focus:ring-[#d4af37] focus:border-transparent transition-all duration-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleClick}
            className="w-full py-3 bg-gradient-to-r from-[#740001] to-[#ae0001] 
               text-[#eeba30] font-bold rounded-lg border-2 border-[#d4af37] 
               hover:shadow-[0_0_15px_#d4af37] transition-all hover:scale-[1.02] active:scale-95"
          >
            Enter Magical Realm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
