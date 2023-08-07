import { RefObject, useEffect, useRef, useState } from "react";
import PrimaryButton from "./UI/PrimaryButton";
interface Props {
	appendCampaigns: (newCampaign: TCampaing) => void;
	closeCampaignForm: () => void;
	calculateCampaignHeight: (ref: RefObject<HTMLDivElement>) => void;
}

const CampaignForm = (props: Props) => {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");

	const startDateRef = useRef(null);
	const endDateRef = useRef(null);
	const discountRef = useRef<HTMLInputElement>(null);
	const campaignRef = useRef<HTMLDivElement>(null);

	const submitCampaignFormHandler = async () => {
		const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;
		const formValues: TCampaing = {
			title: title,
			description: description,
			startDate: new Date(startDate),
			endDate: new Date(endDate),
			discountValue: discountRef.current && parseFloat(discountRef.current.value),
		};
		const res = await fetch(endPointUrl + "/api/campaign/createcampaign", {
			method: "POST",
			body: JSON.stringify(formValues),
			headers: { "Content-Type": "application/json" },
		});

		const data: TCampaing = await res.json();
		props.appendCampaigns(data);
		setTitle("");
		setDescription("");
		props.closeCampaignForm();
	};

	useEffect(() => {
		props.calculateCampaignHeight(campaignRef);
	}, []);

	return (
		<div ref={campaignRef} className="flex flex-col gap-1">
			<input
				className="bg-transparent border border-[#4e4e4e] p-1 rounded-md"
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<input
				className="bg-transparent border border-[#4e4e4e] p-1 rounded-md"
				type="text"
				placeholder="Description"
				value={description}
				onChange={(e) => {
					setDescription(e.target.value);
				}}
			/>
			<input
				className="bg-transparent border border-[#4e4e4e] p-1 rounded-md"
				type="number"
				placeholder="Discount Value"
				ref={discountRef}
			/>
			<div className="flex items-center gap-2">
				Start date:
				<input
					className="bg-transparent flex-1  border border-[#4e4e4e] p-1 rounded-md "
					type="datetime-local"
					ref={startDateRef}
					onChange={(e) => setStartDate(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-2">
				End date:
				<input
					className="bg-transparent flex-1  border border-[#4e4e4e] p-1 rounded-md "
					type="datetime-local"
					ref={endDateRef}
					onChange={(e) => setEndDate(e.target.value)}
				/>
			</div>
			<PrimaryButton
				type="button"
				buttonPreset="success"
				onClick={submitCampaignFormHandler}>
				Create campaign
			</PrimaryButton>
		</div>
	);
};

export default CampaignForm;
