import Navbar from '../components/Navbar';
import PokeCarousel from '../components/PokeCarousel';

const Gallery = () => {
  return (
    <div>
      <Navbar />
      <div>
        <PokeCarousel limit={12} />
      </div>
    </div>
  );
};

export default Gallery;
