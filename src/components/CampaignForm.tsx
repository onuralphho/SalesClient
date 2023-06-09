import { useRef, useState } from "react";
interface Props {
    appendCampaigns: (newCampaign:TCampaing) => void;
    closeCampaignForm: ()=>void;
}

const CampaignForm = (props:Props) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const startDateRef = useRef(null)
  const endDateRef = useRef(null)


  const discountRef = useRef<HTMLInputElement>(null);

  const submitCampaignFormHandler = async () => {
    const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;
    const formValues: TCampaing = {
      title: title,
      description: description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      discountValue:
        discountRef.current && parseFloat(discountRef.current.value),
    };
    const res = await fetch(endPointUrl + "/api/campaign/createcampaign", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" },
    });

    const data:TCampaing = await res.json();
    console.log(data)
    props.appendCampaigns(data);
    setTitle("");
    setDescription("");
    props.closeCampaignForm();
    
  };

  return (
    <div className="flex flex-col gap-1">
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
      <button
        type="button"
        onClick={submitCampaignFormHandler}
        className="bg-green-500 rounded-md p-1"
      >
        Create campaign
      </button>
    </div>
  );
};

export default CampaignForm;
