
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  console.log("App component rendered");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
       
      </Routes>
    </div>
  );
}

export default App;
