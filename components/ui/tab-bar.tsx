import { Colors } from '@/constants/design-tokens';
import { NavigationStyles } from '@/styles/navigation';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import { GalleryVerticalEnd, History, Settings } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [containerWidth, setContainerWidth] = useState(0);
    const tabSpace = containerWidth ? (containerWidth - 32) / state.routes.length : 100;
    const indicatorWidth = 60;

    const translateX = useSharedValue(16);

    useEffect(() => {
        if (containerWidth > 0) {
            // Center the fixed-width indicator within the tab space
            const targetX = state.index * tabSpace + 16 + (tabSpace - indicatorWidth) / 2;
            translateX.value = withSpring(targetX, {
                damping: 20,
                stiffness: 150,
                mass: 0.8,
            });
        }
    }, [state.index, tabSpace, containerWidth]);

    const onLayout = (event: LayoutChangeEvent) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

    const indicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        width: indicatorWidth,
    }));

    return (
        <View style={NavigationStyles.container} onLayout={onLayout}>
            {/* Sliding Background Indicator */}
            {containerWidth > 0 && (
                <Animated.View
                    style={[
                        NavigationStyles.indicator,
                        indicatorStyle,
                    ]}
                />
            )}

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                let Icon;
                if (route.name === 'history') {
                    Icon = History;
                } else if (route.name === 'settings') {
                    Icon = Settings;
                } else {
                    Icon = GalleryVerticalEnd;
                }

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        style={NavigationStyles.tabItem}
                    >
                        <AnimatedIcon
                            Icon={Icon}
                            isFocused={isFocused}
                        />
                    </Pressable>
                );
            })}
        </View>
    );
}

// Separate component for animated icon to handle scale
function AnimatedIcon({ Icon, isFocused }: { Icon: any, isFocused: boolean }) {
    const scale = useSharedValue(isFocused ? 1.2 : 1);

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1.2 : 1, {
            damping: 100,
            stiffness: 500,
        });
    }, [isFocused]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View style={animatedStyle}>
            <Icon
                size={22}
                color={isFocused ? Colors.border : Colors.gray500}
                strokeWidth={isFocused ? 3 : 2.5}
            />
        </Animated.View>
    );
}
