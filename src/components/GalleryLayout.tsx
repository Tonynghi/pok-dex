import Pokemon from './Pokemon';

const GalleryLayout = (props: any) => {
  const { pokemonList } = props;
  return (
    <div className='flex justify-center '>
      <div className='grid xl:grid-cols-4 mdl:grid-cols-3 sml:grid-cols-2 gap-[5rem]'>
        {pokemonList.map((x: any) => (
          <div key={x}>
            <Pokemon pokemonName={x} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryLayout;
