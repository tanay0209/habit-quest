import { toast } from "sonner-native"

type ToastProps = {
    message: string
}

export const successToast = ({ message }: ToastProps) => {
    return toast.success(message)
}

export const errorToast = ({ message }: ToastProps) => {
    return toast.error(message)
}