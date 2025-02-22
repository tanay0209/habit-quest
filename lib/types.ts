import { habitSchema } from "@/schema/habit-schema"
import z from "zod"
export type User = {
    id: string,
    username: string,
    email: string,
    categoryCount: number
    categoryMax: number
    categories: Category[]
    coins: number,
    habitCount: number,
    maxHabits: number
    habits: Habit[]
}

export type Category = {
    id: string,
    icon: string,
    name: string
}

export type Habit = {
    id: string,
    title: string,
    icon: string,
    color: string,
    description?: string,
    position: number,
    streakCurrent: number,
    streakBest: number,
    habitLog: HabitLog[],
    categories: HabitCategories[]
}

export type HabitLog = {
    id: string,
    date: Date,
    completed: boolean
}

export type HabitCategories = {
    id: string,
    name: string,
    icon: true
}

export type HabitType = z.infer<typeof habitSchema>