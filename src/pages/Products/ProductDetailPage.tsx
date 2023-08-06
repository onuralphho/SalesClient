import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../reducer/cartSlice";
import { sleep } from "../../utils/sleep";
import PrimaryButton from "../../components/UI/PrimaryButton";

const ProductDetailPage = () => {
	const { sku } = useParams();
	const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;

	const [sendingState, setSendingState] = useState<boolean>(false);
	const [productDetails, setProductDetails] = useState<IProducts | undefined>();
	const [startDate, setStartDate] = useState<Date>(new Date());
	const [endDate, setEndDate] = useState<Date>(new Date());
	const [difference, setDifference] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
	});
	const [isCampaignActive, setIsCampaignActive] = useState<
		boolean | undefined
	>();
	const dispatch = useDispatch();

	useEffect(() => {
		const getDetails = async () => {
			const res = await fetch(endPointUrl + "/api/product/" + sku);
			const data: IProducts = await res.json();
			setProductDetails(data);
			if (data.activeCampaign) {
				setStartDate(data.activeCampaign.startDate);
				setEndDate(data.activeCampaign?.endDate);
			}
		};
		getDetails();
	}, [sku]);

	const submitFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		var product = {
			quantity: 1,
			sku: productDetails?.sku,
			name: productDetails?.name,
			price: productDetails?.price,
		} as TCartProducts;

		console.log(product);

		if (productDetails) {
			dispatch(addItem(product));
		}
		setSendingState(true);
		await sleep(1000);
		setSendingState(false);
	};

	useEffect(() => {
		if (productDetails?.activeCampaign) {
			const timer = setInterval(() => {
				const now = new Date().getTime();
				const end = new Date(endDate).getTime();
				const start = new Date(startDate).getTime();
				const startDiff = start - now;
				if (startDiff > 0) {
					setIsCampaignActive(false);
				} else {
					setIsCampaignActive(true);
				}
				const diff = end - now;

				const days = Math.floor(diff / (1000 * 60 * 60 * 24));
				const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((diff / (1000 * 60)) % 60);

				if (diff > 0) {
					setDifference({ days, hours, minutes });
				} else {
					const resetCampaign = async () => {
						const res = await fetch(
							endPointUrl + "/api/campaign/resetcampaign/" + sku,
							{
								method: "PUT",
								headers: { "Content-Type": "application/json" },
							}
						);
						const data: IProducts = await res.json();
						setProductDetails(data);
						clearInterval(timer);
					};

					resetCampaign();
				}
			}, 1000);

			return () => {
				clearInterval(timer);
			};
		}
	}, [startDate, endDate]);

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
				className="flex flex-1 p-4 w-full relative flex-col self-center justify-between gap-8  h-fit   border-[1px] border-[#dbdbdb49] bg-[#ffffff0a] backdrop-blur-sm rounded-2xl">
				<div className="flex flex-col gap-4">
					<div className="flex">
						<h2 className="capitalize text-2xl md:text-5xl break-words font-bold">
							{productDetails?.name}
						</h2>
						{isCampaignActive && productDetails?.activeCampaign && (
							<div className="text-sm font-bold absolute group  rotate-12 flex flex-col justify-center items-center -right-4 -top-4 p-1 aspect-square rounded-full bg-green-500  ">
								<span>-{productDetails?.activeCampaign?.discountValue} %</span>
								<div className="flex flex-col border w-max p-2 bg-[#000000ab] invisible shadow-white opacity-0 translate-x-14 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all rounded-md  absolute font-normal text-xs right-5 bottom-8 -rotate-12">
									<span>{productDetails?.activeCampaign?.title}</span>
									<span>{productDetails?.activeCampaign?.description}</span>
								</div>
							</div>
						)}
					</div>
					<p className="text-lg opacity-80">{productDetails?.description}</p>
				</div>
				<div className="flex justify-between text-2xl  ">
					<div className="flex w-full justify-between gap-4">
						{isCampaignActive && productDetails?.activeCampaign ? (
							<div className="flex flex-col gap-2  md:items-end ">
								<div className="flex w-full  items-end gap-1 ">
									<span className="whitespace-nowrap">
										{productDetails?.discountedPrice} $
									</span>
									<span className="line-through text-sm opacity-80  whitespace-nowrap text-red-500">
										{productDetails?.price} $
									</span>
								</div>
								<div className="text-sm italic opacity-90">
									{difference.days} d :{" "}
									{difference.hours < 10 ? "0" + difference.hours : difference.hours} h :{" "}
									{difference.minutes < 10
										? "0" + difference.minutes
										: difference.minutes}{" "}
									m
								</div>
							</div>
						) : (
							<span className="">{productDetails?.price} $ </span>
						)}
						<div className="flex max-sm:flex-col gap-2 items-end ">
							<span className=" text-xs opacity-80">
								Stock: {productDetails?.stockCount}
							</span>

							<PrimaryButton type="submit" buttonPreset="success" animationCheck={sendingState} disabled={sendingState} >
								Add to cart
							</PrimaryButton>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ProductDetailPage;
