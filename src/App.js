import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route,Routes,Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import NoteState from './Contexts/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';
import AlertState from './Contexts/Alert/AlertState';
import Profile from './Components/Authentication/Profile'
import Reset from './Components/Authentication/Reset'


function App() {
  
  return (
    <>
      <NoteState>
        <AlertState>
      <div className="App">
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container text-center">
            <Routes>
              <Route exact path="/" element={<Home/>} />
                <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/profile" element={<Profile/> } />
              <Route exact path="/reset" element={<Reset/> } />
              <Route exact path="*" element={<Navigate to="/" />} />
                </Routes>
          </div>
        </Router>
      </div>
        </AlertState>
    </NoteState>
    </>
  );
}
  
  
export default App;
