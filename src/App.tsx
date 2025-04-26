import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tracks from './components/Tracks';
import Speakers from './components/Speakers';
import FAQ from './components/FAQ';
import Sponsors from './components/Sponsors';
import Footer from './components/Footer';
import ProblemStatement from './components/ProblemStatement';  // Add this import
import Timeline from './components/Timeline'; // Import the new Timeline component
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Router>
      {/* Removed bg-[#1b2131] from the main wrapper */}
      <div className="App relative overflow-hidden text-white"> 
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero/>
              <Tracks/>
              <About/>
              <Analytics />{/* Add the Analytics component here */}
              {/* <Timeline />*/}
              <ProblemStatement/> 
              <Speakers/>
              <Sponsors/>
              <FAQ/>
            </>
          } />
          {/* Add additional routes if needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
