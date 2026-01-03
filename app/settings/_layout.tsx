import { Stack } from 'expo-router';

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="account" />
            <Stack.Screen name="language" />
            <Stack.Screen name="level" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="rate" />
            <Stack.Screen name="feedback" />
        </Stack>
    );
}
