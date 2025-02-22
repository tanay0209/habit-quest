import axios from "axios"
import { errorToast } from "./toast"

export function handleError(error: Error | unknown) {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            errorToast({ message: error.response.data.message });
        } else if (error.request) {
            errorToast({ message: "No response received from server." });
        } else {
            errorToast({ message: error.message });
        }
    } else {
        errorToast({ message: "An unknown error occurred" });
    }
}