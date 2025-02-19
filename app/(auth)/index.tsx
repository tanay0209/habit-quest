import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '@/components/screen-layout'
import { Controller, useForm } from "react-hook-form"
import loginSchema from '@/schema/login-schema'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '~/components/ui/input'
import { Button } from "~/components/ui/button"
import { useAuth } from '@/store/use-auth'
import { successToast } from '@/utils/toast'
import { Link, useRouter } from 'expo-router'
import { Eye, EyeOff } from 'lucide-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Index = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userId: "",
            password: ""
        }
    })
    const router = useRouter()
    const login = useAuth(state => state.login)
    const [loading, setLoading] = useState(false)
    const onPress = async (data: z.infer<typeof loginSchema>) => {
        setLoading(true)
        const response = await login(data.userId, data.password)
        setLoading(false)
        if (response.success) {
            reset()
            try {
                successToast({ message: response.message })
                router.replace("/(home)")
            } catch (error) {
                console.error(error);
            }
        }
    }
    const [showPassword, setShowPassword] = useState(false)
    return (
        <ScreenLayout>
            <View className='flex-1 justify-center gap-6'>
                <Text className='text-primary text-3xl text-center'>Habit Quest</Text>
                <Text className='text-primary text-center'>Welcome back! Stay on track with your habits.</Text>
                <Controller
                    control={control}
                    name="userId"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Input
                                placeholder="Email/Username"
                                className="w-full placeholder:text-muted-foreground"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {errors.userId && <Text className="text-start text-red-500">{errors.userId.message}</Text>}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className="relative">
                            <Input
                                placeholder="Password"
                                className="w-full placeholder:text-muted-foreground pr-10"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-4"
                            >
                                {showPassword ? <EyeOff size={20} color="white" /> : <Eye color="white" size={20} />}
                            </TouchableOpacity>
                            {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
                        </View>
                    )}
                />
                <Button disabled={loading} variant="default" onPress={handleSubmit(onPress)} className='w-full'>
                    {loading ? <ActivityIndicator color="white" /> : <Text className='text-primary-foreground'>Login</Text>}
                </Button>

                <Link className='mt-4 text-center text-muted-foreground' href="/(auth)/register">
                    New User?{" "}<Text className='underline
                    '>
                        Register
                    </Text>
                </Link>
            </View>
        </ScreenLayout >
    )
}

export default Index
