import Dashboard from './components/Dashboard.jsx';
import './index.css';
import LandingPage from "./LandingPage.jsx";
import { Routes, Route } from "react-router-dom";
import UploadWidget from './components/UploadWidget.jsx';
import Midjourney from './components/Midjourney.jsx'

function App() {
  return (
    <>
      <Routes>
      
        <Route path="/" element={<LandingPage />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
      {/* <Midjourney/> */}
    </>
  );
}

export default App;
