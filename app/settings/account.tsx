import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors, borderRadius } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { useSettingsStore } from '@/store/settings-store';
import { createBrutalShadow } from '@/utils/platform-styles';
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

            <View
                style={{
                    backgroundColor: 'white',
                    borderWidth: 3,
                    borderColor: Colors.border,
                    borderRadius: borderRadius.LARGE,
                    padding: 20,
                    width: '100%',
                    ...createBrutalShadow(4, Colors.border),
                }}
            >
                <Text className="text-gray-500 font-w-medium text-center">Account settings coming soon...</Text>
            </View>
        </ScreenLayout>
    );
}
