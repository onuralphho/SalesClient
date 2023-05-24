type TCampaing = {
    description:string,
    discountValue:number,
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