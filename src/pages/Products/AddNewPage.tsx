import { FormEvent, useEffect, useRef, useState } from "react";
import CampaignForm from "../../components/CampaignForm";
import PrimaryButton from "../../components/UI/PrimaryButton";

const AddNewPage = () => {
	const [campaigns, setCampaigns] = useState<TCampaing[]>([]);
	const [createCampaignFormShow, setCreateCampaignFormShow] =
		useState<boolean>(false);

	const [formLoading, setFormLoading] = useState<boolean>(false);
	const [errorDetail, setErrorDetail] = useState<string>("");

	const priceRef = useRef<HTMLInputElement>(null);
	const stockCountRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const [nameInput, setNameInput] = useState<string | undefined>("");

	const [descriptionInput, setDescriptionInput] = useState<string | undefined>(
		undefined
	);

	const [campaignInput, setCampaignInput] = useState<number | undefined>(
		undefined
	);

	const appendCampaigns = (newCampaign: TCampaing) => {
		setCampaigns((prev) => [...prev, newCampaign]);
	};

	const closeCampaignForm = () => {
		setCreateCampaignFormShow(false);
	};

	useEffect(() => {
		const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;
		const getCampaings = async () => {
			const res = await fetch(endPointUrl + "/api/campaign");
			const data = await res.json();

			setCampaigns(data);
		};

		getCampaings();
	}, []);

	const resetInputs = () => {
		formRef.current?.reset();
		setDescriptionInput("");
		setNameInput("");
		setErrorDetail("");
	};

	const submitAddFormHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormLoading(true);
		const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;
		const requestBody = {
			name: nameInput,
			price: priceRef.current?.value,
			description: descriptionInput,
			stockCount: stockCountRef.current?.value,
			campaignId: campaignInput,
		};
		const res = await fetch(endPointUrl + "/api/product/addproduct", {
			method: "POST",
			body: JSON.stringify(requestBody),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();

		setFormLoading(false);
		resetInputs();

		if (data.title) {
			setErrorDetail(data.title);
		}
	};

	return (
		<div className="min-h-screen container mx-auto">
			<form
				ref={formRef}
				onSubmit={submitAddFormHandler}
				className="grid grid-cols-1 sm:grid-cols-2 place-content-center gap-2  justify-center mt-5  ">
				<div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
					<label className="flex flex-col gap-1 " htmlFor="name">
						<span className="text-2xl">Name</span>
						<input
							className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg"
							type="text"
							value={nameInput}
							onChange={(e) => {
								setNameInput(e.target.value);
								setErrorDetail("");
							}}
							id="name"
						/>
					</label>
				</div>
				<div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
					<label className="flex flex-col gap-1 " htmlFor="description">
						<span className="text-2xl">Description</span>
						<textarea
							className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-xl"
							id="description"
							value={descriptionInput}
							onChange={(e) => {
								setDescriptionInput(e.target.value);
							}}
						/>
					</label>
				</div>
				<div className="bg-[#ffffff0a]  group rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
					<div className="flex items-end  gap-2">
						<label className="flex flex-col flex-1 gap-1 " htmlFor="campaign">
							<span className="text-2xl">Campaign</span>
							<select
								className=" border-[1px] bg-[#252525] border-[#4e4e4e] p-1 px-4 rounded-lg"
								id="campaign"
								value={campaignInput}
								onChange={(e) => {
									setCampaignInput(Number(e.target.value));
								}}>
								<option defaultValue={undefined}>Select a campaign</option>
								{campaigns?.map((campaign) => (
									<option key={campaign.id} value={campaign.id}>
										{campaign.title}
									</option>
								))}
							</select>
						</label>
						<button
							type="button"
							onClick={() => {
								setCreateCampaignFormShow((prev) => !prev);
							}}
							className="border border-[#535353] p-1 rounded-md">
							Create
						</button>
					</div>
					<div
						className={` h-0 mt-2 overflow-hidden  transition-all ${
							createCampaignFormShow ? "h-56" : ""
						}`}>
						<CampaignForm
							closeCampaignForm={closeCampaignForm}
							appendCampaigns={appendCampaigns}
						/>
					</div>
				</div>
				<div className="flex max-xl:flex-col gap-2">
					<div className="bg-[#ffffff0a] flex-1 rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
						<label className="flex flex-col gap-1" htmlFor="price">
							<span className="text-2xl">Price</span>
							<input
								className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg"
								id="price"
								type="number"
								ref={priceRef}
							/>
						</label>
					</div>
					<div className="bg-[#ffffff0a] flex-1 rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
						<label className="flex flex-col gap-1 " htmlFor="stockcount">
							<span className="text-2xl">Stock Count</span>
							<input
								className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg"
								type="number"
								id="stockcount"
								ref={stockCountRef}
							/>
						</label>
					</div>
				</div>

				<div>
					<span className="text-red-400">{errorDetail}</span>
				</div>
				<div className="flex w-full items-end gap-1">
					<PrimaryButton
						animationCheck={formLoading}
						type="submit"
						buttonPreset="success"
						className="w-full">
						Submit
					</PrimaryButton>

					<PrimaryButton
						onClick={resetInputs}
						type="button"
						buttonPreset="error"
						className="w-full">
						Reset
					</PrimaryButton>
				</div>
			</form>
		</div>
	);
};

export default AddNewPage;
