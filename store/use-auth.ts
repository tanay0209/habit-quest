import { create } from "zustand"
import { handleError } from "@/utils/handle-error"
import axios from "axios"
interface IAuthState {
    accessToken: string | null
    refreshToken: string | null
}

interface IAuthActions {
    register: (username: string, email: string, password: string) => Promise<ApiResponse>
    login: (userId: string, password: string) => Promise<ApiResponse>
    getTokens: () => { access: string | null, refresh: string | null }
}
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL
export const useAuth = create<IAuthActions & IAuthState>((set, get) => ({
    accessToken: null,
    refreshToken: null,
    register: async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/v1/register`, {
                username,
                email,
                password
            })
            return {
                message: response.data.message,
                success: response.data.success
            }
        } catch (error: any) {
            handleError(error)
            return {
                message: error.response.data.message || "Something went wrong",
                success: error.response.data.success
            }
        }
    },
    login: async (userId: string, password: string) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/v1/login`, {
                userId,
                password
            })
            set({
                accessToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken,
            })
            return {
                message: response.data.message,
                success: response.data.success,
                data: {
                    accessToken: response.data.data.accessToken,
                    refreshToken: response.data.data.refreshToken
                }
            }
        } catch (error: any) {
            handleError(error)
            return {
                message: error.response.data.message || "Something went wrong",
                success: error.response.data.success
            }
        }
    },
    getTokens: () => {
        return {
            access: get().accessToken,
            refresh: get().refreshToken
        }
    }
}))