import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { habitColors } from '@/lib/constants'

interface ColorPickerProps {
    selectedColor: string
    onSelect: (color: string) => void
}

const ColorPicker = ({ selectedColor, onSelect }: ColorPickerProps) => {
    return (
        <View className="flex-row flex-wrap gap-3 items-center justify-start w-full">
            {habitColors.map((color) => (
                <TouchableOpacity
                    key={color}
                    style={{
                        backgroundColor: color,
                        width: selectedColor === color ? 40 : 30,
                        height: selectedColor === color ? 40 : 30,
                        borderRadius: 25,
                        borderWidth: selectedColor === color ? 3 : 0,
                        borderColor: selectedColor === color ? '#1E40AF' : 'transparent',
                    }}
                    onPress={() => onSelect(color)}
                />
            ))}
        </View>
    )
}

export default ColorPicker
