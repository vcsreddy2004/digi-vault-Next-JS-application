export interface UserView {
    firstName:string,
    lastName:string,
    email:string,
    userName:string,
    password:string,
    accountNumber:number,
    accountType: "admin" | "savings",
    amount:number,
    lastLogIn: Date | null,
    errorMessage:string
}