import { View, Text, StyleSheet, useColorScheme, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'
import { Link, Stack } from 'expo-router'

const index = () => {
    const theme = useColorScheme() ?? "light"
    const themeColors = Colors[theme]
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
                <StatusBar
                    barStyle={theme === "dark" ? "light-content" : "dark-content"}
                    backgroundColor={themeColors.background}
                />
                <ThemedView style={[styles.container, { backgroundColor: themeColors.background }]}>
                    <Text style={{ color: themeColors.text }}>Habit Quest!</Text>
                </ThemedView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: "white"
    }
})

export default index