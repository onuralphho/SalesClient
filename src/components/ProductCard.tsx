import React from "react";
import { Link } from "react-router-dom";

interface Props {
  product: IProducts;
}

const ProductCard = (props: Props) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-3/12 p-2 relative ">
      {props.product.activeCampaign && (
        <div className="text-sm font-bold absolute group z-20  rotate-12 flex flex-col justify-center items-center -right-0 -top-1 p-1 aspect-square rounded-full bg-green-500  ">
          <span>-{props.product.activeCampaign?.discountValue} %</span>
          <div className="flex flex-col border w-max p-2 bg-[#000000ab] invisible shadow-white opacity-0 -translate-y-14 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all rounded-md  absolute font-normal text-xs right-10 -bottom-8 -rotate-12">
            <span>{props.product.activeCampaign?.title}</span>
            <span>{props.product.activeCampaign?.description}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 group  h-full overflow-hidden justify-between rounded-md relative border border-[#dbdbdb49] bg-[#ffffff0a] backdrop-blur-sm ">
        <div className="flex flex-col">
          <img
            className="object-cover h-80  transition-all"
            src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&w=1000&q=80"
            alt=""
          />
          <div className="flex flex-col gap-2 p-2">
            <h2 className="text-3xl font-bold">{props.product.name}</h2>
            <p className="opacity-70">{props.product.description}</p>
          </div>
        </div>
        <div className="flex p-2 gap-2 justify-between items-end text-xl  font-semibold ">
          {props.product.discountedPrice ? (
            <div className="flex  gap-3 items-center">
              <span className="">{props.product.discountedPrice} $</span>
              <span className="line-through text-sm opacity-80  text-red-500">
                {props.product.price} $
              </span>
            </div>
          ) : (
            <span className="">{props.product.price} $ </span>
          )}

          {props.product.stockCount > 0 ? (
            <Link
              to={props.product.sku}
              className=" py-0.5 items-center text-lg px-4 rounded-md border group-hover:bg-green-600 group-hover:border-green-600 transition-all"
            >
              Buy
            </Link>
          ) : (
            <span className="text-sm">Out of stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
