import { BrutalButton } from '@/components/ui/brutal-button';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export default function AccountScreen() {
    const router = useRouter();

    return (
        <ScreenLayout>
            <View className="flex-row items-end justify-between pt-8 pb-10 w-full" style={{ maxWidth: 400 }}>
                <BrutalButton
                    onPress={() => router.back()}
                    style={{ width: 48, height: 48, marginRight: 4 }}
                    contentContainerStyle={{ height: '100%' }}
                >
                    <ArrowLeft size={24} color={Colors.border} strokeWidth={3} />
                </BrutalButton>
                <View className="flex-col items-end">
                    <View
                        style={{
                            backgroundColor: Colors.primary,
                            borderWidth: 2,
                            borderColor: Colors.border,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            marginBottom: 4,
                            shadowColor: Colors.border,
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 1,
                            shadowRadius: 0,
                        }}
                    >
                        <Text style={{ fontSize: 10, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>
                            My Account
                        </Text>
                    </View>
                    <Text style={{ fontSize: 24, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>
                        Account
                    </Text>
                </View>
            </View>

            <View className="bg-white border-3 border-ink rounded-brutal p-5 shadow-brutal w-full" style={{ borderColor: Colors.border }}>
                <Text className="text-gray-500 font-medium text-center">Account settings coming soon...</Text>
            </View>
        </ScreenLayout>
    );
}
