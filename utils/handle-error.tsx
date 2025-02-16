import axios from "axios"
import { errorToast } from "./toast"

export function handleError(error: Error | unknown) {
    if (axios.isAxiosError(error)) {
        errorToast({ message: error.response?.data?.message || "Something went wrong" })
    } else {
        errorToast({ message: "An unknown error occurred" })
    }
}