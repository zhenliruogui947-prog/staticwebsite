import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OwnerPage from "./pages/OwnerPage";
import PrivacyPage from "./pages/PrivacyPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  );
}
