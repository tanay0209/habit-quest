import { SafeAreaView } from 'react-native'
import React from 'react'

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <SafeAreaView
            className="flex-1 px-8 py-8"
        >
            {children}
        </SafeAreaView>
    )
}

export default ScreenLayout
