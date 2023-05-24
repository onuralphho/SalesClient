import {useEffect,useState} from "react"



const AddNewPage = () => {
  const [campaigns, setCampaigns] = useState<TCampaing[] | undefined>();

  useEffect(() => {
    const endPointUrl = import.meta.env.VITE_ENDPOINT_URL;
    const getCampaings = async () => {
      
      const res = await fetch(endPointUrl+"/api/campaign")
      const data = await res.json();

      setCampaigns(data)
      

    } 

    getCampaings();

  },[])
  //TODO: form will change with formik & yup
  return (
    <div className="grid grid-cols-1 md:mx-20 sm:grid-cols-2 place-content-center gap-2  justify-center mt-5 ">
      <div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
        <label className="flex flex-col gap-1 " htmlFor="title">
          <span className="text-2xl">Title</span>
          <input className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg" type="text" id="title" />
        </label>
      </div>
      
      <div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
        <label className="flex flex-col gap-1 " htmlFor="price">
          <span className="text-2xl">Price</span>
          <input className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg" type="number" id="price" />
        </label>
      </div>
      <div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
        <label className="flex flex-col gap-1 " htmlFor="description">
          <span className="text-2xl">Description</span>
          <textarea className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-xl"  id="description" />
        </label>
      </div>
      <div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
        <label className="flex flex-col gap-1 " htmlFor="stockcount">
          <span className="text-2xl">Stock Count</span>
          <input className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg" type="number" id="stockcount" />
        </label>
      </div>
      <div className="bg-[#ffffff0a] rounded-lg backdrop-blur-sm border-[1px] border-[#4e4e4e] p-5">
        <label className="flex flex-col gap-1 " htmlFor="campaign">
          <span className="text-2xl">Campaign</span>
          <select className="bg-transparent border-[1px] border-[#4e4e4e] p-1 px-4 rounded-lg"  id="campaign" >
            {campaigns?.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
            ))}
          </select>
        </label>
      </div>
      
    </div>
  );
};

export default AddNewPage;
