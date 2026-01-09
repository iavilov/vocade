import { BrutalButton } from '@/components/ui/brutal-button';
import { BrutalCard } from '@/components/ui/brutal-card';
import { BrutalTag } from '@/components/ui/brutal-tag';
import { BrutalWordTitle } from '@/components/ui/brutal-word-title';
import { ContentContainer } from '@/components/ui/content-container';
import { HighlightedText } from '@/components/ui/highlighted-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { ScreenLayout } from '@/components/ui/screen-layout';
import { Colors, borderRadius } from '@/constants/design-tokens';
import { t } from '@/constants/translations';
import { getWordContent } from '@/lib/i18n-helpers';
import { useSettingsStore } from '@/store/settings-store';
import { useWordStore } from '@/store/word-store';
import { ARTICLE_COLORS, PART_OF_SPEECH_COLORS } from '@/types/word';
import * as Haptics from 'expo-haptics';
import { Heart, Share2 } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, ScrollView, Share, Text, View } from 'react-native';

export default function Index() {
  const { todayWord, isLoading, loadTodayWord, toggleFavorite, isFavorite } = useWordStore();
  const { translationLanguage } = useSettingsStore();

  useEffect(() => {
    loadTodayWord();
  }, []);

  if (isLoading) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text className="text-text-muted mt-4 font-w-medium">
            {t('common.loading', translationLanguage)}
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  if (!todayWord) {
    return (
      <ScreenLayout>
        <View className="flex-1 justify-center items-center p-6">
          <Text className="text-text-main font-w-semibold text-lg">
            {t('common.notFound', translationLanguage)}
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  const article = todayWord.article;
  const hasArticle = !!article && article !== 'none';
  const articleColors = hasArticle ? ARTICLE_COLORS[article] : null;
  const content = getWordContent(todayWord, translationLanguage);

  // Nouns are capitalized, other parts of speech are lowercase. 
  // We keep the logic but avoid explicit 'noun' string check if possible, 
  // or just use the word as provided in the database if it's already correctly capitalized.
  const displayWord = todayWord.word_de;

  const publishDate = new Date();
  const day = publishDate.getDate();
  const locale = translationLanguage === 'en' ? 'en-US' :
    translationLanguage === 'uk' ? 'uk-UA' :
      translationLanguage === 'de' ? 'de-DE' : 'ru-RU';

  const month = publishDate.toLocaleString(locale, { month: 'short' }).toUpperCase().replace('.', '');
  const dateString = `${day}. ${month}`;
  const partOfSpeechColor = (PART_OF_SPEECH_COLORS as any)[todayWord.part_of_speech];

  const onShare = async () => {
    try {
      const shareTemplate = t('home.shareMessage', translationLanguage);
      const message = shareTemplate
        .replace('{word}', displayWord)
        .replace('{translation}', content.translation);

      await Share.share({
        message: `${message} 🚀 Vocade`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAudioPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Audio coming soon', 'Произношение подключим в следующих релизах.');
  };

  return (
    <ScreenLayout>
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
          alignItems: 'center'
        }}
      >
        <ScreenHeader
          title={dateString}
          badgeText={t('home.today', translationLanguage)}
          badgeColor={Colors.accentYellow}
          rightElement={
            <View className="mr-2">
              <BrutalButton
                onPress={onShare}
                borderRadius={borderRadius.SMALL}
                borderWidth={2}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                pressableStyle={{ flexDirection: 'row' }}
              >
                <Share2 size={18} color={Colors.border} strokeWidth={3} style={{ marginRight: 8 }} />
                <Text className="text-border font-w-bold uppercase text-xs">
                  {t('home.share', translationLanguage)}
                </Text>
              </BrutalButton>
            </View>
          }
        />

        <ContentContainer>
          <BrutalTag
            text={t('home.wordOfTheDay', translationLanguage)}
            backgroundColor={Colors.accentPink}
            borderWidth={2}
            borderRadius={borderRadius.SHARP}
            shadowOffset={1}
            style={{ position: 'absolute', right: 12, top: -20, zIndex: 50 }}
            textClassName="text-xs"
          />

          <BrutalCard>
            <View className="flex-row justify-start mb-8">
              <BrutalButton
                onPress={() => toggleFavorite(todayWord.id)}
                borderWidth={2}
                borderRadius={borderRadius.ROUND}
                style={{ width: 44, height: 44 }}
                contentContainerStyle={{ height: '100%' }}
              >
                <Heart
                  size={22}
                  color={Colors.border}
                  fill={isFavorite(todayWord.id) ? Colors.border : 'transparent'}
                  strokeWidth={2.5}
                />
              </BrutalButton>
            </View>

            <BrutalWordTitle
              word={displayWord}
              onAudioPress={handleAudioPress}
            />

            <View className="flex-row items-center flex-wrap gap-2 mb-5">
              {hasArticle && articleColors && article && (
                <BrutalTag
                  text={article}
                  backgroundColor={articleColors.bg}
                  borderColor={articleColors.border}
                  textColor={articleColors.text}
                  borderWidth={2}
                  borderRadius={borderRadius.SMALL}
                  shadowOffset={0}
                  paddingHorizontal={12}
                  paddingVertical={6}
                  textClassName="text-sm"
                  style={{ marginRight: 4 }}
                />
              )}
              <BrutalTag
                text={todayWord.transcription_de}
                backgroundColor={Colors.surface}
                textColor={Colors.textMain}
                borderWidth={2}
                borderRadius={borderRadius.SMALL}
                shadowOffset={0}
                paddingHorizontal={14}
                paddingVertical={8}
                textClassName="text-md"
                uppercase={false}
              />
              {todayWord.part_of_speech !== ('noun' as string) && (
                <BrutalTag
                  text={todayWord.part_of_speech}
                  backgroundColor={partOfSpeechColor?.bg || Colors.surface}
                  textColor={partOfSpeechColor?.text || Colors.border}
                  borderColor={Colors.border}
                  borderWidth={2}
                  borderRadius={borderRadius.SMALL}
                  shadowOffset={1}
                  paddingHorizontal={12}
                  paddingVertical={6}
                  textClassName="text-xs"
                />
              )}

            </View>

            <View className="mb-6">
              <Text className="text-xl text-text-main font-w-semibold">
                {content.translation}
              </Text>
            </View>

            <View className="h-0.5 w-full bg-border mb-6" />

            {/* Example Sentence */}
            <View
              className="p-4 my-6 relative"
              style={{
                borderWidth: 2,
                borderColor: Colors.border,
                borderRadius: borderRadius.MEDIUM,
                backgroundColor: Colors.gray50,

              }}
            >
              <BrutalTag
                text={t('home.beispiel', translationLanguage)}
                backgroundColor={Colors.surface}
                borderWidth={2}
                borderRadius={borderRadius.SHARP}
                shadowOffset={1}
                paddingHorizontal={12}
                paddingVertical={6}
                textClassName="text-[11px]"
                style={{
                  position: 'absolute',
                  top: -18,
                  left: 16,
                }}
              />

              <HighlightedText
                text={content.exampleSentence.de}
                textClassName="text-[16px] text-text-main font-w-medium leading-[22px] mt-3"
                highlightClassName="text-[16px] font-w-semibold"
              />

              <View
                className="mt-4"
              >
                <Text
                  className="text-[14px] text-text-muted font-w-regular opacity-70"
                  style={{ fontStyle: 'italic' }}
                >
                  {content.exampleSentence.translation}
                </Text>
              </View>
            </View>
            {/* Example Sentence End */}


            {/* Etymology */}
            <View className="pb-6">
              <View
                className="bg-green-50 p-4 mt-4 relative"
                style={{
                  borderWidth: 2,
                  borderColor: Colors.border,
                  borderRadius: borderRadius.MEDIUM,

                }}
              >
                <BrutalTag
                  text={t('home.etymologie', translationLanguage)}
                  backgroundColor={Colors.surface}
                  borderWidth={2}
                  borderRadius={borderRadius.SHARP}
                  shadowOffset={1}
                  paddingHorizontal={12}
                  paddingVertical={6}
                  textClassName="text-[11px]"
                  style={{
                    position: 'absolute',
                    top: -18,
                    left: 16,
                  }}
                />

                <Text
                  className="text-[14px] text-text-main font-w-regular leading-[20px]"
                >
                  {content.etymology.text || t('common.notFound', translationLanguage)}

                </Text>

                {content.etymology.rootWord && (
                  <View className="mt-4 flex-row items-center">
                    <Text className="text-[12px] text-text-muted font-w-semibold uppercase tracking-[1.5px] opacity-60">
                      {t('home.root', translationLanguage)}:
                    </Text>
                    <View
                      className="bg-accent-yellow px-2 py-0.5"
                      style={{
                        borderWidth: 2,
                        borderColor: Colors.border,
                        borderRadius: borderRadius.SMALL,
                      }}
                    >
                      <Text className="text-xs font-w-semibold text-text-main">
                        {content.etymology.rootWord}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
            {/* Etymology End */}

          </BrutalCard>
        </ContentContainer>
      </ScrollView>
    </ScreenLayout>
  );
}
