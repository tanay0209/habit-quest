import React from 'react'
import { Stack } from 'expo-router'
import RightHeader from '@/components/header-right'

const layout = () => {
    return (
        <Stack
            screenOptions={{
                title: "",
                headerRight: RightHeader
            }}
        >
            <Stack.Screen
                options={{
                    title: "Create Habit"
                }}
                name='create'
            />
        </Stack>
    )
}

export default layout