import './App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Navigation/>
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      <Footer/>
    </Routes>
  );
} 

export default App;
