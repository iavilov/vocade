import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalText } from '@/components/ui/brutal-text';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { useSettingsStore } from '@/store/settings-store';
import { LANGUAGE_OPTIONS } from '@/types/settings';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function LanguageScreen() {
    const router = useRouter();
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
                <View className="flex-row items-end justify-between pt-8 pb-10 w-full">
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
                                backgroundColor: Colors.accentYellow,
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
                                {t('settings.title', translationLanguage)}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 24, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>
                            {t('settings.selectLanguage', translationLanguage)}
                        </Text>
                    </View>
                </View>

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
