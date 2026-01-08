import { Colors, Layout } from '@/constants/design-tokens';
import { createBrutalShadow } from '@/utils/platform-styles';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BrutalPressable } from './brutal-pressable';

interface ScreenHeaderProps extends ViewProps {
    title: string;
    badgeText?: string;
    badgeColor?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    titleAlign?: 'left' | 'right';
    maxWidth?: number;
    showBackButton?: boolean;
    onBackPress?: () => void;
}

/**
 * Reusable Screen Header with Neo-brutalist badge and title.
 * Supports left/right elements, alignment, and back button for secondary screens.
 */
export function ScreenHeader({
    title,
    badgeText,
    badgeColor = Colors.accentYellow,
    leftElement,
    rightElement,
    titleAlign = 'left',
    maxWidth = Layout.maxContentWidth,
    showBackButton = false,
    onBackPress,
    className = '',
    style,
    ...props
}: ScreenHeaderProps) {
    const router = useRouter();
    const isRight = titleAlign === 'right';

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    // Back button for secondary screens
    const BackButton = (
        <Animated.View
            entering={FadeInDown.duration(100)}
            className="mt-4"
        >
            <BrutalPressable
                onPress={handleBackPress}
                borderRadius={24}
                shadowOffset={2}
                style={{ width: 48, height: 48 }}
                contentContainerStyle={{ width: '100%', height: '100%' }}
            >
                <ChevronLeft size={24} color={Colors.border} strokeWidth={2.5} />
            </BrutalPressable>
        </Animated.View>
    );

    const TitleBlock = (
        <View className={`flex-col items-end ${isRight ? 'flex-row-reverse' : ''}`}>
            {badgeText && (
                <View
                    style={{
                        backgroundColor: badgeColor,
                        borderWidth: 2,
                        borderColor: Colors.border,
                        ...createBrutalShadow(2, Colors.border),
                    }}
                    className={`px-2 py-0.5`}
                >
                    <Text
                        className="text-border font-w-extrabold uppercase tracking-[2px] text-[11px]"
                    >
                        {badgeText}
                    </Text>
                </View>
            )}
            <Text
                className="text-xl font-w-extrabold uppercase tracking-[1px]"
                style={{ color: Colors.gray800 }}
            >
                {title}
            </Text>
        </View>
    );

    // If showBackButton is true, use the back button layout
    if (showBackButton) {
        return (

            <View
                className={`flex-row items-center w-full pt-6 pb-8 ${className}`}
                style={[{ maxWidth }, style]}
                {...props}
            >
                {BackButton}
                <View className="flex-1 ml-4">
                    {TitleBlock}
                </View>
            </View>


        );
    }

    // Default layout for main screens
    return (
        <View
            className={`flex-row items-center justify-between pt-8 pb-10 w-full ${className}`}
            style={[{ maxWidth }, style]}
            {...props}
        >
            {leftElement}
            {!isRight && TitleBlock}
            {rightElement}
            {isRight && TitleBlock}
        </View>
    );
}
