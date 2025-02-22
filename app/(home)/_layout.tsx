import RightHeader from "@/components/header-right";
import { useAuth } from "@/store/use-auth";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

function HomeLayout() {
    const userDetails = useAuth(state => state.userDetails)
    useEffect(() => {
        userDetails()
    }, [])
    return (
        <Stack
            screenOptions={{
                headerRight: RightHeader
            }}>
            <Stack.Screen
                name="index"
                options={{
                    title: "",
                }}
            />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
            <Stack.Screen name="profile" options={{ title: "Profile" }} />
        </Stack>
    );
}

export default gestureHandlerRootHOC(HomeLayout);
