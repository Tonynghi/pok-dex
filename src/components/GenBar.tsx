const GenButton = (props: any) => {
  const { gen } = props;
  return (
    <div className='w-[1.25rem] h-[1.25rem] flex justify-center items-center rounded-full border-2 border-black bg-white hover:bg-black duration-200 text-[0.5rem] text-black hover:text-white font-bold'>
      {gen}
    </div>
  );
};

const GenBar = () => {
  return (
    <div className='w-[15.25rem] h-[1.25rem] flex flex-row justify-between relativ self-center'>
      <GenButton gen='I' />
      <GenButton gen='II' />
      <GenButton gen='III' />
      <GenButton gen='IV' />
      <GenButton gen='V' />
      <GenButton gen='VI' />
      <GenButton gen='VII' />
      <GenButton gen='VIII' />
      <GenButton gen='IX' />
    </div>
  );
};

export default GenBar;
