import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalCard } from '@/components/ui/brutal-card';
import { BrutalDivider } from '@/components/ui/brutal-divider';
import { BrutalText } from '@/components/ui/brutal-text';
import { ContentContainer } from '@/components/ui/content-container';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { useSettingsStore } from '@/store/settings-store';
import { LANGUAGE_OPTIONS, LEVEL_OPTIONS } from '@/types/settings';
import { useRouter } from 'expo-router';
import { Bell, ChevronRight, Gavel, Languages, LogOut, MessageSquare, ShieldCheck, Star, TrendingUp, User } from 'lucide-react-native';
import React from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';

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
          badgeText={t('settings.account', translationLanguage)}
          badgeColor={Colors.primary}
        />

        <ContentContainer>
          <BrutalCard>
            <BrutalButton
              onPress={() => router.push('/settings/account')}
              borderRadius={8}
              borderWidth={2}
              style={{ width: '100%' }}
              contentContainerStyle={{ alignItems: 'stretch' }}
              pressableStyle={{ width: '100%', alignItems: 'stretch', padding: 16 }}
            >
              <View className="flex-row items-center justify-between w-full">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-10 h-10 items-center justify-center rounded-brutal mr-3 border-2"
                    style={{ backgroundColor: '#86EFAC', borderColor: Colors.border }}
                  >
                    <User size={20} color={Colors.border} strokeWidth={3} />
                  </View>
                  <View>
                    <BrutalText style={{ fontSize: 13, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.account', translationLanguage)}</BrutalText>
                    <BrutalText className="text-gray-500 text-xs font-medium">{userEmail}</BrutalText>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.border} />
              </View>
            </BrutalButton>

            <BrutalDivider className="my-6" />

            <BrutalButton
              onPress={() => router.push('/settings/language')}
              borderRadius={8}
              borderWidth={2}
              style={{ width: '100%' }}
              contentContainerStyle={{ alignItems: 'stretch' }}
              pressableStyle={{ width: '100%', alignItems: 'stretch', padding: 16 }}
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
                    <BrutalText style={{ fontSize: 13, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.language', translationLanguage)}</BrutalText>
                    <BrutalText className="text-gray-500 text-xs font-medium">{currentLanguageName}</BrutalText>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.border} />
              </View>
            </BrutalButton>

            <BrutalDivider className="my-6" />

            <BrutalButton
              onPress={() => router.push('/settings/level')}
              borderRadius={8}
              borderWidth={2}
              style={{ width: '100%' }}
              contentContainerStyle={{ alignItems: 'stretch' }}
              pressableStyle={{ width: '100%', alignItems: 'stretch', padding: 16 }}
            >
              <View className="flex-row items-center justify-between w-full">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-10 h-10 items-center justify-center rounded-brutal mr-3 border-2"
                    style={{ backgroundColor: Colors.accentPink, borderColor: Colors.border }}
                  >
                    <TrendingUp size={20} color={Colors.border} strokeWidth={3} />
                  </View>
                  <View>
                    <BrutalText style={{ fontSize: 13, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.level', translationLanguage)}</BrutalText>
                    <BrutalText className="text-gray-500 text-xs font-medium">{currentLevelName}</BrutalText>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.border} />
              </View>
            </BrutalButton>

            {Platform.OS !== 'web' && <BrutalDivider className="my-6" />}

            {Platform.OS !== 'web' && (
              <BrutalButton
                onPress={() => router.push('/settings/notifications')}
                borderRadius={8}
                borderWidth={2}
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'stretch' }}
                pressableStyle={{ width: '100%', alignItems: 'stretch', padding: 16 }}
              >
                <View className="flex-row items-center justify-between w-full">
                  <View className="flex-row items-center flex-1">
                    <View
                      className="w-10 h-10 items-center justify-center rounded-brutal mr-3 border-2"
                      style={{ backgroundColor: Colors.accentBlue, borderColor: Colors.border }}
                    >
                      <Bell size={20} color={Colors.border} strokeWidth={3} />
                    </View>
                    <View>
                      <BrutalText style={{ fontSize: 13, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.notifications', translationLanguage)}</BrutalText>
                      <BrutalText className="text-gray-500 text-xs font-medium">{t('settings.reminders', translationLanguage)}</BrutalText>
                    </View>
                  </View>
                  <ChevronRight size={20} color={Colors.border} />
                </View>
              </BrutalButton>
            )}
          </BrutalCard>
        </ContentContainer>



        <View className="relative w-full items-center my-10">
          <BrutalDivider className="absolute top-[11px] left-0 right-0" />
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
              zIndex: 10,
            }}
          >

            <BrutalText style={{ fontSize: 12, fontWeight: '900', color: Colors.border, textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('settings.support', translationLanguage)}
            </BrutalText>
          </View>
        </View>

        <ContentContainer className="mb-8">
          <BrutalCard>
            <BrutalButton
              onPress={() => router.push('/settings/rate')}
              borderWidth={2}
              style={{ width: '100%', marginBottom: 16 }}
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
                    <BrutalText style={{ fontSize: 14, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.rate', translationLanguage)}</BrutalText>
                    <BrutalText className="text-gray-500 text-xs font-medium">Love Vocade? Let us know!</BrutalText>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.border} />
              </View>
            </BrutalButton>

            <BrutalButton
              onPress={() => router.push('/settings/feedback')}
              borderWidth={2}
              style={{ width: '100%', marginBottom: 16 }}
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
                    <BrutalText style={{ fontSize: 14, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.feedback', translationLanguage)}</BrutalText>
                    <BrutalText className="text-gray-500 text-xs font-medium">Report a bug or suggest features</BrutalText>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.border} />
              </View>
            </BrutalButton>

            <BrutalButton
              onPress={() => Linking.openURL('https://vocade.app/terms')}
              borderWidth={2}
              style={{ width: '100%', marginBottom: 16 }}
              contentContainerStyle={{ alignItems: 'stretch' }}
              pressableStyle={{ width: '100%', padding: 16 }}
            >
              <View className="flex-row justify-between items-center w-full">
                <View className="flex-row items-center">
                  <View
                    className="w-10 h-10 items-center justify-center rounded-md mr-3 border-2"
                    style={{ backgroundColor: '#FDE68A', borderColor: Colors.border }}
                  >
                    <Gavel size={20} color={Colors.border} strokeWidth={3} />
                  </View>
                  <View>
                    <BrutalText style={{ fontSize: 14, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.terms', translationLanguage)}</BrutalText>
                    <BrutalText className="text-gray-500 text-xs font-medium">{t('settings.termsDescription', translationLanguage)}</BrutalText>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.border} />
              </View>
            </BrutalButton>

            <BrutalButton
              onPress={() => Linking.openURL('https://vocade.app/privacy')}
              borderWidth={2}
              style={{ width: '100%', marginBottom: 0 }}
              contentContainerStyle={{ alignItems: 'stretch' }}
              pressableStyle={{ width: '100%', padding: 16 }}
            >
              <View className="flex-row justify-between items-center w-full">
                <View className="flex-row items-center">
                  <View
                    className="w-10 h-10 items-center justify-center rounded-md mr-3 border-2"
                    style={{ backgroundColor: '#86EFAC', borderColor: Colors.border }}
                  >
                    <ShieldCheck size={20} color={Colors.border} strokeWidth={3} />
                  </View>
                  <View>
                    <BrutalText style={{ fontSize: 14, fontWeight: '900', color: Colors.border, textTransform: 'uppercase' }}>{t('settings.privacy', translationLanguage)}</BrutalText>
                    <BrutalText className="text-gray-500 text-xs font-medium">{t('settings.privacyDescription', translationLanguage)}</BrutalText>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.border} />
              </View>
            </BrutalButton>


          </BrutalCard>
        </ContentContainer>

        <ContentContainer className="mb-8">
          <BrutalButton
            onPress={handleLogout}
            shadowOffset={0}
            borderWidth={2}
            borderColor="#D1D5DB"
            backgroundColor="transparent"
            style={{ width: '100%' }}
            contentContainerStyle={{}}
            pressableStyle={{ padding: 12, width: '100%' }}
          >
            <View className="flex-row items-center justify-center">
              <LogOut size={18} color="#9CA3AF" style={{ marginRight: 8 }} />
              <BrutalText style={{ fontSize: 14, fontWeight: '900', color: '#9CA3AF', textTransform: 'uppercase' }}>{t('settings.logout', translationLanguage)}</BrutalText>
            </View>
          </BrutalButton>
        </ContentContainer>

        <ContentContainer className="mt-8 mb-4 items-center">
          <View className="border border-dashed border-gray-300 rounded-sm px-3 py-1">
            <Text style={{ fontSize: 10, fontWeight: '500', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1 }}>
              {t('settings.version', translationLanguage)} 1.0.4 (Build 42)
            </Text>
          </View>
        </ContentContainer>
      </ScrollView>
    </ScreenLayout>
  );
}
