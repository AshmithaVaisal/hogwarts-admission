import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { formatName } from "../utils/stringUtils";

const LOCAL_STORAGE_KEY = "hogwarts_admission_form";

const AdmissionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const admissionCardRef = useRef(null);

  // Load data from localStorage or from location
  const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

  const [studentName, setStudentName] = useState(
    location.state?.studentName || savedData.studentName || ""
  );

  const [formData, setFormData] = useState({
    guardianName: savedData.guardianName || "",
    birthdate: savedData.birthdate || "",
    bloodStatus: savedData.bloodStatus || "Muggle-born",
    housePreference: savedData.housePreference || "",
    magicalSkills: savedData.magicalSkills || [],
    pet: savedData.pet || "",
    wandType: savedData.wandType || "",
  });

  // Animate card on mount
  useEffect(() => {
    const card = admissionCardRef.current;
    if (card) {
      card.classList.remove("opacity-0", "scale-90");
      card.classList.add("opacity-100", "scale-100");
    }
  }, []);

  // Save form data to localStorage when it changes
  useEffect(() => {
    const dataToSave = { studentName, ...formData };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [studentName, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!studentName) {
      alert("Please enter your name");
      return;
    }

    const formattedName = formatName(studentName);

    if (admissionCardRef.current) {
      admissionCardRef.current.classList.add("opacity-0", "scale-110");
    }

    // Clear localStorage after submission
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    setTimeout(() => {
      //  navigate("/admission", { });
      navigate("/confirmation", { replace: true,
        state: { studentName: formattedName, formData },
      });
    }, 500);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-no-repeat bg-center bg-cover sm:bg-[length:100%_100%] md:bg-cover p-4"
      style={{
        backgroundImage: "url('/images/harry.jpg')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div
        ref={admissionCardRef}
        className="opacity-0 scale-90 transform transition-all duration-700 ease-out-back w-full max-w-2xl bg-gray-900/70 rounded-xl shadow-2xl p-6 md:p-8 border-2 border-[#d4af37] backdrop-blur-sm"
      >
        {/* Header with Crest */}
        <div className="text-center mb-6">
          <div className="text-[#d4af37] text-4xl mb-2">⚯</div>
          <h1 className="text-3xl font-bold text-[#d4af37] font-serif tracking-wide">
            Hogwarts Admission Form
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-[#c3b8b8] mb-1 md:mb-2 font-medium">
                Student Full Name*
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-800/100 rounded-lg border border-[#d4af37]/50 text-[#c3b8b8] italic"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[#c3b8b8] mb-1 md:mb-2 font-medium">
                Guardian Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-800/100 rounded-lg border border-[#d4af37]/50 text-[#f8f5e6] italic"
                value={formData.guardianName}
                onChange={(e) =>
                  setFormData({ ...formData, guardianName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-[#c3b8b8] mb-1 md:mb-2 font-medium">
                Date of Birth*
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-800/100 rounded-lg border border-[#d4af37]/50 text-[#c3b8b8] italic"
                required
                value={formData.birthdate} // ✅ Bind the value
                onChange={(e) =>
                  setFormData({ ...formData, birthdate: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-[#c3b8b8] mb-1 md:mb-2 font-medium">
                Blood Status
              </label>
              <select
                className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-800/100 rounded-lg border border-[#d4af37]/50 text-[#c3b8b8] italic"
                value={formData.bloodStatus}
                onChange={(e) =>
                  setFormData({ ...formData, bloodStatus: e.target.value })
                }
              >
                <option value="Muggle-born">Muggle-born</option>
                <option value="Half-blood">Half-blood</option>
                <option value="Pure-blood">Pure-blood</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>

          {/* House Selection */}
          <div>
            <label className="block text-[#c3b8b8] mb-1 md:mb-2 font-medium">
              House Preference*
            </label>
            <select
              className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-800/100 rounded-lg border border-[#d4af37]/50 text-[#c3b8b8] italic"
              value={formData.housePreference}
              onChange={(e) =>
                setFormData({ ...formData, housePreference: e.target.value })
              }
              required
            >
              <option value="">Select your house preference</option>
              <option value="Gryffindor">Gryffindor 🦁</option>
              <option value="Slytherin">Slytherin 🐍</option>
              <option value="Ravenclaw">Ravenclaw 🦅</option>
              <option value="Hufflepuff">Hufflepuff 🦡</option>
            </select>
          </div>

          {/* Wand Type Selection */}
          <div>
            <label className="block text-[#c3b8b8] mb-1 md:mb-2 font-medium">
              Preferred Wand Type
            </label>
            <select
              className="w-full px-3 py-2 md:px-4 md:py-2 bg-gray-800/100 rounded-lg border border-[#d4af37]/50 text-[#c3b8b8] italic"
              value={formData.wandType}
              onChange={(e) =>
                setFormData({ ...formData, wandType: e.target.value })
              }
            >
              <option value="">Select preferred wand type</option>
              <option value="Phoenix Feather">Phoenix Feather</option>
              <option value="Dragon Heartstring">Dragon Heartstring</option>
              <option value="Unicorn Hair">Unicorn Hair</option>
              <option value="Thestral Tail Hair">Thestral Tail Hair</option>
              <option value="Veela Hair">Veela Hair</option>
            </select>
          </div>

          {/* Magical Skills */}
          <div>
            <label className="block text-[#c3b8b8] mb-1 md:mb-4 sm:mb-6 font-medium">
              Magical Skills (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 italic">
              {[
                "Herbology",
                "Potions",
                "Charms",
                "Transfiguration",
                "Divination",
                "Muggle Studies",
                "Parseltongue",
                "Wandlore",
              ].map((skill) => (
                <label key={skill} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="accent-[#d4af37]"
                    checked={formData.magicalSkills.includes(skill)}
                    onChange={(e) => {
                      const skills = e.target.checked
                        ? [...formData.magicalSkills, skill]
                        : formData.magicalSkills.filter((s) => s !== skill);
                      setFormData({ ...formData, magicalSkills: skills });
                    }}
                  />
                  <span className="text-[#c3b8b8] text-sm md:text-base">
                    {skill}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Pet Selection */}
          <div>
            <label className="block text-[#c3b8b8] mb-1 md:mb-2 font-medium">
              Magical Companion
            </label>
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
              {["Owl", "Cat", "Toad", "Rat", "None"].map((pet) => (
                <label key={pet} className="flex items-center italic">
                  <input
                    type="radio"
                    name="pet"
                    className="accent-[#d4af37]"
                    value={pet}
                    checked={formData.pet === pet}
                    onChange={(e) =>
                      setFormData({ ...formData, pet: e.target.value })
                    }
                    required
                  />
                  <span className="ml-2 text-[#c3b8b8] text-sm md:text-base">
                    {pet}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                if (admissionCardRef.current) {
                  admissionCardRef.current.classList.add(
                    "opacity-0",
                    "scale-90"
                  );
                }
                setTimeout(() => navigate(-1), 300);
              }}
              className="px-4 py-2 sm:px-6 sm:py-2 border border-[#d4af37] text-[#d4af37] rounded-lg 
             hover:bg-[#d4af37]/10 transition-all text-sm sm:text-base
             hover:shadow-[0_0_8px_2px_rgba(212,175,55,0.6)] hover:border-[#eeba30]"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 sm:px-8 sm:py-2 bg-gradient-to-r from-[#740001] to-[#ae0001] 
                 text-[#eeba30] font-bold rounded-lg border border-[#d4af37] 
                 hover:shadow-[0_0_15px_#d4af37] transition-all transform hover:scale-[1.02]
                 text-sm sm:text-base"
              disabled={!studentName || !formData.housePreference}
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
