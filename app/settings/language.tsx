import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalText } from '@/components/ui/brutal-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { useSettingsStore } from '@/store/settings-store';
import { LANGUAGE_OPTIONS } from '@/types/settings';
import { Check } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function LanguageScreen() {
    const { translationLanguage, setTranslationLanguage } = useSettingsStore();


    const getLanguageBadgeColor = (code: string) => {
        switch (code) {
            case 'ru': return '#00E090'; // Green
            case 'uk': return '#93C5FD'; // Blue
            case 'en': return '#F9A8D4'; // Pink
            case 'de': return '#FFDE00'; // Yellow
            default: return Colors.surface;
        }
    };

    return (
        <ScreenLayout withBottomPadding={false}>
            <ScrollView
                className="flex-1 w-full"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
            >
                <ScreenHeader
                    title={t('settings.selectLanguage', translationLanguage)}
                    badgeText={t('settings.title', translationLanguage)}
                    badgeColor={Colors.primary}
                    showBackButton
                />

                <View className="flex-col gap-4 w-full pr-1">
                    {LANGUAGE_OPTIONS.map((option) => {
                        const isSelected = translationLanguage === option.code;
                        const badgeColor = getLanguageBadgeColor(option.code);

                        return (
                            <BrutalButton
                                key={option.code}
                                onPress={() => setTranslationLanguage(option.code)}
                                style={{ width: '100%' }}
                                pressableStyle={{
                                    width: '100%',
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                                borderWidth={3}
                                backgroundColor={isSelected ? badgeColor : 'white'}
                            >
                                <View
                                    className="w-12 h-12 items-center justify-center border-2 mr-4"
                                    style={{
                                        backgroundColor: isSelected ? 'white' : badgeColor,
                                        borderColor: Colors.border,
                                        borderRadius: 8,
                                    }}
                                >
                                    <Text className="text-border font-w-extrabold text-lg uppercase">
                                        {option.code}
                                    </Text>
                                </View>

                                <View className="flex-1">
                                    <BrutalText className="text-border font-w-extrabold text-xl uppercase">
                                        {option.name}
                                    </BrutalText>
                                    <BrutalText className="text-text-muted font-w-bold text-xs uppercase" style={{ opacity: 0.7 }}>
                                        {option.nativeName}
                                    </BrutalText>
                                </View>

                                <View
                                    className="w-8 h-8 rounded-full items-center justify-center"
                                    style={{
                                        borderWidth: 2,
                                        borderColor: isSelected ? Colors.border : '#D1D5DB',
                                        backgroundColor: isSelected ? Colors.surface : 'transparent',
                                    }}
                                >
                                    {isSelected && <Check size={18} color={Colors.border} strokeWidth={4} />}
                                </View>
                            </BrutalButton>
                        );
                    })}
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}
