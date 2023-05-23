import React from "react";
import { Link } from "react-router-dom";

interface Props {
  product: IProducts;
}

const ProductCard = (props: Props) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-3/12 p-2 ">
      <div className="flex flex-col gap-2  h-full overflow-hidden justify-between rounded-md relative border border-[#dbdbdb49] bg-[#ffffff0a] backdrop-blur-sm">
        <div className="flex flex-col">
            <img
              className="object-cover h-60"
              src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_TR?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359572"
              alt=""
            />
            <div className="flex flex-col gap-2 p-2">
              <h2 className="text-3xl">{props.product.name}</h2>
              <p>{props.product.description}</p>
            </div>
        </div>
        <div className="flex p-2 gap-2 justify-end items-center text-2xl font-semibold ">
          <span className="">{props.product.price} $</span>
          <Link to={props.product.sku} className="bg-orange-500 py-0.5 items-center px-4 rounded-sm ">Buy</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
