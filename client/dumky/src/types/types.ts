export interface ICatalog {
    id:number,
    title:string
}

export interface Goods {
    id:number,
    title:string,
    content:string,
    img:string,
    price:number,
    CatalogId:number
}

export interface IBasket {
    id: number,
    BasketId: number,
    GoodId: number
}

export interface ILiked {
    id: number,
    LikedId: number,
    GoodId: number
}