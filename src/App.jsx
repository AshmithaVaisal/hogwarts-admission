import { Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import AdmissionCard from "./Pages/AdmissionCard";
import Confirmation from "./Pages/Confirmation";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/admission" element={<AdmissionCard/>}/>
      <Route path="/confirmation" element={<Confirmation/>}/>
    </Routes>
  );
};

export default App;
