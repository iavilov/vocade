import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalDivider } from '@/components/ui/brutal-divider';
import { BrutalSwitch } from '@/components/ui/brutal-switch';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { useSettingsStore } from '@/store/settings-store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import {
  ChevronRight,
  Clock,
  Gavel,
  Languages,
  LogOut,
  MessageSquare,
  ShieldCheck,
  Star,
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Linking,
  Modal,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';
import Animated, { FadeInUp, FadeOutUp, Layout } from 'react-native-reanimated';

export default function SettingsScreen() {
  const router = useRouter();
  const { userEmail } = useSettingsStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState(new Date(new Date().setHours(9, 0, 0, 0)));
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onTimeChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || notificationTime;
    setShowTimePicker(Platform.OS === 'ios');
    setNotificationTime(currentDate);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, alignItems: 'center' }}
      >
        {/* Header */}
        <View className="flex-row items-end justify-between pt-8 pb-10 w-full" style={{ maxWidth: 400 }}>
          <View className="flex-col">
            <View
              style={{
                backgroundColor: Colors.primary,
                borderWidth: 2,
                borderColor: Colors.border,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginBottom: 4,
                shadowColor: Colors.border,
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: 1,
                shadowRadius: 0,
                transform: [{ rotate: '-2deg' }],
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>
                My Account
              </Text>
            </View>
            <Text style={{ fontSize: 32, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>
              Settings
            </Text>
          </View>
        </View>

        {/* Main Settings Card */}
        <View
          className="bg-white border-3 border-ink rounded-brutal p-5 shadow-brutal w-full mb-8"
          style={{ borderColor: Colors.border, maxWidth: 400 }}
        >
          {/* Account */}
          <BrutalButton
            onPress={() => router.push('/settings/account')}
            borderRadius={8}
            borderWidth={2}
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'stretch' }}
            pressableStyle={{ width: '100%', alignItems: 'stretch', padding: 8 }}
          >
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-10 h-10 items-center justify-center rounded-full mr-3 border-2"
                  style={{ backgroundColor: '#86EFAC', borderColor: Colors.border }}
                >
                  <User size={20} color={Colors.border} strokeWidth={3} />
                </View>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Account</Text>
                  <Text className="text-gray-500 text-xs font-medium">{userEmail}</Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.border} />
            </View>
          </BrutalButton>

          <BrutalDivider className="my-8" />

          {/* Language */}
          <BrutalButton
            onPress={() => router.push('/settings/language')}
            borderRadius={8}
            borderWidth={2}
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'stretch' }}
            pressableStyle={{ width: '100%', alignItems: 'stretch', padding: 8 }}
          >
            <View className="flex-row items-center justify-between w-full">
              <View className="flex-row items-center flex-1">
                <View
                  className="w-10 h-10 items-center justify-center rounded-brutal mr-3 border-2"
                  style={{ backgroundColor: Colors.accentYellow, borderColor: Colors.border }}
                >
                  <Languages size={20} color={Colors.border} strokeWidth={3} />
                </View>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Language</Text>
                  <Text className="text-gray-500 text-xs font-medium">Russian (Default)</Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.border} />
            </View>
          </BrutalButton>

          {Platform.OS !== 'web' && <BrutalDivider className="my-8" />}

          {/* Notifications Toggle - Mobile Only */}
          {Platform.OS !== 'web' && (
            <View className="py-2">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '900', color: Colors.border }}>DAILY NOTIFICATIONS</Text>
                  <Text className="text-gray-500 text-xs font-medium">Word of the day reminders</Text>
                </View>
                <BrutalSwitch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              </View>

              {/* Time Selection Block */}
              {notificationsEnabled && (
                <Animated.View
                  entering={FadeInUp.springify().damping(100).stiffness(500)}
                  exiting={FadeOutUp.duration(100)}
                  layout={Layout.springify()}
                  style={{
                    position: 'relative',
                    paddingRight: 3,
                    paddingBottom: 3
                  }}
                >
                  <BrutalButton
                    onPress={() => setShowTimePicker(true)}
                    backgroundColor="#FFFAF0"
                    borderRadius={8}
                    borderWidth={2}
                    style={{ width: '100%' }}
                    contentContainerStyle={{ alignItems: 'stretch' }}
                    pressableStyle={{ width: '100%', padding: 12 }}
                  >
                    <View className="flex-row items-center justify-between w-full">
                      <View className="flex-row items-center">
                        <Clock size={18} color="#6B7280" />
                        <Text style={{ fontSize: 12, fontWeight: '900', color: Colors.border, textTransform: 'uppercase', marginLeft: 4 }}>Time</Text>
                      </View>
                      <View
                        className="bg-white border-2 border-ink px-3 py-1 rounded-brutal"
                        style={{ borderColor: Colors.border }}
                      >
                        <Text style={{ fontSize: 14, fontWeight: '900', color: Colors.border }}>{formatTime(notificationTime)}</Text>
                      </View>
                    </View>
                  </BrutalButton>
                </Animated.View>
              )}

              {/* Native Time Picker (iOS Modal / Android Dialog) */}
              {showTimePicker && notificationsEnabled && (
                Platform.OS === 'ios' ? (
                  <Modal transparent animationType="slide" visible={showTimePicker}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'transparent' }}>
                      <View
                        style={{
                          backgroundColor: '#FFFAF0',
                          padding: 24,
                          borderTopLeftRadius: 24,
                          borderTopRightRadius: 24,
                          borderTopWidth: 4,
                          borderColor: Colors.border,
                          shadowColor: Colors.border,
                          shadowOffset: { width: 0, height: -10 },
                          shadowOpacity: 0.1,
                          shadowRadius: 20,
                        }}
                      >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                          <Text style={{ fontSize: 18, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Select Time</Text>
                          <BrutalButton
                            onPress={() => setShowTimePicker(false)}
                            backgroundColor={Colors.primary}
                            borderWidth={2}
                            borderRadius={8}
                            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                          >
                            <Text style={{ fontSize: 14, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Done</Text>
                          </BrutalButton>
                        </View>
                        <DateTimePicker
                          value={notificationTime}
                          mode="time"
                          is24Hour={true}
                          display="spinner"
                          onChange={onTimeChange}
                          textColor={Colors.border}
                        />
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <DateTimePicker
                    value={notificationTime}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onTimeChange}
                  />
                )
              )}
            </View>
          )}
        </View>

        {/* Support & Legal Badge */}
        <View className="w-full items-center mb-6" style={{ maxWidth: 400 }}>
          <View className="absolute w-full h-[3px] bg-ink border-t-2 border-dashed top-1/2" style={{ borderColor: Colors.border }} />
          <View
            style={{
              backgroundColor: Colors.background,
              borderWidth: 2,
              borderColor: Colors.border,
              paddingHorizontal: 16,
              paddingVertical: 4,
              shadowColor: Colors.border,
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 0,
              transform: [{ rotate: '-2deg' }],
              zIndex: 10,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: '900', color: Colors.border, textTransform: 'uppercase', letterSpacing: 1 }}>
              Support & Legal
            </Text>
          </View>
        </View>

        {/* Support Options */}
        <View className="flex-col gap-3 w-full mb-8" style={{ maxWidth: 400 }}>
          <BrutalButton
            onPress={() => router.push('/settings/rate')}
            borderWidth={2}
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'stretch' }}
            pressableStyle={{ width: '100%', padding: 16 }}
          >
            <View className="flex-row justify-between items-center w-full">
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 items-center justify-center rounded-md mr-3 border-2"
                  style={{ backgroundColor: Colors.accentPink, borderColor: Colors.border }}
                >
                  <Star size={20} color={Colors.border} strokeWidth={3} />
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Rate the app</Text>
                  <Text className="text-gray-500 text-xs font-medium">Love Vocade? Let us know!</Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.border} />
            </View>
          </BrutalButton>

          <BrutalButton
            onPress={() => router.push('/settings/feedback')}
            borderWidth={2}
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'stretch' }}
            pressableStyle={{ width: '100%', padding: 16 }}
          >
            <View className="flex-row justify-between items-center w-full">
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 items-center justify-center rounded-md mr-3 border-2"
                  style={{ backgroundColor: '#93C5FD', borderColor: Colors.border }}
                >
                  <MessageSquare size={20} color={Colors.border} strokeWidth={3} />
                </View>
                <View>
                  <Text style={{ fontSize: 14, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Feedback</Text>
                  <Text className="text-gray-500 text-xs font-medium">Report a bug or suggest features</Text>
                </View>
              </View>
              <ChevronRight size={20} color={Colors.border} />
            </View>
          </BrutalButton>

          <View className="flex-row gap-3">
            <BrutalButton
              onPress={() => Linking.openURL('https://vocade.app/terms')}
              borderWidth={2}
              style={{ flex: 1 }}
              contentContainerStyle={{}}
              pressableStyle={{ width: '100%', padding: 12 }}
            >
              <View className="flex-row items-center justify-center">
                <Gavel size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 12, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Terms</Text>
              </View>
            </BrutalButton>

            <BrutalButton
              onPress={() => Linking.openURL('https://vocade.app/privacy')}
              borderWidth={2}
              style={{ flex: 1 }}
              contentContainerStyle={{}}
              pressableStyle={{ width: '100%', padding: 12 }}
            >
              <View className="flex-row items-center justify-center">
                <ShieldCheck size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 12, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>Privacy</Text>
              </View>
            </BrutalButton>
          </View>
        </View>

        {/* Logout Button */}
        <BrutalButton
          onPress={handleLogout}
          shadowOffset={0}
          borderWidth={2}
          borderColor="#D1D5DB"
          backgroundColor="transparent"
          style={{ width: '100%', maxWidth: 400 }}
          contentContainerStyle={{}}
          pressableStyle={{ padding: 12, width: '100%' }}
        >
          <View className="flex-row items-center justify-center">
            <LogOut size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: '900', color: '#9CA3AF', textTransform: 'uppercase' }}>Log Out</Text>
          </View>
        </BrutalButton>

        <View className="mt-8 mb-4">
          <View className="border border-dashed border-gray-300 rounded-sm px-3 py-1">
            <Text style={{ fontSize: 10, fontWeight: '500', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1 }}>
              Version 1.0.4 (Build 42)
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
