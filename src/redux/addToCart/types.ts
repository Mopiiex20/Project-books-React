export enum BuyActions {
  DO_BUY = "DO_BUY",
  BUY_SUCCESS = "BUY_SUCCESS",
  BUY_FAILED = "BUY_FAILED"
}

export interface BuyBookState {
  books : any,
  quant : any

}
export interface Book {
  _id: number;
  title: string;
  description: string;
  price: number
}