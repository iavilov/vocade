import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { useSettingsStore } from '@/store/settings-store';
import React from 'react';
import { Text, View } from 'react-native';

export default function AccountScreen() {
    const { translationLanguage } = useSettingsStore();

    return (
        <ScreenLayout>
            <ScreenHeader
                title={t('settings.account', translationLanguage)}
                badgeText={t('settings.title', translationLanguage)}
                showBackButton
                badgeColor={Colors.primary}
            />

            <View className="bg-white border-3 border-ink rounded-brutal p-5 shadow-brutal w-full" style={{ borderColor: Colors.border }}>
                <Text className="text-gray-500 font-medium text-center">Account settings coming soon...</Text>
            </View>
        </ScreenLayout>
    );
}
