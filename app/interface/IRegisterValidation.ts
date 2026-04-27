import type IBaseValidation from "./IBaseValidation";

export default interface IRegisterValidation extends IBaseValidation {
    errors: {
        FullName?: string[],
        Password?: string[],
        PhoneNumber: string[]
    }
}