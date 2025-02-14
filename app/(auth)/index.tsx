import { View, Text } from 'react-native'
import React from 'react'
import ScreenLayout from '@/components/screen-layout'
import { Controller, useForm } from "react-hook-form"
import loginSchema from '@/schema/login-schema'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '~/components/ui/input'
import { Button } from "~/components/ui/button"

const Index = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userId: "",
            password: ""
        }
    })

    const onPress = (data: z.infer<typeof loginSchema>) => {

    }

    return (
        <ScreenLayout>
            <View className='flex-1 justify-center gap-6'>
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
                <Button onPress={handleSubmit(onPress)} className='w-full'><Text>Login</Text></Button>
            </View>
        </ScreenLayout>
    )
}

export default Index
