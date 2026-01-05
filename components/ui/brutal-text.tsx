import { Colors } from '@/constants/design-tokens';
import React from 'react';
import { Platform, Text, TextProps, TextStyle } from 'react-native';

interface BrutalTextProps extends TextProps {
    children: React.ReactNode;
    className?: string;
    minimumFontScale?: number;
}

export const BrutalText: React.FC<BrutalTextProps> = ({
    children,
    className,
    style,
    minimumFontScale = 0.5,
    numberOfLines = 1,
    adjustsFontSizeToFit = true,
    ...props
}) => {
    const isWeb = Platform.OS === 'web';

    return (
        <Text
            className={className}
            style={[
                {
                    color: Colors.border,
                },
                style as TextStyle,
            ]}
            // adjustsFontSizeToFit={!isWeb && adjustsFontSizeToFit}
            minimumFontScale={minimumFontScale}
            numberOfLines={numberOfLines}
            {...props}
        >
            {children}
        </Text>
    );
};
