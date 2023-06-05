import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teste from "./pages/Teste";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/teste" element={<Teste />} />
    </Routes>
  );
}

export default App;
