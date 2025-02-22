import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { habitIcons } from '@/lib/constants'


interface IconPickerProps {
    selectedIcon: string
    onSelect: (iconName: string) => void
}

const IconPicker = ({ selectedIcon, onSelect }: IconPickerProps) => {
    return (
        <View className="flex-row flex-wrap gap-3 justify-start w-full items-center">
            {habitIcons.map(({ name, icon: IconComponent }) => (
                <TouchableOpacity
                    key={name}
                    className={`p-1 rounded-md bg-black/70 ${selectedIcon === name ? "border-2 border-white" : "border border-white/40"
                        }`}
                    style={{ elevation: selectedIcon === name ? 6 : 3 }}
                    onPress={() => onSelect(name)}
                >
                    <IconComponent size={24} color={selectedIcon === name ? 'white' : '#6B7280'} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default IconPicker
