import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ValentinePage from './pages/ValentinePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valentine" element={<ValentinePage />} />
      </Routes>
    </Router>
  );
}

export default App;
