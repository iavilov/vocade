import { Colors, Layout } from '@/constants/design-tokens';
import { createBrutalShadow } from '@/utils/platform-styles';
import React from 'react';
import { Text, View, ViewProps } from 'react-native';

interface ScreenHeaderProps extends ViewProps {
    title: string;
    badgeText: string;
    badgeColor?: string;
    badgeRotate?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    titleAlign?: 'left' | 'right';
    maxWidth?: number;
}

/**
 * Reusable Screen Header with Neo-brutalist badge and title.
 * Supports left/right elements and alignment.
 */
export function ScreenHeader({
    title,
    badgeText,
    badgeColor = Colors.accentYellow,
    badgeRotate = '-2deg',
    leftElement,
    rightElement,
    titleAlign = 'left',
    maxWidth = Layout.maxContentWidth,
    className = '',
    style,
    ...props
}: ScreenHeaderProps) {
    const isRight = titleAlign === 'right';

    const TitleBlock = (
        <View className={`flex-col ${isRight ? 'items-end' : 'items-start'}`}>
            <View
                style={{
                    backgroundColor: badgeColor,
                    borderWidth: 2,
                    borderColor: Colors.border,
                    ...createBrutalShadow(2, Colors.border),
                    transform: [{ rotate: badgeRotate }],
                }}
                className="px-2 py-0.5 mb-2"
            >
                <Text className="text-border font-w-bold uppercase tracking-[2px] text-[10px]">
                    {badgeText}
                </Text>
            </View>
            <Text
                className="text-border text-2xl font-w-extrabold tracking-[2px] uppercase leading-[40px]"
                style={{ fontSize: title.length > 15 ? 24 : 32 }}
            >
                {title}
            </Text>
        </View>
    );

    return (
        <View
            className={`flex-row items-end justify-between pt-8 pb-10 w-full ${className}`}
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
