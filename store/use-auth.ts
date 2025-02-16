import { create } from "zustand"
import { handleError } from "@/utils/handle-error"
import axios from "axios"
interface IAuthState {

}

interface IAuthActions {
    login: (userId: string, password: string) => Promise<ApiResponse>
}
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL
export const useAuth = create<IAuthActions & IAuthState>((set) => ({
    login: async (userId: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/v1/login`, {
                userId,
                password
            })
            return {
                message: response.data.message,
                success: response.data.success
            }
        } catch (error: any) {
            console.log(error);
            handleError(error)
            return {
                message: error.response.data.message || "Something went wrong",
                success: error.response.data.success
            }
        }
    }
}))