import React from 'react'
import ScreenLayout from '@/components/screen-layout'
import { Stack, useRouter } from 'expo-router'
import { PlusCircleIcon } from 'lucide-react-native'
import { Pressable } from 'react-native'

const index = () => {
    const router = useRouter()
    return (
        <ScreenLayout>
            <Stack.Screen
                options={{ title: "HabitQuest" }}
            />
            <Pressable onPress={() => router.push('/(habit)/create')} className='absolute bottom-16 right-8 bg-sky-400 shadow-white shadow-md rounded-full p-2'><PlusCircleIcon size={40} color="white" /></Pressable>
        </ScreenLayout>
    )
}

export default index