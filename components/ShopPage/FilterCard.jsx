const FilterCard = () => {
  return (
    <div className="m-4 ">
      <div className="py-6 text-3xl border-b border-black">Filter By</div>
      <div className="pb-8 border-b border-black">
        <div className="mt-4 mb-2 text-2xl">Category :</div>
        <div className="text-xl leading-7 ">
          <div>All</div>
          <div>Alpha</div>
          <div>Beta</div>
          <div>Gamma</div>
          <div>Theta</div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default FilterCard;
