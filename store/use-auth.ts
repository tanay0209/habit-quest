import { create } from "zustand"
import { handleError } from "@/utils/handle-error"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { User } from "@/lib/types"
import { BASE_URL } from "@/lib/constants"
import useHabit from "./use-habit"
interface IAuthState {
    accessToken: string | null
    refreshToken: string | null
    user: User | null
}

interface IAuthActions {
    register: (username: string, email: string, password: string) => Promise<ApiResponse>
    login: (userId: string, password: string) => Promise<ApiResponse>
    getTokens: () => { access: string | null, refresh: string | null }
    getAccessToken: () => Promise<ApiResponse>
    logout: () => Promise<ApiResponse>
    userDetails: () => Promise<ApiResponse>
    setToken: (accessToken: string, refreshToken: string) => void
    hydrate: () => Promise<void>;
}
export const useAuth = create<IAuthActions & IAuthState>((set, get) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    hydrate: async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
            set({ accessToken, refreshToken });
        }
    },
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
            });
            console.log(response);

            const expiresAt = Date.now() + 60 * 60 * 1000 * 24;

            await AsyncStorage.setItem("accessToken", response.data.data.accessToken);
            await AsyncStorage.setItem("refreshToken", response.data.data.refreshToken);
            await AsyncStorage.setItem("expiresAt", expiresAt.toString());

            set({
                accessToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken,
            });

            return {
                message: response.data.message,
                success: response.data.success,
                data: {
                    accessToken: response.data.data.accessToken,
                    refreshToken: response.data.data.refreshToken
                }
            };
        } catch (error: any) {
            handleError(error)
            return {
                message: error.response.data.message || "Something went wrong",
                success: error.response.data.success
            };
        }
    },
    getTokens: () => {
        return {
            access: get().accessToken,
            refresh: get().refreshToken
        }
    },
    getAccessToken: async () => {
        try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            const response = await axios.post(`${BASE_URL}/auth/v1/refresh-token`, {
                refreshToken
            })
            set({
                accessToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken
            })
            return {
                message: response.data.message,
                accessToken: response.data.data.accessToken,
                success: response.data.success
            }
        } catch (error: any) {
            return {
                message: error.response.data.message || "Something went wrong",
                success: error.response.data.success
            }
        }
    },
    logout: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/v1/logout`, {
                headers: {
                    authorization: `Bearer ${get().accessToken}`
                }
            })
            if (response.data.success) {
                await AsyncStorage.multiRemove(["accessToken", "refreshToken", "expiresAt"])
                set({
                    accessToken: null,
                    refreshToken: null
                })
            }
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error: any) {
            handleError(error)
            return {
                message: error.response.data.message || "Something went wrong",
                success: error.response.data.success
            }
        }
    },
    userDetails: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/auth/v1/get-user-details`, {
                headers: {
                    authorization: `Bearer ${get().accessToken}`
                }
            })
            set({
                user: response.data.data.user
            })
            useHabit.setState({
                habits: get().user?.habits
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
    setToken: (accessToken: string, refreshToken: string) => {
        set({
            accessToken,
            refreshToken
        })
    }
}))