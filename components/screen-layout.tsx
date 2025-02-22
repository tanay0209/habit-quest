import { SafeAreaView } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ScreenLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GestureHandlerRootView className="flex-1">
            <SafeAreaView className={`flex-1 px-8 py-8 bg-black`}>
                {children}
            </SafeAreaView>
        </GestureHandlerRootView >
    );
};

export default ScreenLayout;
