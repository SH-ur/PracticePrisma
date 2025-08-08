export default interface createOrderObject {
    name: string,
    description: string,
    quantity: number,
    unit_amount: {currency_code: string, value: "string"}
}[]
