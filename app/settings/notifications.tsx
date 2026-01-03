import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalSwitch } from '@/components/ui/brutal-switch';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import {
  getNotificationSettings,
  requestNotificationPermissions,
  saveNotificationSettings,
} from '@/lib/notifications';
import { useSettingsStore } from '@/store/settings-store';
import { createBrutalShadow } from '@/utils/platform-styles';
import { useRouter } from 'expo-router';
import { Bell, ChevronLeft, Clock } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

export default function NotificationsScreen() {
  const router = useRouter();
  const { translationLanguage } = useSettingsStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState('09:00');
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await getNotificationSettings();
      setNotificationsEnabled(settings.enabled);
      setNotificationTime(settings.time);

      // Check permission status
      const permission = await requestNotificationPermissions();
      setHasPermission(permission);
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleNotifications = async (value: boolean) => {
    if (value && !hasPermission) {
      // Request permission
      const granted = await requestNotificationPermissions();
      if (!granted) {
        Alert.alert(
          t('notifications.permissionDenied', translationLanguage),
          t('notifications.permissionMessage', translationLanguage)
        );
        return;
      }
      setHasPermission(true);
    }

    setNotificationsEnabled(value);
    await saveNotificationSettings(value, notificationTime);
  };

  const handleTimeChange = async (time: string) => {
    setNotificationTime(time);
    if (notificationsEnabled) {
      await saveNotificationSettings(true, time);
    }
  };

  const timeOptions = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
  ];

  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-muted text-base font-w-medium">
            {t('common.loading', translationLanguage)}
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between pt-8 pb-6 w-full">
          <Pressable onPress={() => router.back()} className="mr-4">
            <View
              className="w-12 h-12 items-center justify-center rounded-full"
              style={{
                backgroundColor: Colors.surface,
                borderWidth: 3,
                borderColor: Colors.border,
              }}
            >
              <ChevronLeft size={24} color={Colors.border} strokeWidth={2.5} />
            </View>
          </Pressable>

          <View className="flex-1">
            <Text className="text-border text-3xl font-w-extrabold tracking-tight uppercase">
              {t('settings.notifications', translationLanguage)}
            </Text>
          </View>
        </View>

        {/* Main Toggle */}
        <View
          className="w-full mb-6 p-6 rounded-xl"
          style={{
            backgroundColor: Colors.surface,
            borderWidth: 3,
            borderColor: Colors.border,
            ...createBrutalShadow(4, Colors.border),
          }}
        >
          <View className="flex-row items-center mb-2">
            <Bell size={24} color={Colors.border} strokeWidth={2.5} />
            <Text className="ml-3 text-border text-lg font-w-extrabold">
              {t('settings.dailyNotifications', translationLanguage)}
            </Text>
          </View>
          <Text className="text-text-muted text-sm font-w-medium mb-4">
            {t('notifications.description', translationLanguage)}
          </Text>
          <BrutalSwitch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
        </View>

        {/* Time Picker (only show if enabled) */}
        {notificationsEnabled && (
          <View className="w-full mb-6">
            <View className="flex-row items-center mb-4">
              <Clock size={20} color={Colors.border} strokeWidth={2.5} />
              <Text className="ml-2 text-border text-base font-w-extrabold uppercase">
                {t('settings.time', translationLanguage)}
              </Text>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {timeOptions.map((time) => (
                <BrutalButton
                  key={time}
                  onPress={() => handleTimeChange(time)}
                  isActive={time === notificationTime}
                  backgroundColor={time === notificationTime ? Colors.primary : Colors.surface}
                  borderWidth={2}
                  contentContainerStyle={{
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    className={`text-sm font-w-extrabold ${
                      time === notificationTime ? 'text-border' : 'text-text-muted'
                    }`}
                  >
                    {time}
                  </Text>
                </BrutalButton>
              ))}
            </View>
          </View>
        )}

        {/* Info */}
        <View
          className="w-full p-4 rounded-xl"
          style={{
            backgroundColor: Colors.accentBlue,
            borderWidth: 2,
            borderColor: Colors.border,
          }}
        >
          <Text className="text-border text-xs font-w-bold">
            💡 {t('notifications.info', translationLanguage)}
          </Text>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
