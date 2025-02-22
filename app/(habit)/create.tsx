import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import ScreenLayout from '@/components/screen-layout'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { habitSchema } from '@/schema/habit-schema'
import { useAuth } from '@/store/use-auth'
import { Input } from '@/components/ui/input'
import z from "zod"
import ColorPicker from '@/components/color-picker'
import IconPicker from '@/components/icon-picker'
import * as Icons from 'lucide-react-native'
import { Button } from '@/components/ui/button'
import useHabit from '@/store/use-habit'
import { errorToast, successToast } from '@/utils/toast'

type IconName = keyof typeof Icons;

const CreateHabit = () => {
    const user = useAuth(state => state.user)
    const [loading, setLoading] = useState(false)
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<z.infer<typeof habitSchema>>({
        resolver: zodResolver(habitSchema),
        defaultValues: {
            title: "",
            description: "",
            icon: "Activity",
            color: "#F87171",
        }
    })

    const [selectedColor, setSelectedColor] = useState("#F87171")
    const [selectedIcon, setSelectedIcon] = useState<IconName>("Activity")
    const create = useHabit(state => state.createHabit)
    const onPress = async (data: any) => {
        setLoading(true)
        if (user?.maxHabits === user?.habitCount) {
            errorToast({ message: "Habit limit exhausted, buy more to proceed!" })
            setLoading(false)
            return
        }
        const response = await create(data)
        console.log(response);
        if (response.success) {
            successToast({ message: response.message })
            reset()
        }
        setLoading(false)
    }

    const IconComponent = (Icons[selectedIcon] as React.ComponentType<{ size: number; color: string }>)

    return (
        <ScreenLayout>
            <View className="flex-1 justify-center gap-6 items-center">
                <View
                    style={{ backgroundColor: selectedColor }}
                    className="w-16 h-16 rounded-full justify-center items-center"
                >
                    <IconComponent size={36} color="#FFF" />
                </View>

                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className='w-full'>
                            <Input
                                placeholder="Title"
                                className="w-full rounded-lg"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {errors.title && <Text className="text-red-500">{errors.title.message}</Text>}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className='w-full'>
                            <Input
                                placeholder="Description"
                                className="w-full rounded-lg"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                            />
                            {errors.description && <Text className="text-red-500">{errors.description.message}</Text>}
                        </View>
                    )}
                />

                <ColorPicker
                    selectedColor={selectedColor}
                    onSelect={(color) => {
                        setSelectedColor(color)
                        setValue('color', color)
                    }}
                />

                <IconPicker
                    selectedIcon={selectedIcon}
                    onSelect={(iconName) => {
                        setSelectedIcon(iconName as IconName)
                        setValue('icon', `<${iconName}/>`)
                    }}
                />

                <Button disabled={loading} variant="default" onPress={handleSubmit(onPress)} className='w-full'>
                    {loading ? <ActivityIndicator color="white" /> : <Text className='text-primary-foreground'>Create</Text>}
                </Button>

            </View>
        </ScreenLayout>
    )
}

export default CreateHabit