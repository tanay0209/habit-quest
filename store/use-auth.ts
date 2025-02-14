import { create } from "zustand"
import { handleError } from "@/utils/handle-error"

interface IAuthState {

}

interface IAuthActions {
    login: () => Promise<void>
}

const useAuth = create<IAuthActions & IAuthState>((set) => ({
    login: async () => {
        try {

        } catch (error) {
            handleError(error)
        }
    }
}))