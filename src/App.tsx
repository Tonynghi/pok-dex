import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import About from './pages/About';
import Account from './pages/Account';
import Favorite from './pages/Favorite';
import Gallery from './pages/Gallery';
import Home from './pages/Home';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/about' element={<About />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>
  );
};

export default App;
