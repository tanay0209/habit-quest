import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '@/components/screen-layout'
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import registerSchema from '@/schema/register-schema'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '~/components/ui/input'
import { Button } from "~/components/ui/button"
import { useAuth } from '@/store/use-auth'
import { successToast } from '@/utils/toast'
import { Link, useRouter } from 'expo-router'
import { Eye, EyeOff } from 'lucide-react-native'

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const router = useRouter()
    const register = useAuth(state => state.register)

    const onPress = async (data: z.infer<typeof registerSchema>) => {
        setLoading(true)
        const response = await register(data.email, data.username, data.password)
        setLoading(false)
        if (response.success) {
            reset()
            router.push("/(auth)")
            successToast({ message: response.message })
        }
    }

    return (
        <ScreenLayout>
            <View className='flex-1 justify-center gap-6'>
                <Text className='text-primary text-3xl text-center'>Habit Quest</Text>
                <Text className='text-primary text-center'>Build better habits, one day at a time!</Text>

                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Input
                                placeholder="Username"
                                className="w-full placeholder:text-muted-foreground"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {errors.username && <Text className="text-red-500">{errors.username.message}</Text>}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View>
                            <Input
                                placeholder="Email"
                                className="w-full placeholder:text-muted-foreground"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
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
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className="relative">
                            <Input
                                placeholder="Confirm Password"
                                className="w-full placeholder:text-muted-foreground pr-10"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry={!showConfirmPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-4"
                            >
                                {showConfirmPassword ? <EyeOff color="white" size={20} /> : <Eye size={20} color="white" />}
                            </TouchableOpacity>
                            {errors.confirmPassword && <Text className="text-red-500">{errors.confirmPassword.message}</Text>}
                        </View>
                    )}
                />

                <Button disabled={loading} variant="default" onPress={handleSubmit(onPress)} className='w-full'>
                    {loading ? <ActivityIndicator color="white" /> : <Text className='text-primary-foreground'>Register</Text>}
                </Button>

                <Link className='mt-4 text-center text-muted-foreground' href="/(auth)">
                    Existing User? <Text className='underline'>Login</Text>
                </Link>
            </View>
        </ScreenLayout>
    )
}

export default Register
