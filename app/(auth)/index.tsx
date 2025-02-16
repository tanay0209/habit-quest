import { View, Text } from 'react-native'
import React from 'react'
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

const Index = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userId: "Tanay Jagnani",
            password: "12345678"
        }
    })
    const router = useRouter()
    const login = useAuth(state => state.login)
    const onPress = async (data: z.infer<typeof loginSchema>) => {
        const response = await login(data.userId, data.password)
        if (response.success) {
            reset()
            router.push("/(home)")
            successToast({ message: response.message })
        }
    }

    return (
        <ScreenLayout>
            <View className='flex-1 justify-center gap-6'>
                <Text className='text-primary text-3xl text-center'>Habit Quest</Text>
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
                        <View>
                            <Input
                                placeholder="Password"
                                className="w-full placeholder:text-muted-foreground"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry
                            />
                            {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
                        </View>
                    )}
                />
                <Button variant="default" onPress={handleSubmit(onPress)} className='w-full'><Text className='text-primary-foreground'>Login</Text></Button>
                <Link href="/" className='text-muted-foreground text-right'>Forgot Password</Link>
                <Link className='mt-4 git committext-center text-muted-foreground' href="/(auth)/register">
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
