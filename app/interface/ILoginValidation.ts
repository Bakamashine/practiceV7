import type IBaseValidation from "./IBaseValidation";

export default interface ILoginValidation extends IBaseValidation {
    errors: {
        Password?: string[],
        PhoneNumber: string[]
    }
}