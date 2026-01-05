import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalText } from '@/components/ui/brutal-text';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { useSettingsStore } from '@/store/settings-store';
import { useWordStore } from '@/store/word-store';
import { LEVEL_OPTIONS, LanguageLevel } from '@/types/settings';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Mountain, Rocket, Sprout } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function LevelScreen() {
    const router = useRouter();
    const { translationLanguage, languageLevel, setLanguageLevel } = useSettingsStore();
    const { loadTodayWord } = useWordStore();

    const handleSelectLevel = async (level: LanguageLevel) => {
        setLanguageLevel(level);
        // Refresh the today's word immediately to match the new level
        await loadTodayWord();
        // Removed auto-back as per user request
    };

    const getLevelBadgeColor = (code: LanguageLevel) => {
        switch (code) {
            case 'beginner': return '#86EFAC'; // Green
            case 'intermediate': return '#93C5FD'; // Blue
            case 'advanced': return '#F9A8D4'; // Pink
            default: return Colors.surface;
        }
    };

    const getLevelIcon = (code: LanguageLevel) => {
        const size = 24;
        const color = Colors.border;
        const strokeWidth = 2.5;

        switch (code) {
            case 'beginner': return <Sprout size={size} color={color} strokeWidth={strokeWidth} />;
            case 'intermediate': return <Mountain size={size} color={color} strokeWidth={strokeWidth} />;
            case 'advanced': return <Rocket size={size} color={color} strokeWidth={strokeWidth} />;
            default: return null;
        }
    };

    return (
        <ScreenLayout withBottomPadding={false}>
            <ScrollView
                className="flex-1 w-full"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                {/* Header */}
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
                                backgroundColor: Colors.accentPink,
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
                            {t('settings.level', translationLanguage)}
                        </Text>
                    </View>
                </View>

                {/* Level Options */}
                <View className="flex-col gap-4 w-full pr-1">
                    {LEVEL_OPTIONS.map((option) => {
                        const isSelected = languageLevel === option.code;
                        const badgeColor = getLevelBadgeColor(option.code);

                        return (
                            <BrutalButton
                                key={option.code}
                                onPress={() => handleSelectLevel(option.code)}
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
                                    {getLevelIcon(option.code)}
                                </View>

                                <View className="flex-1">
                                    <Text className="text-border font-w-extrabold text-xl uppercase">
                                        {option.name.en}
                                    </Text>
                                    <Text className="text-text-muted font-w-bold text-xs uppercase" style={{ opacity: 0.7 }}>
                                        {option.name[translationLanguage]}
                                    </Text>
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

                {/* Info Note with Dashed Border */}
                <View
                    className="mt-10 p-6 mx-1 items-center justify-center"
                    style={{
                        borderWidth: 2,
                        borderColor: Colors.border,
                        borderStyle: 'dashed',
                        borderRadius: 12,
                    }}
                >
                    <BrutalText className="text-text-muted text-sm font-w-medium text-center leading-relaxed">
                        {t('settings.levelDescription', translationLanguage)}
                    </BrutalText>
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}
