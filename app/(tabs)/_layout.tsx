import { Tabs } from 'expo-router';
import React from 'react';

import { TabBar } from '@/components/ui/tab-bar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>

      <Tabs.Screen
        name="history"
      />

      <Tabs.Screen
        name="index"
      />

      <Tabs.Screen
        name="settings"
      />
    </Tabs>
  );
}
