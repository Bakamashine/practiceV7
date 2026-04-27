
import type IRegisterValidation from "../interface/IRegisterValidation";

interface ShowErrorProps {
    error: any,
    errorKey: string
}
export default function ShowError({error, errorKey}: ShowErrorProps) {
    if (error?.errors?.[errorKey as keyof typeof error.errors]) {
        const messages = error.errors[errorKey as keyof typeof error.errors];
        return (
            <>
                {messages?.map((msg: string, i:string|number) => (
                    <p className="text-danger" key={i}>{msg}</p>
                ))}
            </>
        )
    }
    return null
}