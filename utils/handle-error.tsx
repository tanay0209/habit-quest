import axios from "axios"
import { errorToast } from "./toast"

export function handleError(error: Error | unknown) {
    console.log(error)
    if (axios.isAxiosError(error)) {
        errorToast({ message: error.response?.data?.message })
    } else {
        errorToast({ message: "An unknown error occurred" })
    }
}