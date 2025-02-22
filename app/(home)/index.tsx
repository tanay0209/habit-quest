import React from 'react'
import ScreenLayout from '@/components/screen-layout'
import { Stack } from 'expo-router'

const index = () => {
    return (
        <ScreenLayout>
            <Stack.Screen
                options={{ title: "HabitQuest" }}
            />
        </ScreenLayout>
    )
}

export default index