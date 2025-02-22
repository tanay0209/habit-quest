import { Habit, HabitType } from './../lib/types';
import { create } from "zustand";
import { handleError } from '@/utils/handle-error';
import { useAuth } from './use-auth';
import axios from 'axios';
import { BASE_URL } from '@/lib/constants';

interface IHabitState {
    habits: Habit[] | null
}

interface IHabitActions {
    createHabit: (habit: HabitType) => Promise<ApiResponse>
}

const useHabit = create<IHabitActions & IHabitState>(() => ({
    habits: null,
    createHabit: async (habit: HabitType) => {
        try {
            const response = await axios.post(`${BASE_URL}/habit/v1/create`, habit, {
                headers: {
                    authorization: `Bearer ${useAuth.getState().accessToken}`
                },
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
    }
}))

export default useHabit