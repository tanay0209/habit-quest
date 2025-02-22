import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Coins, Settings } from 'lucide-react-native'
import { useAuth } from '@/store/use-auth'
import { useRouter } from 'expo-router'

const RightHeader = () => {
    const user = useAuth(state => state.user)
    const router = useRouter()
    return (
        <View className="flex-row items-center gap-x-4">
            <View className="flex-row items-center gap-x-2">
                <Coins color="#eab308" />
                <Text className="text-yellow-500">{user?.coins}</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(home)/settings")}>
                <Settings size={20} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default RightHeader