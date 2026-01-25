import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalDashedLine } from '@/components/ui/brutal-dashed-line';
import { ContentContainer } from '@/components/ui/content-container';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Border, Colors, borderRadius } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { useSettingsStore } from '@/store/settings-store';
import { LANGUAGE_OPTIONS, LEVEL_OPTIONS } from '@/types/settings';
import { createBrutalShadow } from '@/utils/platform-styles';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, Gavel, Languages, LogOut, MessageSquare, ShieldCheck, Star, TrendingUp, User } from 'lucide-react-native';
import React from 'react';
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';

// Settings section item component
interface SettingItemProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showDivider?: boolean;
}

function SettingItem({ icon, iconBgColor, title, subtitle, onPress, showDivider = true }: SettingItemProps) {
  return (
    <>
      <Pressable
        onPress={onPress}
        className="flex-row items-center justify-between py-4 px-4"
        style={({ pressed }) => ({
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <View className="flex-row items-center flex-1">
          <View
            className="w-10 h-10 items-center justify-center mr-3"
            style={{
              backgroundColor: iconBgColor,
              borderWidth: Border.secondary,
              borderColor: Colors.border,
              borderRadius: borderRadius.MEDIUM,
            }}
          >
            {icon}
          </View>
          <View className="flex-1">
            <Text className="text-border font-w-bold text-sm uppercase">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-text-muted text-xs font-w-medium mt-0.5">
                {subtitle}
              </Text>
            )}
          </View>
        </View>
        <ChevronRight size={20} color={Colors.border} strokeWidth={2.5} />
      </Pressable>
      {showDivider && <BrutalDashedLine thickness={2} dashArray="6, 6" />}
    </>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { userEmail, translationLanguage, languageLevel } = useSettingsStore();

  const currentLanguageName = LANGUAGE_OPTIONS.find(opt => opt.code === translationLanguage)?.nativeName || 'Russian';
  const currentLevelName = LEVEL_OPTIONS.find(opt => opt.code === languageLevel)?.name[translationLanguage] || 'Beginner';

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160, alignItems: 'center' }}
      >
        <ScreenHeader
          title={t('settings.title', translationLanguage)}
          badgeText={t('settings.account', translationLanguage).toUpperCase()}
          badgeColor={Colors.primary}
          titleAlign="left"
        />

        {/* ACCOUNT Section */}
        <ContentContainer className="mb-6">
          <View
            style={{
              backgroundColor: Colors.surface,
              borderWidth: 4,
              borderColor: Colors.border,
              borderRadius: borderRadius.LARGE,
              overflow: 'hidden',
              ...createBrutalShadow(4, Colors.border),
              paddingVertical: 8,
            }}
          >
            <SettingItem
              icon={<User size={20} color={Colors.border} strokeWidth={2.5} />}
              iconBgColor="#86EFAC"
              title={t('settings.account', translationLanguage)}
              subtitle={userEmail}
              onPress={() => router.push('/settings/account')}
            />
            <SettingItem
              icon={<Languages size={20} color={Colors.border} strokeWidth={2.5} />}
              iconBgColor={Colors.accentYellow}
              title={t('settings.language', translationLanguage)}
              subtitle={currentLanguageName}
              onPress={() => router.push('/settings/language')}
            />
            <SettingItem
              icon={<TrendingUp size={20} color={Colors.border} strokeWidth={2.5} />}
              iconBgColor={Colors.accentPink}
              title={t('settings.level', translationLanguage)}
              subtitle={currentLevelName}
              onPress={() => router.push('/settings/level')}
              showDivider={Platform.OS !== 'web'}
            />
            {Platform.OS === 'ios' && (
              <SettingItem
                icon={<Bell size={20} color={Colors.border} strokeWidth={2.5} />}
                iconBgColor={Colors.accentBlue}
                title={t('settings.notifications', translationLanguage)}
                subtitle={t('settings.reminders', translationLanguage)}
                onPress={() => router.push('/settings/notifications')}
                showDivider={false}
              />
            )}
            {Platform.OS === 'web' && (
              <View style={{ height: 0 }} />
            )}
          </View>
        </ContentContainer>

        {/* SUPPORT & LEGAL Section */}
        <ContentContainer className="mb-6">
          <View
            style={{
              backgroundColor: Colors.surface,
              borderWidth: 4,
              borderColor: Colors.border,
              borderRadius: borderRadius.LARGE,
              overflow: 'hidden',
              ...createBrutalShadow(4, Colors.border),
              paddingVertical: 8,
            }}
          >
            <SettingItem
              icon={<Star size={20} color={Colors.border} strokeWidth={2.5} />}
              iconBgColor={Colors.accentPink}
              title={t('settings.rate', translationLanguage)}
              subtitle={t('settings.rateDescription', translationLanguage)}
              onPress={() => router.push('/settings/rate')}
            />
            <SettingItem
              icon={<MessageSquare size={20} color={Colors.border} strokeWidth={2.5} />}
              iconBgColor="#93C5FD"
              title={t('settings.feedback', translationLanguage)}
              subtitle={t('settings.feedbackDescription', translationLanguage)}
              onPress={() => router.push('/settings/feedback')}
            />
            <SettingItem
              icon={<Gavel size={20} color={Colors.border} strokeWidth={2.5} />}
              iconBgColor="#FDE68A"
              title={t('settings.terms', translationLanguage)}
              subtitle={t('settings.termsDescription', translationLanguage)}
              onPress={() => Linking.openURL('https://wortday.com/terms')}
            />
            <SettingItem
              icon={<ShieldCheck size={20} color={Colors.border} strokeWidth={2.5} />}
              iconBgColor="#86EFAC"
              title={t('settings.privacy', translationLanguage)}
              subtitle={t('settings.privacyDescription', translationLanguage)}
              onPress={() => Linking.openURL('https://wortday.com/privacy')}
              showDivider={false}
            />
          </View>
        </ContentContainer>

        {/* LOG OUT Button */}
        <ContentContainer className="mb-8">
          <BrutalButton
            onPress={handleLogout}
            shadowOffset={0}
            borderWidth={Border.primary}
            borderColor={Colors.border}
            backgroundColor="transparent"
            borderRadius={borderRadius.SMALL}
            style={{ width: '100%' }}
            contentContainerStyle={{}}
            pressableStyle={{ padding: 14, width: '100%' }}
          >
            <View className="flex-row items-center justify-center">
              <LogOut size={20} color={Colors.border} strokeWidth={2.5} style={{ marginRight: 8 }} />
              <Text className="text-border font-w-bold text-sm uppercase tracking-wide">
                {t('settings.logout', translationLanguage)}
              </Text>
            </View>
          </BrutalButton>
        </ContentContainer>

        {/* Version */}
        <ContentContainer className="mt-4 mb-4 items-center">
          <Text style={{
            fontSize: 10,
            fontWeight: '600',
            color: Colors.textMuted,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace'
          }}>
            {t('settings.version', translationLanguage)} 1.0.4 (Build 42)
          </Text>
        </ContentContainer>
      </ScrollView>
    </ScreenLayout>
  );
}
