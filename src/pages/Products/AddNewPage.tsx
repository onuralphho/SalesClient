import { FormEvent, useEffect, useRef, useState } from "react";

const AddNewPage = () => {
  const [campaigns, setCampaigns] = useState<TCampaing[] | undefined>();

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
  };

  const submitAddFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;
    const requestBody = {
      name: nameInput,
      price: priceRef.current?.value,
      description: descriptionInput,
      stockCount: stockCountRef.current?.value,
      campaignId: campaignInput,
    };
    console.log("request", requestBody);
    const res = await fetch(endPointUrl + "/api/product/addproduct", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    console.log("response", data);
    resetInputs();
  };

  //TODO: form will change with formik & yup
  return (
    <form
      ref={formRef}
      onSubmit={submitAddFormHandler}
      className="grid grid-cols-1 md:mx-20 sm:grid-cols-2 place-content-center gap-2  justify-center mt-5  "
    >
      <div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
        <label className="flex flex-col gap-1 " htmlFor="name">
          <span className="text-2xl">Name</span>
          <input
            className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg"
            type="text"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
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
      <div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
        <label className="flex flex-col gap-1 " htmlFor="campaign">
          <span className="text-2xl">Campaign</span>
          <select
            className=" border-[1px] bg-[#252525] border-[#4e4e4e] p-1 px-4 rounded-lg"
            id="campaign"
            value={campaignInput}
            onChange={(e) => {
              setCampaignInput(Number(e.target.value));
            }}
          >
            <option defaultValue={undefined}>Select a campaign</option>
            {campaigns?.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex  max-xl:flex-col gap-2">
        <div className="bg-[#ffffff0a] flex-1 rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
          <label className="flex flex-col gap-1 " htmlFor="price">
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

      <div></div>
      <div className="flex w-full items-end gap-1">
        <button className="border flex-1 h-max px-4 py-2 rounded-md border-[#5f5f5f] bg-[#46ff0e15] backdrop-blur-sm">
          Sumbit
        </button>
        <button
          type="button"
          onClick={resetInputs}
          className="border h-max px-4 py-2 rounded-md border-[#5f5f5f] bg-[#ff0e0e1a] backdrop-blur-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default AddNewPage;
