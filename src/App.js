import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route,Routes,Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}
  
  
export default App;
