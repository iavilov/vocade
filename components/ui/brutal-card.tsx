import { Colors } from '@/constants/design-tokens';
import { createBrutalShadow } from '@/utils/platform-styles';
import React from 'react';
import { View, ViewProps } from 'react-native';

interface BrutalCardProps extends ViewProps {
    children: React.ReactNode;
    maxWidth?: number;
}

export function BrutalCard({
    children,
    style,
    className = '',
    maxWidth = 400,
    ...props
}: BrutalCardProps) {
    return (
        <View
            className={`w-full bg-surface rounded-card p-5 relative ${className}`}
            style={[
                {
                    maxWidth: maxWidth,
                    borderWidth: 3,
                    borderColor: Colors.border,
                    ...createBrutalShadow(4, Colors.border),
                },
                style
            ]}
            {...props}
        >
            {children}
        </View>
    );
}
