export interface transaction {
    fromAccount:number,
    toAccount:number,
    amount:number,
    type:"transfer" | "deposit" | "withdrawal",
    timeStamp:Date,
    errorMessage:string,
}