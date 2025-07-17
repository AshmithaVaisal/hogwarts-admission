import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatName } from "../utils/stringUtils";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentName, formData } = location.state || {};

  useEffect(() => {
    // Trigger animation on mount
    const card = document.getElementById("acceptance-card");
    if (card) {
      card.classList.remove("opacity-0", "scale-50");
      card.classList.add("opacity-100", "scale-100");
    }
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-gray-900 p-4 sm:bg-[length:100%_100%] md:bg-cover"
      style={{
        backgroundImage: "url('/images/outside.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div
        id="acceptance-card"
        className="relative opacity-0 scale-50 transform transition-all duration-700 ease-out-back w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900/50 rounded-xl shadow-2xl p-8 border-2 border-[#d4af37] backdrop-blur-sm text-center"
      >
        {/* X Close Button */}
        <button
          onClick={() => window.location.replace("/")}
          className="absolute top-4 right-4 text-[#eeba30] text-xl font-bold hover:text-red-500 transition"
          title="Close"
        >
          ×
        </button>

        <div className="text-[#d4af37] text-5xl mb-4">🦉</div>
        <h1 className="text-3xl font-bold text-[#eeba30] font-serif mb-6">
          Congratulations!
        </h1>

        <div className="text-[#aa9f9f] text-lg mb-6 leading-relaxed">
          <p>
            Dear{" "}
            <span className="text-[#eeba30] font-medium font-serif">
              {formatName(studentName) || "Future Wizard"}
            </span>
            ,
          </p>

          <p className="mt-4 italic text-[#aa9f9f]">
            "We are absolutely delighted to inform you that you have been
            accepted at Hogwarts School of Witchcraft and Wizardry. The Sorting
            Hat has spoken, and we joyfully welcome you to{" "}
            <span className="not-italic text-[#eeba30] font-medium font-serif">
              {formData?.housePreference || "your new magical home"}
            </span>
            !"
          </p>

          <p className="mt-6 text-[#aa9f9f] italic">
            Your Magical Journey begins Soon.
          </p>

          <p className="text-[#ffffff] mt-6">
            Remember - help will always be given at Hogwarts to those who ask
            for it.
          </p>

          <p className="font-serif mt-6">With warmest regards,</p>
          <p className="font-serif text-[#d4af37]">Albus Dumbledore</p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
