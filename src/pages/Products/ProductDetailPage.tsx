import { FormEvent, ReactHTMLElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { sku } = useParams();
  const [productDetails, setProductDetails] = useState<IProducts | undefined>();

  useEffect(() => {
    const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;
    const getDetails = async () => {
      const res = await fetch(endPointUrl + "/api/product/" + sku);
      const data = await res.json();
      console.log(data);
      setProductDetails(data);
    };
    getDetails();
  }, []);

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto pb-40   max-w-[1300px] max-lg:items-center flex gap-5 md:gap-20 max-lg:flex-col  h-full p-5  ">
      <div className=" flex justify-center w-10/12 sm:w-5/12">
        <img
          className="h-auto object-cover w-full rounded-2xl"
          src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&w=1000&q=80"
          alt=""
        />
      </div>
      <form
        onSubmit={submitFormHandler}
        className="flex flex-1 p-4 w-full relative flex-col self-center justify-between gap-8  h-fit   border-[1px] border-[#dbdbdb49] bg-[#ffffff0a] backdrop-blur-sm rounded-2xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex">
            <h2 className="capitalize text-2xl md:text-5xl break-words font-bold">
              {productDetails?.name}
            </h2>
            <div className="text-sm font-bold absolute group  rotate-12 flex flex-col justify-center items-center -right-4 -top-4 p-1 aspect-square rounded-full bg-green-500  ">
              <span>-{productDetails?.activeCampaign?.discountValue} %</span>
              <div className="flex flex-col border w-max p-2 bg-[#000000ab] invisible shadow-white opacity-0 translate-x-14 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all rounded-md  absolute font-normal text-xs right-5 bottom-8 -rotate-12">
                <span>{productDetails?.activeCampaign?.title}</span>
                <span>{productDetails?.activeCampaign?.description}</span>
              </div>
              
            </div>
          </div>
          <p className="text-lg opacity-80">{productDetails?.description}</p>
        </div>
        <div className="flex justify-between text-2xl">
          <div className="flex w-full justify-between">
            {productDetails?.discountedPrice ? (
              <div className="flex  gap-3 items-center">
                <span className="">{productDetails?.discountedPrice} $</span>
                <span className="line-through text-sm opacity-80  text-red-500">
                  {productDetails?.price} $
                </span>
              </div>
            ) : (
              <span className="">{productDetails?.price} $ </span>
            )}
            <div className="flex gap-2 items-end">
              <span className=" bottom-1 left-4 text-xs opacity-80">
                Stock: {productDetails?.stockCount}
              </span>

              <button className="border border-[#ffffff48] px-4 rounded-md hover:bg-green-500 hover:border-green-500 transition-all">
                Buy
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetailPage;
