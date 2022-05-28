export interface Listing{
    id:string
    title:string
    image:string
    address:string
    price:number
    numOfGuests:number
    numOfBeds:number
    numOfBaths:number
    rating:number
    
}

export interface ListingsData{
    listings:Listing[]
}

export interface  deleteListingData{
    deleteListing:Listing
}

export interface deleteListingVariables{
    id:string

}