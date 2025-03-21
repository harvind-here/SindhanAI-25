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


function App() {
  return (
    <Router>
      <div className="App relative overflow-hidden bg-[#1b2131] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Speakers />
              <Tracks />
              <ProblemStatement />  
              <FAQ />
              <Sponsors />
            </>
          } />
          {/* Add additional routes if needed */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
