type TCampaing = {
    id?:number
    description:string|undefined,
    discountValue:number|null,
    startDate:Date,
    endDate:Date,
    title:string
}

interface IProducts {
    activeCampaign:TCampaing | null,
    createdTime: Date,
    description: string | null,
    name:string,
    price:number,
    stockCount:number,
    discountedPrice:number | null,
    sku:string
}