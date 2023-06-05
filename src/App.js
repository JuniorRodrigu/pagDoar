import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teste from "./pages/Teste";
import Sms from "./pages/Sms";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teste" element={<Teste />} />
      <Route path="/sms" element={<Sms />} />
    </Routes>
  );
}

export default App;
