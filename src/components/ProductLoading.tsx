const ProductLoading = () => {
  return (
    <>
      {Array(8)
        .fill(null)
        .map((e, i) => (
          <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-3/12 p-2 relative ">
            <div className="flex h-80 flex-col gap-2 group   overflow-hidden justify-between rounded-md relative border border-[#dbdbdb49] bg-[#ffffff0a] backdrop-blur-sm ">
                <div className="loader-inner w-[500px] h-[1000px] absolute bg-[#ffffff37] blur-2xl"></div>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProductLoading;
 