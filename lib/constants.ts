export const NAV_THEME = {
    light: {
        background: 'hsl(0 0% 100%)', // background
        border: 'hsl(240 5.9% 90%)', // border
        card: 'hsl(0 0% 100%)', // card
        notification: 'hsl(0 84.2% 60.2%)', // destructive
        primary: 'hsl(240 5.9% 10%)', // primary
        text: 'hsl(240 10% 3.9%)', // foreground
    },
    dark: {
        background: 'hsl(240 10% 3.9%)', // background
        border: 'hsl(240 3.7% 15.9%)', // border
        card: 'hsl(240 10% 3.9%)', // card
        notification: 'hsl(0 72% 51%)', // destructive
        primary: 'hsl(0 0% 98%)', // primary
        text: 'hsl(0 0% 98%)', // foreground
    },
};

export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL


export const habitColors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#F97316"
]

import { Flame, CheckSquare, Book, Dumbbell, Music, Leaf, Activity } from 'lucide-react-native'

export const habitIcons = [
    { name: "Activity", icon: Activity },
    { name: "Flame", icon: Flame },
    { name: "CheckSquare", icon: CheckSquare },
    { name: "Book", icon: Book },
    { name: "Dumbbell", icon: Dumbbell },
    { name: "Music", icon: Music },
    { name: "Leaf", icon: Leaf },
]