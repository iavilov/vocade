import { Tabs } from 'expo-router';
import { BookOpen, Home, Settings } from 'lucide-react-native';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { TAB_BAR_SCREEN_OPTIONS } from '@/styles/navigation';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        ...TAB_BAR_SCREEN_OPTIONS,
        tabBarButton: HapticTab,
      }}>

      <Tabs.Screen
        name="history"
        options={{
          title: 'История',
          tabBarIcon: ({ color }) => <BookOpen size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Слово дня',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
