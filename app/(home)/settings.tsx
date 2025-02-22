import ScreenLayout from '@/components/screen-layout';
import { useAuth } from '@/store/use-auth';
import { successToast } from '@/utils/toast';
import { useRouter } from 'expo-router';
import { LogOutIcon, User2 } from 'lucide-react-native';
import { Text, View, TouchableOpacity } from 'react-native';

const SettingItem = ({ icon: Icon, label, onPress }: { icon: any; label: string; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center gap-x-2 p-3 rounded-lg bg-gray-800 mb-2">
        <Icon size={20} color="white" />
        <Text className="text-white text-base">{label}</Text>
    </TouchableOpacity>
);

export default function SettingsScreen() {
    const logout = useAuth(state => state.logout);
    const router = useRouter()
    const logoutUser = async () => {
        const response = await logout()
        if (response.success) {
            successToast({ message: response.message })
            router.replace("/(auth)")
        }
    }
    return (
        <ScreenLayout>
            <View className="space-y-4">
                <Text className="text-lg font-bold text-white mb-4">Account</Text>
                <SettingItem icon={User2} label='Profile' onPress={() => router.push("/(home)/profile")} />
                <SettingItem icon={LogOutIcon} label="Logout" onPress={logoutUser} />
            </View>
        </ScreenLayout>
    );
}
